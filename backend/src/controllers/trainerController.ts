import { Router, Request, Response } from 'express'
import { getErrorMessage } from '../utils/errorHandler'

const router = Router()

interface Trainer {
  id: string
  name: string
  email: string
  specialties: string[]
  status: 'ACTIVE' | 'INACTIVE' | 'UNAVAILABLE'
  rating: number
  sessionsCount: number
  availability: {
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    sunday: boolean
  }
  joinedDate: string
  lastActive: string
  bio?: string
  phone?: string
  hourlyRate?: number
}

// Mock data for development
const mockTrainers: Trainer[] = [
  {
    id: '1',
    name: 'Marco Rossi',
    email: 'marco.rossi@makaroundtables.com',
    specialties: ['Leadership', 'Team Management', 'Communication'],
    status: 'ACTIVE',
    rating: 4.8,
    sessionsCount: 24,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    joinedDate: '2023-06-15',
    lastActive: '2024-01-21T10:30:00Z',
    bio: 'Experienced leadership coach with 10+ years in corporate training',
    phone: '+39 345 678 9012',
    hourlyRate: 85
  },
  {
    id: '2',
    name: 'Laura Bianchi',
    email: 'laura.bianchi@makaroundtables.com',
    specialties: ['Negotiation', 'Sales', 'Conflict Resolution'],
    status: 'ACTIVE',
    rating: 4.9,
    sessionsCount: 18,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: false,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    },
    joinedDate: '2023-08-20',
    lastActive: '2024-01-20T15:45:00Z',
    bio: 'Expert negotiator and sales trainer',
    phone: '+39 346 789 0123',
    hourlyRate: 90
  }
]

// GET /api/trainers - Get all trainers
router.get('/', (req: Request, res: Response) => {
  try {
    const { status, specialty, availability } = req.query

    let filteredTrainers = [...mockTrainers]

    // Filter by status
    if (status && status !== 'all') {
      filteredTrainers = filteredTrainers.filter(trainer => 
        trainer.status === status
      )
    }

    // Filter by specialty
    if (specialty && specialty !== 'all') {
      filteredTrainers = filteredTrainers.filter(trainer =>
        trainer.specialties.some(s => 
          s.toLowerCase().includes((specialty as string).toLowerCase())
        )
      )
    }

    // Filter by availability
    if (availability && availability !== 'all') {
      const day = availability as keyof Trainer['availability']
      filteredTrainers = filteredTrainers.filter(trainer =>
        trainer.availability[day]
      )
    }

    res.json({
      success: true,
      data: filteredTrainers,
      total: filteredTrainers.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trainers',
      error: getErrorMessage(error)
    })
  }
})

// GET /api/trainers/:id - Get trainer by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const trainer = mockTrainers.find(t => t.id === id)

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      })
    }

    res.json({
      success: true,
      data: trainer
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trainer',
      error: getErrorMessage(error)
    })
  }
})

// POST /api/trainers - Create new trainer
router.post('/', (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      specialties,
      bio,
      phone,
      hourlyRate,
      availability
    } = req.body

    // Validation
    if (!name || !email || !specialties || !Array.isArray(specialties)) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and specialties are required'
      })
    }

    const newTrainer: Trainer = {
      id: (mockTrainers.length + 1).toString(),
      name,
      email,
      specialties,
      status: 'ACTIVE',
      rating: 0,
      sessionsCount: 0,
      availability: availability || {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false
      },
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString(),
      bio,
      phone,
      hourlyRate
    }

    mockTrainers.push(newTrainer)

    res.status(201).json({
      success: true,
      data: newTrainer,
      message: 'Trainer created successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create trainer',
      error: getErrorMessage(error)
    })
  }
})

// PUT /api/trainers/:id - Update trainer
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const trainerIndex = mockTrainers.findIndex(t => t.id === id)

    if (trainerIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      })
    }

    const updatedTrainer = {
      ...mockTrainers[trainerIndex],
      ...req.body,
      id // Ensure ID doesn't change
    }

    mockTrainers[trainerIndex] = updatedTrainer

    res.json({
      success: true,
      data: updatedTrainer,
      message: 'Trainer updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update trainer',
      error: getErrorMessage(error)
    })
  }
})

// DELETE /api/trainers/:id - Delete trainer
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const trainerIndex = mockTrainers.findIndex(t => t.id === id)

    if (trainerIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      })
    }

    const deletedTrainer = mockTrainers.splice(trainerIndex, 1)[0]

    res.json({
      success: true,
      data: deletedTrainer,
      message: 'Trainer deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete trainer',
      error: getErrorMessage(error)
    })
  }
})

// GET /api/trainers/stats/overview - Get trainer statistics
router.get('/stats/overview', (req: Request, res: Response) => {
  try {
    const stats = {
      total: mockTrainers.length,
      active: mockTrainers.filter(t => t.status === 'ACTIVE').length,
      inactive: mockTrainers.filter(t => t.status === 'INACTIVE').length,
      unavailable: mockTrainers.filter(t => t.status === 'UNAVAILABLE').length,
      averageRating: mockTrainers.reduce((sum, t) => sum + t.rating, 0) / mockTrainers.length,
      totalSessions: mockTrainers.reduce((sum, t) => sum + t.sessionsCount, 0),
      specialties: [...new Set(mockTrainers.flatMap(t => t.specialties))],
      averageHourlyRate: mockTrainers
        .filter(t => t.hourlyRate)
        .reduce((sum, t) => sum + (t.hourlyRate || 0), 0) / 
        mockTrainers.filter(t => t.hourlyRate).length
    }

    res.json({
      success: true,
      data: stats
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trainer statistics',
      error: getErrorMessage(error)
    })
  }
})

export default router