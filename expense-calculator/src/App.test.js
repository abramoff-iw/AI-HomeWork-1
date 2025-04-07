import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'

describe('Expense Calculator', () => {
  let wrapper

  beforeEach(() => {
    const app = createApp(App)
    app.use(ElementPlus)
    wrapper = mount(App)
  })

  describe('Initial State', () => {
    it('should have initial expenses loaded', () => {
      const expenses = wrapper.vm.expenses
      expect(expenses).toHaveLength(6)
      expect(expenses[0]).toEqual({ category: 'Groceries', amount: 15000 })
      expect(expenses[1]).toEqual({ category: 'Rent', amount: 40000 })
    })

    it('should have empty form initially', () => {
      const form = wrapper.vm.expenseForm
      expect(form.category).toBe('')
      expect(form.amount).toBe(0)
    })
  })

  describe('Adding Expenses', () => {
    it('should add new expense when form is filled correctly', async () => {
      const initialLength = wrapper.vm.expenses.length
      
      await wrapper.setData({
        expenseForm: {
          category: 'Test Category',
          amount: 1000
        }
      })
      
      await wrapper.find('button[type="primary"]').trigger('click')
      
      expect(wrapper.vm.expenses).toHaveLength(initialLength + 1)
      expect(wrapper.vm.expenses[initialLength]).toEqual({
        category: 'Test Category',
        amount: 1000
      })
    })

    it('should not add expense when category is empty', async () => {
      const initialLength = wrapper.vm.expenses.length
      
      await wrapper.setData({
        expenseForm: {
          category: '',
          amount: 1000
        }
      })
      
      await wrapper.find('button[type="primary"]').trigger('click')
      
      expect(wrapper.vm.expenses).toHaveLength(initialLength)
    })

    it('should not add expense when amount is 0 or negative', async () => {
      const initialLength = wrapper.vm.expenses.length
      
      await wrapper.setData({
        expenseForm: {
          category: 'Test Category',
          amount: 0
        }
      })
      
      await wrapper.find('button[type="primary"]').trigger('click')
      
      expect(wrapper.vm.expenses).toHaveLength(initialLength)
    })
  })

  describe('Deleting Expenses', () => {
    it('should delete expense when delete button is clicked', async () => {
      const initialLength = wrapper.vm.expenses.length
      
      await wrapper.findAll('button[type="danger"]')[0].trigger('click')
      
      expect(wrapper.vm.expenses).toHaveLength(initialLength - 1)
    })
  })

  describe('Calculations', () => {
    it('should calculate total expenses correctly', async () => {
      await wrapper.find('button[type="success"]').trigger('click')
      
      expect(wrapper.vm.results.total).toBe(75000)
    })

    it('should calculate average daily expense correctly', async () => {
      await wrapper.find('button[type="success"]').trigger('click')
      
      expect(wrapper.vm.results.dailyAverage).toBe(2500)
    })

    it('should show top 3 expenses in correct order', async () => {
      await wrapper.find('button[type="success"]').trigger('click')
      
      const topThree = wrapper.vm.results.topThree
      expect(topThree).toHaveLength(3)
      expect(topThree[0]).toEqual({ category: 'Rent', amount: 40000 })
      expect(topThree[1]).toEqual({ category: 'Groceries', amount: 15000 })
      expect(topThree[2]).toEqual({ category: 'Entertainment', amount: 10000 })
    })

    it('should handle empty expenses list', async () => {
      await wrapper.setData({ expenses: [] })
      await wrapper.find('button[type="success"]').trigger('click')
      
      expect(wrapper.vm.results.total).toBe(0)
      expect(wrapper.vm.results.dailyAverage).toBe(0)
      expect(wrapper.vm.results.topThree).toHaveLength(0)
    })
  })

  describe('UI Elements', () => {
    it('should display results card when calculations are performed', async () => {
      expect(wrapper.find('.results-section').exists()).toBe(false)
      
      await wrapper.find('button[type="success"]').trigger('click')
      
      expect(wrapper.find('.results-section').exists()).toBe(true)
    })

    it('should format numbers with commas in the table', () => {
      const amountCell = wrapper.find('.el-table__body-wrapper .el-table__row:first-child td:nth-child(2)')
      expect(amountCell.text()).toBe('15,000')
    })

    it('should format numbers with commas in results', async () => {
      await wrapper.find('button[type="success"]').trigger('click')
      
      const totalElement = wrapper.find('.result-item:first-child')
      expect(totalElement.text()).toContain('75,000')
    })
  })
}) 