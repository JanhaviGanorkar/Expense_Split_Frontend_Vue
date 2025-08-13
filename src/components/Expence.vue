<script setup lang="ts">
import { ref } from 'vue'
import { useExpenseStore } from '../stores/expenses'

const expenseStore = useExpenseStore()

const newExpense = ref({
  description: '',
  amount: 0,
  category: 'Food'
})

const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Other']

const addExpense = () => {
  if (newExpense.value.description && newExpense.value.amount > 0) {
    expenseStore.addExpense({
      description: newExpense.value.description,
      amount: newExpense.value.amount,
      category: newExpense.value.category
    })
    
    // Reset form
    newExpense.value = {
      description: '',
      amount: 0,
      category: 'Food'
    }
  }
}
</script>

<template>
  <div class="expense-tracker">
    <div class="hero-section">
      <h1>💰 Expense Tracker</h1>
      <p class="hero-subtitle">Manage your finances with ease and track every expense</p>
    </div>
    
    <div class="content-section">
      <div class="expense-form">
        <h2>Add New Expense</h2>
        <form @submit.prevent="addExpense">
          <div class="form-group">
            <label for="description">Description:</label>
            <input 
              id="description"
              v-model="newExpense.description" 
              type="text"
              placeholder="Enter expense description"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="amount">Amount:</label>
            <input 
              id="amount"
              v-model.number="newExpense.amount" 
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="category">Category:</label>
            <select id="category" v-model="newExpense.category">
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
          
          <button type="submit" class="add-btn">Add Expense</button>
        </form>
      </div>

      <div class="expense-summary">
        <h2>Summary</h2>
        <p class="total">Total Expenses: ${{ expenseStore.totalExpenses.toFixed(2) }}</p>
        <p class="count">Total Number of Expenses: {{ expenseStore.expenseCount }}</p>
      </div>

      <div class="expense-list">
        <h2>Recent Expenses</h2>
        <div v-if="expenseStore.expenses.length === 0" class="no-expenses">
          No expenses yet. Add your first expense above!
        </div>
        <div v-else class="expenses">
          <div 
            v-for="expense in expenseStore.expenses" 
            :key="expense.id" 
            class="expense-item"
          >
            <div class="expense-details">
              <h3>{{ expense.description }}</h3>
              <p class="expense-meta">
                {{ expense.category }} • {{ expense.date }}
              </p>
            </div>
            <div class="expense-amount">
              ${{ expense.amount.toFixed(2) }}
            </div>
            <button 
              @click="expenseStore.deleteExpense(expense.id)"
              class="delete-btn"
              title="Delete expense"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.expense-tracker {
  width: 100%;
  padding: 0;
  /* padding-top: 80px; */
  box-sizing: border-box;
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 4rem 2rem;
  margin-bottom: 3rem;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
  color: white;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 0;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.content-section {
  padding: 2rem;
  background: #1a1a1a;
}

.expense-form {
  background: #2d2d2d;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid #4a4a4a;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #e5e5e5;
}

input, select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #4a4a4a;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #3a3a3a;
  color: #e5e5e5;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

input:focus, select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

input::placeholder {
  color: #9ca3af;
}

.add-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  min-height: 48px;
  width: 100%;
  touch-action: manipulation;
}

.add-btn:hover {
  background: #059669;
  transform: translateY(-2px);
}

.expense-summary {
  background: #2d2d2d;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid #4a4a4a;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.expense-summary h2 {
  color: #e5e5e5;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.total {
  font-size: 2rem;
  font-weight: bold;
  color: #10b981;
  margin-bottom: 0.5rem;
}

.count {
  color: #b0b0b0;
  font-size: 1.1rem;
}

.expense-list {
  max-width: 1200px;
  margin: 0 auto;
}

.expense-list h2 {
  margin-bottom: 20px;
  color: #e5e5e5;
  text-align: center;
  font-size: 2rem;
}

.no-expenses {
  text-align: center;
  color: #9ca3af;
  font-style: italic;
  padding: 40px;
}

.expenses {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.expense-item {
  display: flex;
  align-items: center;
  background: #2d2d2d;
  border: 1px solid #4a4a4a;
  border-radius: 8px;
  padding: 15px;
  transition: box-shadow 0.2s;
  position: relative;
}

.expense-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.expense-details {
  flex: 1;
  min-width: 0; /* Prevents flex item from overflowing */
}

.expense-details h3 {
  margin: 0 0 5px 0;
  color: #e5e5e5;
  font-size: 16px;
  word-wrap: break-word;
}

.expense-meta {
  margin: 0;
  color: #9ca3af;
  font-size: 14px;
}

.expense-amount {
  font-size: 18px;
  font-weight: bold;
  color: #ef4444;
  margin-right: 15px;
  flex-shrink: 0;
}

.delete-btn {
  background: #7f1d1d;
  color: #fca5a5;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
  touch-action: manipulation;
}

.delete-btn:hover {
  background: #991b1b;
}

/* Enhanced Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    padding: 3rem 1rem;
    margin-bottom: 2rem;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .content-section {
    padding: 1rem;
  }
  
  .expense-form {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .expense-summary {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .total {
    font-size: 1.5rem;
  }
  
  .expense-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 12px;
  }
  
  .expense-amount {
    align-self: flex-end;
    margin-right: 0;
  }
  
  .delete-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 2rem 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .expense-form,
  .expense-summary {
    padding: 1rem;
  }
  
  input, select {
    padding: 10px 12px;
    font-size: 14px;
  }
  
  .add-btn {
    width: 100%;
    padding: 12px;
  }
  
  .expense-item {
    padding: 10px;
  }
  
  .expense-details h3 {
    font-size: 14px;
  }
  
  .expense-meta {
    font-size: 12px;
  }
  
  .expense-amount {
    font-size: 16px;
  }
}
</style>
