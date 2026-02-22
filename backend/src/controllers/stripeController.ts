import { Router, Request, Response } from 'express'
import Joi from 'joi'
import { prisma } from '../config/database'
import { authenticate } from '../middleware/auth'
import { requireOrgAdmin } from '../middleware/rbac'
import { validateRequest } from '../middleware/validateRequest'
import { apiResponse, handleError } from '../utils/apiResponse'
import { StripeService } from '../services/StripeService'

const router = Router()

// =====================================================
// PAYMENT INTENT (authenticated, ORG_ADMIN)
// =====================================================

const createPaymentIntentSchema = Joi.object({
  courseId: Joi.string().required(),
  seats: Joi.number().integer().min(1).max(1000).required(),
})

router.post(
  '/create-payment-intent',
  authenticate,
  requireOrgAdmin,
  validateRequest(createPaymentIntentSchema),
  async (req: Request, res: Response) => {
    try {
      const { courseId, seats } = req.body
      const orgId = req.user!.organizationId

      if (!orgId) {
        return res.status(400).json(
          apiResponse.error('Organization not found for this user', 'NO_ORGANIZATION')
        )
      }

      // Look up course to get price
      const course = await prisma.course.findFirst({
        where: { id: courseId, isPublic: true, deletedAt: null },
        select: { id: true, price: true, currency: true, name: true, schoolId: true },
      })

      if (!course) {
        return res.status(404).json(apiResponse.error('Course not found', 'NOT_FOUND'))
      }

      if (!course.price || Number(course.price) <= 0) {
        return res.status(400).json(
          apiResponse.error('Course does not have a valid price', 'INVALID_PRICE')
        )
      }

      const pricePerSeat = Number(course.price)
      const total = seats * pricePerSeat
      const currency = course.currency || 'EUR'

      const { clientSecret, paymentIntentId } = await StripeService.createPaymentIntent(
        total,
        currency,
        {
          orgId,
          courseId,
          seats: String(seats),
          schoolId: course.schoolId,
        }
      )

      res.json(
        apiResponse.success({
          clientSecret,
          paymentIntentId,
          amount: total,
          currency,
          courseName: course.name,
          seats,
          pricePerSeat,
        })
      )
    } catch (error) {
      handleError(res, error)
    }
  }
)

// =====================================================
// WEBHOOK (no auth — Stripe signature verification)
// =====================================================

router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const signature = req.headers['stripe-signature'] as string

    if (!signature) {
      return res.status(400).json(apiResponse.error('Missing stripe-signature header', 'BAD_REQUEST'))
    }

    let event
    try {
      event = StripeService.constructEvent(req.body, signature)
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return res.status(400).json(apiResponse.error('Invalid signature', 'INVALID_SIGNATURE'))
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object
        console.log(`PaymentIntent ${paymentIntent.id} succeeded, provisioning...`)
        try {
          const result = await StripeService.confirmPaymentAndProvision(paymentIntent.id)
          console.log(`Provisioned license ${result.license.id} for payment ${paymentIntent.id}`)
        } catch (provisionError) {
          console.error('Provisioning failed:', provisionError)
          // Still return 200 to Stripe so it doesn't retry, but log for manual fix
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object
        console.error(`PaymentIntent ${paymentIntent.id} failed:`, paymentIntent.last_payment_error?.message)
        break
      }

      default:
        // Unhandled event type — acknowledge it
        break
    }

    res.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    res.status(500).json(apiResponse.error('Webhook processing failed', 'WEBHOOK_ERROR'))
  }
})

// =====================================================
// PAYMENT HISTORY (authenticated, ORG_ADMIN)
// =====================================================

router.get(
  '/payment-history',
  authenticate,
  requireOrgAdmin,
  async (req: Request, res: Response) => {
    try {
      const orgId = req.user!.organizationId

      if (!orgId) {
        return res.status(400).json(
          apiResponse.error('Organization not found for this user', 'NO_ORGANIZATION')
        )
      }

      const payments = await prisma.payment.findMany({
        where: { organizationId: orgId },
        orderBy: { createdAt: 'desc' },
        include: {
          invoice: {
            select: {
              id: true,
              invoiceNumber: true,
              totalAmount: true,
              status: true,
              lineItems: true,
            },
          },
        },
      })

      res.json(apiResponse.success(payments))
    } catch (error) {
      handleError(res, error)
    }
  }
)

export default router
