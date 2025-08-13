<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { register } from '@/apiClient/ApiClient'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const authStore = useAuthStore()

const handleRegister = async () => {
    loading.value = true
    error.value = ''

    // Validate passwords match
    if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match'
        loading.value = false
        return
    }

    // Validate password length
    if (password.value.length < 6) {
        error.value = 'Password must be at least 6 characters long'
        loading.value = false
        return
    }
    try {
        const data = await register(email.value, password.value, name.value || email.value.split('@')[0])
        
        // Update auth store with new user data
        authStore.user = {
            id: data.user?.id,
            display_name: data.user?.name || data.user?.display_name,
            email: data.user?.email
            
        }
        
        // Store token if provided
        if (data.token) {
            localStorage.setItem('auth_token', data.token)
        }
        
        // Redirect to home page
        router.push('/expenses')
    } catch (err: any) {
        error.value = err.message || 'Registration failed'
        console.error('Registration error:', err)
    } finally {
        loading.value = false
    }
}
const goToLogin = () => {
    router.push('/login')
}
</script>

<template>
    <div class="register">
        <div class="register-container">
            <div class="register-form">
                <h1>📝 Register</h1>
                <p class="register-subtitle">Create your account</p>

                <div v-if="error" class="error-message">
                    {{ error }}
                </div>

                <form @submit.prevent="handleRegister">
                    <div class="form-group">
                        <label for="name">Display Name:</label>
                        <input type="text" id="name" v-model="name" placeholder="Enter your display name (optional)"
                            :disabled="loading" />
                    </div>

                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" v-model="email" required placeholder="Enter your email"
                            :disabled="loading" />
                    </div>

                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" v-model="password" required
                            placeholder="Enter your password (min 6 characters)" :disabled="loading" />
                    </div>

                    <div class="form-group">
                        <label for="confirmPassword">Confirm Password:</label>
                        <input type="password" id="confirmPassword" v-model="confirmPassword" required
                            placeholder="Confirm your password" :disabled="loading" />
                    </div>

                    <button type="submit" class="register-btn" :disabled="loading">
                        {{ loading ? 'Creating Account...' : 'Register' }}
                    </button>
                </form>

                <div class="login-link">
                    <p>Already have an account?
                        <button @click="goToLogin" class="link-btn" :disabled="loading">
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.register {
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}

.register-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 500px;
    padding: 3rem 2rem;
}

.register-form {
    text-align: center;
}

.register-form h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: white;
    font-weight: 700;
}

.register-subtitle {
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
    box-sizing: border-box;
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

.register-btn {
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

.register-btn:hover:not(:disabled) {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.register-btn:disabled {
    background: #6b7280;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.register-btn:active:not(:disabled) {
    transform: translateY(0);
}

.login-link {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.login-link p {
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    font-size: 1rem;
}

.link-btn {
    background: none;
    border: none;
    color: #10b981;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.link-btn:hover:not(:disabled) {
    color: #059669;
    text-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
}

.link-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
    .register {
        padding: 1rem;
    }

    .register-container {
        padding: 2rem 1.5rem;
        max-width: 450px;
    }

    .register-form h1 {
        font-size: 2rem;
    }

    .register-subtitle {
        font-size: 1rem;
    }

    .form-group input {
        padding: 0.875rem;
    }

    .register-btn {
        padding: 0.875rem 1.5rem;
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .register-container {
        padding: 1.5rem 1rem;
        max-width: 400px;
    }

    .register-form h1 {
        font-size: 1.75rem;
    }

    .form-group input {
        padding: 0.75rem;
        font-size: 0.9rem;
    }

    .register-btn {
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
    }
}
</style>