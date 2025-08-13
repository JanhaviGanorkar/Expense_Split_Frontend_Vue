<template>
   <div class="group-list-container">
    <div class="header-section">
      <h2 class="section-title">Your Groups</h2>
      <p class="section-subtitle">Manage your shared expenses and finances with ease.</p>
      
      <button class="create-group-btn" @click="isCreateGroupDialogOpen = true">
        + Create Group
      </button>

    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading groups...</p>
    </div>

    <div v-else-if="!groups.length" class="empty-state">
      <p>No groups found. Create a new group to get started.</p>
    </div>

    <div v-else class="groups-grid">
      <div class="group-card" v-for="group in groups" :key="group.id" @click="details(group.id)">
        <div class="card-header">
          <span class="group-icon">👥</span>
          <div>
            <h3 class="group-title">{{ group.name }}</h3>
            <p class="group-description">{{ group.description }}</p>
          </div>
        </div>
        <div class="divider"></div>
        <div class="group-info">
          <div class="info-item">
            <span class="info-icon">🏷️</span>
            <strong>Type:</strong> {{ group.group_type }}
          </div>
          <div class="info-item">
            <span class="info-icon">👤</span>
            <strong>Created by:</strong> {{ group.created_by }}
          </div>
        
        </div>
      </div>
    </div>
  </div>

  <CreateGroupDialog 
    v-if="isCreateGroupDialogOpen" 
    @close="isCreateGroupDialogOpen = false" 
  />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useGroupStore, type Group } from "../stores/group";
import { getAllGroups, getGroupDetails } from "../apiClient/ApiClient";
import { useRoute, useRouter } from "vue-router";
import CreateGroupDialog from "./CreateGroupDialog.vue"
const store = useGroupStore();
const loading = ref(true);
const router = useRouter(); // ✅ yaha change
const route = useRoute();   // Agar current route ki info chahiye


// State to control dialog visibility
const isCreateGroupDialogOpen = ref(false);

const groups = computed(() => store.groups);

function details(groupId: string) {
  router.push({ name: 'group-details', params: { id: groupId } });
}

onMounted(async () => {
  try {
    const data: Group[] | undefined = await getAllGroups();
    store.setGroups(data ?? []);
  } catch (error) {
    console.error("Error fetching groups:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.group-list-container {
 width: 100%;
  padding: 0;
  /* padding-top: 80px; */
  box-sizing: border-box;
}

.header-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 4rem 2rem;
  /* padding-top: 333px; */
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.5rem;
  letter-spacing: 1px;
}

.section-subtitle {
 font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.groups-grid {
 display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 4fr));
  gap: 2rem;
  margin: 3rem 0;
  padding: 0 2rem;
}

.group-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.group-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.card-header {
  display: flex;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem;
}

.group-icon {
  font-size: 2rem;
  color: #00bfa5;
  margin-right: 1rem;
  background: #2a2a2a;
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.group-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.divider {
  height: 1px;
  background-color: #333;
  margin: 0 1.5rem;
}

.group-info {
  padding: 1rem 1.5rem 1.5rem;
  flex-grow: 1;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #b0b0b0;
  font-size: 0.9rem;
}

.info-icon {
  font-size: 1.1rem;
  margin-right: 0.75rem;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 3rem;
  color: #b0b0b0;
  font-size: 1.2rem;
  border: 1px dashed #333;
  border-radius: 12px;
  margin-top: 2rem;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: #00bfa5;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .groups-grid {
    gap: 1.5rem;
  }
}

.header-section {
  position: relative;
  /* ... existing styles ... */
}

.create-group-btn {
  background-color: #00bfa5;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  margin-top: 2rem;
}

.create-group-btn:hover {
  background-color: #009688;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.group-card {
  cursor: pointer; /* Add a cursor to indicate it's clickable */
  /* ... existing styles ... */
}
</style>