<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { loginUser } from '../apiClient/ApiClient'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const authStore = useAuthStore()

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const data = await loginUser(email.value, password.value)
    authStore.login(data)
    router.push('/expenses')
  } catch (err: any) {
    error.value = err.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
<template>
    <div class="login">
        <div class="login-container">
            <div class="login-form">
                <h1>🔐 Login</h1>
                <p class="login-subtitle">Sign in to your account</p>
                
                <div v-if="error" class="error-message">
                    {{ error }}
                </div>
                
                <form @submit.prevent="handleLogin">
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            v-model="email" 
                            required 
                            placeholder="Enter your email"
                            :disabled="loading"
                        />
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            v-model="password" 
                            required 
                            placeholder="Enter your password"
                            :disabled="loading"
                        />
                    </div>

                    <button type="submit" class="login-btn" :disabled="loading">
                        {{ loading ? 'Logging in...' : 'Login' }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login {
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}

.login-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 450px;
    padding: 3rem 2rem;
}

.login-form {
    text-align: center;
}

.login-form h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: white;
    font-weight: 700;
}

.login-subtitle {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 2rem;
}

.error-message {
    background: rgba(220, 38, 38, 0.8);
    color: white;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 500;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(220, 38, 38, 0.3);
}

.form-group {
    margin-bottom: 1.5rem;
    text-align: left;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: white;
    font-weight: 500;
    font-size: 1rem;
}

.form-group input {
    width: 100%;
    padding: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
}

.form-group input::placeholder {
    color: rgba(255, 255, 255, 0.6);
}

.form-group input:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

.form-group input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.login-btn {
    width: 100%;
    padding: 1rem 2rem;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.login-btn:hover {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.login-btn:disabled {
    background: #6b7280;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.login-btn:active {
    transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 768px) {
    .login {
        padding: 1rem;
    }
    
    .login-container {
        padding: 2rem 1.5rem;
        max-width: 400px;
    }
    
    .login-form h1 {
        font-size: 2rem;
    }
    
    .login-subtitle {
        font-size: 1rem;
    }
    
    .form-group input {
        padding: 0.875rem;
    }
    
    .login-btn {
        padding: 0.875rem 1.5rem;
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .login-container {
        padding: 1.5rem 1rem;
        max-width: 350px;
    }
    
    .login-form h1 {
        font-size: 1.75rem;
    }
    
    .form-group input {
        padding: 0.75rem;
        font-size: 0.9rem;
    }
    
    .login-btn {
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
    }
}
</style>
