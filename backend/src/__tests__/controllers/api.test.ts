import request from 'supertest'
import express from 'express'
import cors from 'cors'
import clientRoutes from '../../controllers/clientController'
import roundtableRoutes from '../../controllers/roundtableController'
import { prisma } from '../setup'

// Create test app
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/clients', clientRoutes)
app.use('/api/roundtables', roundtableRoutes)

describe('API Integration Tests', () => {
  let testClientId: string
  let testRoundtableId: string

  describe('Client API', () => {
    describe('POST /api/clients', () => {
      it('should create a new client', async () => {
        const clientData = {
          name: 'Test Client API',
          email: 'api-test@example.com',
          company: 'API Test Company',
          description: 'Test client for API testing'
        }

        const response = await request(app)
          .post('/api/clients')
          .send(clientData)
          .expect(201)

        expect(response.body.success).toBe(true)
        expect(response.body.data.name).toBe(clientData.name)
        expect(response.body.data.email).toBe(clientData.email)
        
        testClientId = response.body.data.id
      })

      it('should reject duplicate email', async () => {
        const clientData = {
          name: 'Duplicate Client',
          email: 'api-test@example.com', // Same email as above
          company: 'Duplicate Company'
        }

        const response = await request(app)
          .post('/api/clients')
          .send(clientData)
          .expect(400)

        expect(response.body.success).toBe(false)
        expect(response.body.error).toContain('already exists')
      })

      it('should validate required fields', async () => {
        const invalidData = {
          name: 'Test',
          // missing email and company
        }

        const response = await request(app)
          .post('/api/clients')
          .send(invalidData)
          .expect(400)

        expect(response.body.success).toBe(false)
        expect(response.body.error).toContain('Validation error')
      })
    })

    describe('GET /api/clients', () => {
      it('should return list of clients with pagination', async () => {
        const response = await request(app)
          .get('/api/clients')
          .expect(200)

        expect(response.body.success).toBe(true)
        expect(response.body.data).toBeDefined()
        expect(response.body.pagination).toBeDefined()
        expect(response.body.pagination.total).toBeGreaterThan(0)
      })

      it('should support search functionality', async () => {
        const response = await request(app)
          .get('/api/clients?search=API Test')
          .expect(200)

        expect(response.body.success).toBe(true)
        expect(response.body.data.length).toBeGreaterThan(0)
        expect(response.body.data[0].company).toContain('API Test')
      })
    })

    describe('GET /api/clients/:id', () => {
      it('should return client by ID', async () => {
        const response = await request(app)
          .get(`/api/clients/${testClientId}`)
          .expect(200)

        expect(response.body.success).toBe(true)
        expect(response.body.data.id).toBe(testClientId)
        expect(response.body.data.roundtables).toBeDefined()
      })

      it('should return 404 for non-existent client', async () => {
        const response = await request(app)
          .get('/api/clients/non-existent-id')
          .expect(404)

        expect(response.body.success).toBe(false)
        expect(response.body.error).toContain('not found')
      })
    })

    describe('PUT /api/clients/:id', () => {
      it('should update client information', async () => {
        const updateData = {
          name: 'Updated Client Name',
          description: 'Updated description'
        }

        const response = await request(app)
          .put(`/api/clients/${testClientId}`)
          .send(updateData)
          .expect(200)

        expect(response.body.success).toBe(true)
        expect(response.body.data.name).toBe(updateData.name)
        expect(response.body.data.description).toBe(updateData.description)
      })
    })
  })

  describe('Roundtable API', () => {
    describe('POST /api/roundtables', () => {
      it('should create a new roundtable with topics', async () => {
        const roundtableData = {
          name: 'Test Roundtable API',
          description: 'API test roundtable',
          clientId: testClientId,
          maxParticipants: 8,
          topics: [
            { title: 'Leadership Skills', description: 'Developing leadership capabilities' },
            { title: 'Communication', description: 'Effective communication techniques' },
            { title: 'Team Management', description: 'Managing high-performance teams' },
            { title: 'Negotiation', description: 'Advanced negotiation strategies' },
            { title: 'Presentation Skills', description: 'Public speaking and presentations' },
            { title: 'Conflict Resolution', description: 'Resolving workplace conflicts' },
            { title: 'Decision Making', description: 'Strategic decision-making processes' },
            { title: 'Change Management', description: 'Leading organizational change' },
            { title: 'Innovation', description: 'Foster innovation and creativity' },
            { title: 'Digital Leadership', description: 'Leadership in digital age' }
          ]
        }

        const response = await request(app)
          .post('/api/roundtables')
          .send(roundtableData)
          .expect(201)

        expect(response.body.success).toBe(true)
        expect(response.body.data.name).toBe(roundtableData.name)
        expect(response.body.data.status).toBe('SETUP')
        
        testRoundtableId = response.body.data.id

        // Verify topics were created
        const topics = await prisma.topic.findMany({
          where: { roundtableId: testRoundtableId }
        })
        expect(topics).toHaveLength(10)
      })

      it('should reject roundtable with invalid client', async () => {
        const roundtableData = {
          name: 'Invalid Roundtable',
          clientId: 'invalid-client-id',
          topics: []
        }

        const response = await request(app)
          .post('/api/roundtables')
          .send(roundtableData)
          .expect(400)

        expect(response.body.success).toBe(false)
        expect(response.body.error).toContain('Client not found')
      })
    })

    describe('GET /api/roundtables', () => {
      it('should return list of roundtables', async () => {
        const response = await request(app)
          .get('/api/roundtables')
          .expect(200)

        expect(response.body.success).toBe(true)
        expect(response.body.data).toBeDefined()
        expect(response.body.data.length).toBeGreaterThan(0)
      })

      it('should filter by status', async () => {
        const response = await request(app)
          .get('/api/roundtables?status=SETUP')
          .expect(200)

        expect(response.body.success).toBe(true)
        expect(response.body.data.every((rt: any) => rt.status === 'SETUP')).toBe(true)
      })

      it('should filter by client', async () => {
        const response = await request(app)
          .get(`/api/roundtables?clientId=${testClientId}`)
          .expect(200)

        expect(response.body.success).toBe(true)
        expect(response.body.data.every((rt: any) => rt.clientId === testClientId)).toBe(true)
      })
    })

    describe('GET /api/roundtables/:id', () => {
      it('should return roundtable with full details', async () => {
        const response = await request(app)
          .get(`/api/roundtables/${testRoundtableId}`)
          .expect(200)

        expect(response.body.success).toBe(true)
        expect(response.body.data.id).toBe(testRoundtableId)
        expect(response.body.data.client).toBeDefined()
        expect(response.body.data.topics).toBeDefined()
        expect(response.body.data.sessions).toBeDefined()
        expect(response.body.data.progress).toBeDefined()
      })
    })

    describe('PATCH /api/roundtables/:id/status', () => {
      it('should update roundtable status', async () => {
        const response = await request(app)
          .patch(`/api/roundtables/${testRoundtableId}/status`)
          .send({ status: 'TOPIC_VOTING' })
          .expect(200)

        expect(response.body.success).toBe(true)
        expect(response.body.data.status).toBe('TOPIC_VOTING')
      })

      it('should reject invalid status', async () => {
        const response = await request(app)
          .patch(`/api/roundtables/${testRoundtableId}/status`)
          .send({ status: 'INVALID_STATUS' })
          .expect(400)

        expect(response.body.success).toBe(false)
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle 404 for non-existent endpoints', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404)
    })

    it('should handle malformed JSON', async () => {
      const response = await request(app)
        .post('/api/clients')
        .send('invalid json')
        .set('Content-Type', 'application/json')
        .expect(400)
    })
  })

  // Cleanup
  afterAll(async () => {
    if (testRoundtableId) {
      await prisma.session.deleteMany({ where: { roundtableId: testRoundtableId } })
      await prisma.topic.deleteMany({ where: { roundtableId: testRoundtableId } })
      await prisma.roundtable.delete({ where: { id: testRoundtableId } })
    }
    if (testClientId) {
      await prisma.client.delete({ where: { id: testClientId } })
    }
  })
})