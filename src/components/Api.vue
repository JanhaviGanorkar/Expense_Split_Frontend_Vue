<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Pehle ek interface bana lo jisse API se aane wale data ka type define ho sake.
interface User {
  id: string
  display_name: string
  email: string
  created_at: string
}

// Reactive variable banate hain jisme users ka data store hoga.
const users = ref<User[]>([])
const loading = ref(true)

// API call onMounted me karenge.
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8000/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include', // Include cookies if needed
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log(data, "users")
    users.value = data.users || data  // Handle both wrapped and direct array responses
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="api-container">
    <h2>Users List:</h2>
    <div v-if="loading" class="loading">Loading...</div>
    <ul v-else class="users-list">
      <li v-for="user in users" :key="user.id" class="user-item">
        {{ user.display_name }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.api-container {
  padding: 2rem;
  background: #1a1a1a;
  min-height: 100vh;
}

.api-container h2 {
  color: #e5e5e5;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  text-align: center;
}

.loading {
  text-align: center;
  color: #b0b0b0;
  font-size: 1.2rem;
  padding: 2rem;
}

.users-list {
  list-style: none;
  padding: 0;
  max-width: 800px;
  margin: 0 auto;
}

.user-item {
  background: #2d2d2d;
  border: 1px solid #4a4a4a;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: #e5e5e5;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.user-item:hover {
  background: #3a3a3a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

/* Responsive Design */
@media (max-width: 768px) {
  .api-container {
    padding: 1rem;
  }
  
  .api-container h2 {
    font-size: 1.5rem;
  }
  
  .user-item {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
}
</style>
