<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="home">
    <div class="hero-section">
      <h1>💰 Welcome to Expense Tracker</h1>
      <p class="hero-subtitle">Take control of your finances with our simple and intuitive expense tracking app</p>
      
      <div class="features">
        <div class="feature-card">
          <div class="feature-icon">📝</div>
          <h3>Easy Tracking</h3>
          <p>Add expenses quickly with our simple form interface</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>Visual Summary</h3>
          <p>See your spending patterns with clear summaries</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">🏷️</div>
          <h3>Categories</h3>
          <p>Organize expenses by food, transport, entertainment, and more</p>
        </div>
      </div>
      
      <div class="cta-section">
        <RouterLink to="/expenses" class="cta-button">
          Start Tracking Expenses
        </RouterLink>
        <RouterLink to="/groups" class="secondary-button">
          Learn More
        </RouterLink>
      </div>
    </div>
    
    <div class="stats-section">
      <div class="stats-grid">
        <div class="stat-item">
          <h4>Simple</h4>
          <p>No complex setup required</p>
        </div>
        <div class="stat-item">
          <h4>Fast</h4>
          <p>Add expenses in seconds</p>
        </div>
        <div class="stat-item">
          <h4>Organized</h4>
          <p>Keep track with categories</p>
        </div>
        <div class="stat-item">
          <h4>Responsive</h4>
          <p>Works on all devices</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
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
  /* padding-top: 333px; */
  margin-bottom: 3rem;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  padding: 0 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
}

.cta-section {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3rem;
}

.cta-button, .secondary-button {
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  min-width: 200px;
  text-align: center;
}

.cta-button {
  background: #10b981;
  color: white;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.cta-button:hover {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.secondary-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.secondary-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.stats-section {
  padding: 4rem 2rem;
  background: #2d2d2d;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
  padding: 2rem 1rem;
  background: #3a3a3a;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  border: 1px solid #4a4a4a;
}

.stat-item:hover {
  transform: translateY(-3px);
}

.stat-item h4 {
  font-size: 1.5rem;
  color: #e5e5e5;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.stat-item p {
  color: #b0b0b0;
  margin: 0;
  line-height: 1.5;
}

/* Responsive Design */
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
  
  .features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
  
  .cta-section {
    flex-direction: column;
    align-items: center;
  }
  
  .stats-section {
    padding: 3rem 1rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
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
  
  .feature-card {
    padding: 1rem;
  }
  
  .feature-icon {
    font-size: 2.5rem;
  }
  
  .cta-button, .secondary-button {
    min-width: 180px;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
