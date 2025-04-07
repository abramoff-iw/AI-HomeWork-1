import { describe, it, expect } from 'vitest'

// Business logic functions
const calculateTotalExpenses = (expenses) => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0)
}

const calculateDailyAverage = (totalExpenses) => {
  return totalExpenses / 30
}

const getTopThreeExpenses = (expenses) => {
  return [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3)
}

describe('Expense Calculator Business Logic', () => {
  const sampleExpenses = [
    { category: 'Groceries', amount: 15000 },
    { category: 'Rent', amount: 40000 },
    { category: 'Transportation', amount: 5000 },
    { category: 'Entertainment', amount: 10000 },
    { category: 'Communication', amount: 2000 },
    { category: 'Gym', amount: 3000 }
  ]

  describe('Total Expenses Calculation', () => {
    it('should calculate total expenses correctly', () => {
      const total = calculateTotalExpenses(sampleExpenses)
      expect(total).toBe(75000)
    })

    it('should return 0 for empty expenses list', () => {
      const total = calculateTotalExpenses([])
      expect(total).toBe(0)
    })

    it('should handle single expense', () => {
      const total = calculateTotalExpenses([{ category: 'Test', amount: 1000 }])
      expect(total).toBe(1000)
    })
  })

  describe('Daily Average Calculation', () => {
    it('should calculate daily average correctly', () => {
      const total = calculateTotalExpenses(sampleExpenses)
      const dailyAverage = calculateDailyAverage(total)
      expect(dailyAverage).toBe(2500)
    })

    it('should return 0 for zero total expenses', () => {
      const dailyAverage = calculateDailyAverage(0)
      expect(dailyAverage).toBe(0)
    })
  })

  describe('Top Three Expenses', () => {
    it('should return top 3 expenses in correct order', () => {
      const topThree = getTopThreeExpenses(sampleExpenses)
      expect(topThree).toHaveLength(3)
      expect(topThree[0]).toEqual({ category: 'Rent', amount: 40000 })
      expect(topThree[1]).toEqual({ category: 'Groceries', amount: 15000 })
      expect(topThree[2]).toEqual({ category: 'Entertainment', amount: 10000 })
    })

    it('should handle less than 3 expenses', () => {
      const fewExpenses = sampleExpenses.slice(0, 2)
      const topThree = getTopThreeExpenses(fewExpenses)
      expect(topThree).toHaveLength(2)
      expect(topThree[0]).toEqual({ category: 'Rent', amount: 40000 })
      expect(topThree[1]).toEqual({ category: 'Groceries', amount: 15000 })
    })

    it('should return empty array for no expenses', () => {
      const topThree = getTopThreeExpenses([])
      expect(topThree).toHaveLength(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle expenses with zero amounts', () => {
      const expensesWithZeros = [
        { category: 'Test1', amount: 0 },
        { category: 'Test2', amount: 1000 },
        { category: 'Test3', amount: 0 }
      ]
      const total = calculateTotalExpenses(expensesWithZeros)
      expect(total).toBe(1000)
    })

    it('should handle expenses with same amounts', () => {
      const sameAmountExpenses = [
        { category: 'Test1', amount: 1000 },
        { category: 'Test2', amount: 1000 },
        { category: 'Test3', amount: 1000 }
      ]
      const topThree = getTopThreeExpenses(sameAmountExpenses)
      expect(topThree).toHaveLength(3)
      expect(topThree.every(expense => expense.amount === 1000)).toBe(true)
    })
  })
}) 