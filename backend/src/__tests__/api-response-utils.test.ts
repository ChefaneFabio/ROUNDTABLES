import { apiResponse } from '../utils/apiResponse'

/**
 * API Response Utility Tests
 * Verifies the response formatting helpers work correctly
 */

describe('apiResponse utility', () => {
  describe('success()', () => {
    it('should return success format with data', () => {
      const result = apiResponse.success({ id: '1', name: 'Test' })
      expect(result.success).toBe(true)
      expect(result.data).toEqual({ id: '1', name: 'Test' })
    })

    it('should include optional message', () => {
      const result = apiResponse.success(null, 'Created successfully')
      expect(result.message).toBe('Created successfully')
    })

    it('should include optional meta/pagination', () => {
      const result = apiResponse.success([], undefined, { page: 1, limit: 10, total: 50, totalPages: 5 })
      expect(result.meta?.page).toBe(1)
      expect(result.meta?.total).toBe(50)
    })

    it('should handle null data', () => {
      const result = apiResponse.success(null, 'Deleted')
      expect(result.success).toBe(true)
      expect(result.data).toBeNull()
    })

    it('should handle array data', () => {
      const items = [{ id: '1' }, { id: '2' }]
      const result = apiResponse.success(items)
      expect(result.data).toHaveLength(2)
    })
  })

  describe('error()', () => {
    it('should return error format', () => {
      const result = apiResponse.error('Not found', 'NOT_FOUND')
      expect(result.success).toBe(false)
      expect(result.error).toBe('Not found')
      expect(result.code).toBe('NOT_FOUND')
    })

    it('should handle error without code', () => {
      const result = apiResponse.error('Something went wrong')
      expect(result.success).toBe(false)
      expect(result.error).toBe('Something went wrong')
    })

    it('should include optional details', () => {
      const result = apiResponse.error('Validation failed', 'VALIDATION_ERROR', { field: 'email' })
      expect(result.details).toEqual({ field: 'email' })
    })
  })

  describe('paginated()', () => {
    it('should return paginated format', () => {
      const data = [{ id: '1' }, { id: '2' }]
      const result = apiResponse.paginated(data, { page: 1, limit: 10, total: 50 })
      expect(result.success).toBe(true)
      expect(result.data).toHaveLength(2)
      expect(result.meta?.page).toBe(1)
      expect(result.meta?.limit).toBe(10)
      expect(result.meta?.total).toBe(50)
      expect(result.meta?.totalPages).toBe(5)
    })

    it('should calculate totalPages correctly', () => {
      const result = apiResponse.paginated([], { page: 1, limit: 10, total: 23 })
      expect(result.meta?.totalPages).toBe(3) // Math.ceil(23/10) = 3
    })

    it('should handle empty data', () => {
      const result = apiResponse.paginated([], { page: 1, limit: 10, total: 0 })
      expect(result.data).toHaveLength(0)
      expect(result.meta?.totalPages).toBe(0)
    })
  })
})
