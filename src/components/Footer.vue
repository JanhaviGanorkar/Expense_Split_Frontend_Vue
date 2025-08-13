<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>

        <footer class="footer">
            <div class="footer-content">
                <p>&copy; 2024 Expence Tracker</p>
                <div class="footer-links">
                    <RouterLink to="/" class="nav-link" @click="closeMobileMenu">Home</RouterLink>
                    <RouterLink to="/groups" class="nav-link" @click="closeMobileMenu">About</RouterLink>
                    <RouterLink to="/expenses" class="nav-link" @click="closeMobileMenu">Expense</RouterLink>
                </div>
            </div>
        </footer>
    </template>


<style scoped>
.footer {
    background: #2c3e50;
    color: white;
    margin-top: auto;
    width: 100%;
        display: flex;
    justify-content: center;
    align-items: center;
}

.footer-content {
    width: 100%;
    margin: 0;
    padding: 2rem 1rem;
    
        display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-evenly;
  
    flex-wrap: wrap;
    gap: 1rem;
    box-sizing: border-box;
}

.footer-content p {
    margin: 0;
    color: #bdc3c7;
    font-size: 0.9rem;
}

.footer-links {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
 }

.footer-links a {
    color: #3498db;
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 0.9rem;
    padding: 0.25rem 0;
}

.footer-links a:hover {
    color: #5dade2;
}

/* Responsive Design */
@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
        text-align: center;
        padding: 1.5rem 1rem;
        gap: 0.75rem;
    }

    .footer-links {
        gap: 1rem;
        justify-content: center;
    }

    .footer-content p,
    .footer-links a {
        font-size: 0.8rem;
    }
}

@media (max-width: 480px) {
    .footer-content {
        padding: 1rem;
    }

    .footer-links {
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>