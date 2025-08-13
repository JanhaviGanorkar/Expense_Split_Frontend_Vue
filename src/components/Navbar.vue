<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'  
import { RouterLink } from 'vue-router'
import router from '@/router'

const authStore = useAuthStore()

// isAuthenticated ko store instance se use kar
const isAuthenticated = computed(() => authStore.isAuthenticated)

const isMobileMenuOpen = ref(false)
const isSidebarOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const logout = () => {
  authStore.logout()
  router.push('/')
  closeSidebar()
}

// Ye hook component ke mount hone par chalega aur auth state ko check karega
onMounted(() => {
  authStore.checkAuth()
})
</script>


<template>
  <header class="navbar">
   <div class="nav-container" :class="{ 'justify-between': !isAuthenticated }">
      <button v-if="isAuthenticated" @click="toggleSidebar" class="sidebar-toggle" :class="{ 'active': isSidebarOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="nav-brand">
        <h2>💰 Vue Learning App</h2>
      </div>
      
      <button 
        v-if="!isAuthenticated"
        class="mobile-menu-btn"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle navigation menu"
      >
        <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
      </button>
      
      <nav v-if="!isAuthenticated" class="nav-menu" :class="{ 'mobile-open': isMobileMenuOpen }">
        <RouterLink to="/login" class="nav-link" @click="closeMobileMenu">Login</RouterLink>
        <RouterLink to="/register" class="nav-link" @click="closeMobileMenu">Register</RouterLink>
      </nav>
    </div>

    <div v-if="isSidebarOpen" @click="closeSidebar" class="overlay"></div>

    <div v-if="isAuthenticated" class="sidebar" :class="{ 'open': isSidebarOpen }">
      <div class="sidebar-header">
        <h2>💰 Expense Tracker</h2>
        <button @click="closeSidebar" class="close-btn">×</button>
      </div>
      
      <nav class="sidebar-nav">
        <ul>

          <li>
            <RouterLink to="/expenses" class="nav-link-sidebar" @click="closeSidebar">
              <span class="nav-icon">📊</span>
              <span class="nav-text">Expenses</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/groups" class="nav-link-sidebar" @click="closeSidebar">
              <span class="nav-icon">ℹ️</span>
              <span class="nav-text">Groups</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/api" class="nav-link-sidebar" @click="closeSidebar">
              <span class="nav-icon">🔗</span>
              <span class="nav-text">API</span>
            </RouterLink>
          </li>
          <li>
            <button @click="logout" class="nav-link-sidebar logout-btn">
              <span class="nav-icon">🚪</span>
              <span class="nav-text">Logout</span>
            </button>
          </li>
        </ul>
      </nav>

      <div class="sidebar-footer">
        <p>© 2024 Expense Tracker</p>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Navbar Styles */
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding-left: 2px;
  width: 100%;
}
.nav-container.justify-between {
  justify-content: space-between;
  /* margin-left: 30px; */
  /* padding-left: 20px; */
}
.nav-container {
  max-width: 1200px;
  /* margin: 0 auto; */
  padding: 0 1rem;
  display: flex;
  justify-content: start;
  align-items: center;
  height: 70px;
  position: relative;
}

.nav-brand h2 {
  margin: 0;
  font-size: clamp(1.25rem, 4vw, 1.5rem);
  font-weight: 600;
}

/* Sidebar Toggle Button */
.sidebar-toggle {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  padding: 8px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  margin-right: 1rem;
}

.sidebar-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.sidebar-toggle span {
  width: 20px;
  height: 2px;
  background: white;
  margin: 2px 0;
  transition: all 0.3s ease;
  border-radius: 1px;
}

.sidebar-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.sidebar-toggle.active span:nth-child(2) {
  opacity: 0;
}

.sidebar-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  width: 30px;
  height: 30px;
  justify-content: space-around;
}

.hamburger-line {
  width: 25px;
  height: 3px;
  background: white;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Navigation Menu */
.nav-menu {
  display: flex;
  
  gap: 1.5rem;
  align-items: center;
  
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  font-size: clamp(0.875rem, 2vw, 1rem);
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.25);
  font-weight: 600;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background: white;
  border-radius: 2px;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: -320px;
  width: 320px;
  height: 100vh;
  background: linear-gradient(180deg, #2d2d2d 0%, #1a1a1a 100%);
  z-index: 1001;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-right: 1px solid #4a4a4a;
}

.sidebar.open {
  left: 0;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
}

/* Sidebar Header */
.sidebar-header {
  padding: 25px 20px;
  border-bottom: 1px solid #4a4a4a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #3a3a3a 0%, #2d2d2d 100%);
}

.sidebar-header h2 {
  color: #e5e5e5;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.5px;
}

.close-btn {
  background: none;
  border: none;
  color: #b0b0b0;
  font-size: 28px;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #e5e5e5;
  transform: rotate(90deg);
}

/* Sidebar Navigation */
.sidebar-nav {
  flex: 1;
  padding: 30px 0;
  overflow-y: auto;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  margin: 8px 20px;
}

.nav-link-sidebar {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  color: #b0b0b0;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.nav-link-sidebar::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.nav-link-sidebar:hover::before {
  left: 100%;
}

.nav-link-sidebar:hover {
  background: linear-gradient(135deg, #4a4a4a 0%, #3a3a3a 100%);
  color: #e5e5e5;
  transform: translateX(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.nav-link-sidebar.router-link-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.nav-link-sidebar:active {
  transform: translateX(4px) scale(0.98);
}

.nav-icon {
  font-size: 20px;
  margin-right: 15px;
  width: 24px;
  text-align: center;
  transition: transform 0.3s ease;
}

.nav-link-sidebar:hover .nav-icon {
  transform: scale(1.2);
}

.nav-text {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.3px;
}

/* Sidebar Footer */
.sidebar-footer {
  padding: 20px;
  border-top: 1px solid #4a4a4a;
  background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
}

.sidebar-footer p {
  color: #666;
  font-size: 12px;
  text-align: center;
  margin: 0;
  letter-spacing: 0.5px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
  }
  
  .sidebar-toggle {
    margin-right: 0.5rem;
    width: 35px;
    height: 35px;
  }
  
  .sidebar-toggle span {
    width: 18px;
    height: 2px;
  }
  
  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    flex-direction: column;
    gap: 0;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .nav-menu.mobile-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .nav-link {
    width: 100%;
    text-align: center;
    padding: 1rem;
    border-radius: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .nav-link:last-child {
    border-bottom: none;
  }
  
  .nav-link.router-link-active::after {
    display: none;
  }
  
  .nav-link.router-link-active {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .sidebar {
    width: 280px;
    left: -280px;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 0.75rem;
    height: 60px;
  }
  
  .nav-brand h2 {
    font-size: 1.1rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
    padding: 0.875rem;
  }
  
  .sidebar-toggle {
    width: 32px;
    height: 32px;
  }
  
  .sidebar-toggle span {
    width: 16px;
    height: 2px;
  }
  
  .sidebar {
    width: 260px;
    left: -260px;
  }
}
</style>
