<template>
  <div class="container">
    <h1>Monthly Expense Calculator</h1>
    
    <!-- Expense Input Form -->
    <el-form :model="expenseForm" label-width="120px" class="expense-form">
      <el-form-item label="Category">
        <el-input v-model="expenseForm.category" placeholder="Enter category"></el-input>
      </el-form-item>
      <el-form-item label="Amount ($)">
        <el-input-number v-model="expenseForm.amount" :min="0" :precision="2"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addExpense">Add Expense</el-button>
      </el-form-item>
    </el-form>

    <!-- Expenses Table -->
    <el-table :data="expenses" style="width: 100%" class="expense-table">
      <el-table-column prop="category" label="Category"></el-table-column>
      <el-table-column prop="amount" label="Amount ($)">
        <template #default="scope">
          {{ scope.row.amount.toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template #default="scope">
          <el-button type="danger" size="small" @click="deleteExpense(scope.$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Calculate Button -->
    <div class="calculate-section">
      <el-button type="success" @click="calculateResults">Calculate Results</el-button>
    </div>

    <!-- Results Display -->
    <div v-if="results.total" class="results-section">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>Calculation Results</span>
          </div>
        </template>
        <div class="result-item">
          <strong>Total Expenses:</strong> ${{ results.total.toLocaleString() }}
        </div>
        <div class="result-item">
          <strong>Average Daily Expense:</strong> ${{ results.dailyAverage.toLocaleString() }}
        </div>
        <div class="result-item">
          <strong>Top 3 Expenses:</strong>
          <ul>
            <li v-for="(expense, index) in results.topThree" :key="index">
              {{ expense.category }}: ${{ expense.amount.toLocaleString() }}
            </li>
          </ul>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const expenses = ref([
  { category: 'Groceries', amount: 15000 },
  { category: 'Rent', amount: 40000 },
  { category: 'Transportation', amount: 5000 },
  { category: 'Entertainment', amount: 10000 },
  { category: 'Communication', amount: 2000 },
  { category: 'Gym', amount: 3000 }
])
const expenseForm = reactive({
  category: '',
  amount: 0
})

const results = reactive({
  total: 0,
  dailyAverage: 0,
  topThree: []
})

const addExpense = () => {
  if (expenseForm.category && expenseForm.amount > 0) {
    expenses.value.push({
      category: expenseForm.category,
      amount: expenseForm.amount
    })
    expenseForm.category = ''
    expenseForm.amount = 0
  }
}

const deleteExpense = (index) => {
  expenses.value.splice(index, 1)
}

const calculateResults = () => {
  if (expenses.value.length === 0) return

  // Calculate total
  results.total = expenses.value.reduce((sum, expense) => sum + expense.amount, 0)
  
  // Calculate daily average
  results.dailyAverage = results.total / 30

  // Get top 3 expenses
  results.topThree = [...expenses.value]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3)
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.expense-form {
  margin-bottom: 20px;
}

.expense-table {
  margin-bottom: 20px;
}

.calculate-section {
  margin: 20px 0;
  text-align: center;
}

.results-section {
  margin-top: 20px;
}

.result-item {
  margin: 10px 0;
}

.card-header {
  font-weight: bold;
}
</style> 