import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Expense {
  id: number
  description: string
  amount: number
  date: string
  category: string
}

export const useExpenseStore = defineStore('expenses', () => {
  const expenses = ref<Expense[]>([])

  const totalExpenses = computed(() => {
    return expenses.value.reduce((total, expense) => total + expense.amount, 0)
  })

  const expenseCount = computed(() => {
    return expenses.value.length
  })

  const expensesByCategory = computed(() => {
    const categories: Record<string, number> = {}
    expenses.value.forEach(expense => {
      categories[expense.category] = (categories[expense.category] || 0) + expense.amount
    })
    return categories
  })

  const addExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    }
    expenses.value.push(newExpense)
  }

  const deleteExpense = (id: number) => {
    expenses.value = expenses.value.filter(expense => expense.id !== id)
  }

  const clearAllExpenses = () => {
    expenses.value = []
  }

  return {
    expenses,
    totalExpenses,
    expenseCount,
    expensesByCategory,
    addExpense,
    deleteExpense,
    clearAllExpenses
  }
})