import Stripe from 'stripe'
import { prisma } from '../config/database'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

export interface PaymentMetadata {
  orgId: string
  courseId: string
  seats: string // Stripe metadata values must be strings
  schoolId: string
  [key: string]: string // Index signature for Stripe MetadataParam compatibility
}

export const StripeService = {
  /**
   * Create a Stripe PaymentIntent for seat license purchase
   */
  async createPaymentIntent(
    amount: number,
    currency: string,
    metadata: PaymentMetadata
  ): Promise<{ clientSecret: string; paymentIntentId: string }> {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents
      currency: currency.toLowerCase(),
      metadata,
      automatic_payment_methods: { enabled: true },
    })

    return {
      clientSecret: paymentIntent.client_secret!,
      paymentIntentId: paymentIntent.id,
    }
  },

  /**
   * After webhook confirms payment, provision the seat license
   */
  async confirmPaymentAndProvision(paymentIntentId: string) {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    const metadata = paymentIntent.metadata as unknown as PaymentMetadata

    const orgId = metadata.orgId
    const courseId = metadata.courseId
    const seats = parseInt(metadata.seats, 10)
    const schoolId = metadata.schoolId

    return prisma.$transaction(async (tx) => {
      // Upsert SeatLicense: if one exists for org+course, add seats; otherwise create
      const existing = await tx.seatLicense.findUnique({
        where: { organizationId_courseId: { organizationId: orgId, courseId } },
      })

      // Look up course price for pricePerSeat
      const course = await tx.course.findUniqueOrThrow({
        where: { id: courseId },
        select: { price: true },
      })
      const pricePerSeat = course.price ? Number(course.price) : 0

      let license
      if (existing) {
        license = await tx.seatLicense.update({
          where: { id: existing.id },
          data: { totalSeats: existing.totalSeats + seats },
        })
      } else {
        license = await tx.seatLicense.create({
          data: {
            organizationId: orgId,
            courseId,
            totalSeats: seats,
            pricePerSeat,
            startsAt: new Date(),
          },
        })
      }

      // Generate invoice number
      const invoiceCount = await tx.invoice.count({ where: { schoolId } })
      const invoiceNumber = `INV-${new Date().getFullYear()}-${String(invoiceCount + 1).padStart(5, '0')}`
      const subtotal = pricePerSeat * seats
      const vatRate = 22
      const vatAmount = subtotal * (vatRate / 100)
      const totalAmount = subtotal + vatAmount

      // Create Invoice
      const invoice = await tx.invoice.create({
        data: {
          invoiceNumber,
          schoolId,
          organizationId: orgId,
          subtotal,
          vatRate,
          vatAmount,
          totalAmount,
          currency: paymentIntent.currency.toUpperCase(),
          status: 'PAID',
          paidAt: new Date(),
          lineItems: [
            {
              description: `${seats} seat license(s)`,
              courseId,
              quantity: seats,
              unitPrice: pricePerSeat,
              total: subtotal,
            },
          ],
        },
      })

      // Create Payment record
      const payment = await tx.payment.create({
        data: {
          amount: totalAmount,
          currency: paymentIntent.currency.toUpperCase(),
          status: 'PAID',
          paymentMethod: 'card',
          stripePaymentIntentId: paymentIntentId,
          paidAt: new Date(),
          schoolId,
          organizationId: orgId,
          invoiceId: invoice.id,
        },
      })

      return { license, payment, invoice }
    })
  },

  /**
   * Verify Stripe webhook signature
   */
  constructEvent(payload: Buffer, signature: string): Stripe.Event {
    return stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )
  },
}
