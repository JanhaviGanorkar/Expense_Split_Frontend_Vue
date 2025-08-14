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
          
          <div class="group-actions">
            <button class="action-btn add-member" @click.stop="showAddMemberDialog(group.id)">
              <span class="action-icon">➕</span> Add Member
            </button>
            <button class="action-btn remove-member" @click.stop="showRemoveMemberDialog(group.id)">
              <span class="action-icon">➖</span> Remove Member
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <CreateGroupDialog 
    v-if="isCreateGroupDialogOpen" 
    @close="isCreateGroupDialogOpen = false" 
  />
  
  <!-- Add Member Dialog Component -->
  <AddMemberDialog
    v-if="isAddMemberDialogOpen"
    :groupId="selectedGroupId || ''"
    :isOpen="isAddMemberDialogOpen"
    @close="isAddMemberDialogOpen = false"
    @memberAdded="refreshGroups"
  />
  
  <!-- Remove Member Dialog (placeholder) -->
  <div v-if="isRemoveMemberDialogOpen" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h3>Remove Member from Group</h3>
        <button class="close-btn" @click="isRemoveMemberDialogOpen = false">×</button>
      </div>
      <div class="modal-content">
        <p>Remove member interface will go here for group ID: {{ selectedGroupId }}</p>
        <!-- Here you would add a list of current members with remove buttons -->
      </div>
      <div class="modal-footer">
        <button class="cancel-btn" @click="isRemoveMemberDialogOpen = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useGroupStore, type Group } from "../stores/group";
import { getAllGroups, getGroupDetails } from "../apiClient/ApiClient";
import { useRoute, useRouter } from "vue-router";
import CreateGroupDialog from "./CreateGroupDialog.vue"
import AddMemberDialog from "./AddMemberDialog.vue"
const store = useGroupStore();
const loading = ref(true);
const router = useRouter(); // ✅ yaha change
const route = useRoute();   // Agar current route ki info chahiye


// State to control dialogs visibility
const isCreateGroupDialogOpen = ref(false);
const isAddMemberDialogOpen = ref(false);
const isRemoveMemberDialogOpen = ref(false);
const selectedGroupId = ref<string | null>(null);

const groups = computed(() => store.groups);

function details(groupId: string) {
  router.push({ name: 'group-details', params: { id: groupId } });
}

function showAddMemberDialog(groupId: string) {
  selectedGroupId.value = groupId;
  isAddMemberDialogOpen.value = true;
}

function showRemoveMemberDialog(groupId: string) {
  selectedGroupId.value = groupId;
  isRemoveMemberDialogOpen.value = true;
}

// Function to refresh groups data
async function refreshGroups() {
  try {
    loading.value = true;
    const data: Group[] | undefined = await getAllGroups();
    store.setGroups(data ?? []);
  } catch (error) {
    console.error("Error refreshing groups:", error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  refreshGroups();
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

.group-actions {
  display: flex;
  gap: 10px;
  margin-top: 1.5rem;
  justify-content: center;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
}

.action-icon {
  margin-right: 5px;
  font-size: 1rem;
}

.add-member {
  background-color: #00bfa5;
  color: white;
}

.add-member:hover {
  background-color: #009688;
  transform: translateY(-2px);
}

.remove-member {
  background-color: #ff5252;
  color: white;
}

.remove-member:hover {
  background-color: #ff1744;
  transform: translateY(-2px);
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: #2d2d2d;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  animation: modal-appear 0.3s ease-out;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  background-color: #333;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: white;
  font-size: 1.3rem;
}

.close-btn {
  background: none;
  border: none;
  color: #aaa;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-radius: 50%;
}

.close-btn:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.modal-content {
  padding: 1.5rem;
  color: #ddd;
}

.modal-footer {
  padding: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  border-top: 1px solid #444;
}

.cancel-btn {
  background-color: transparent;
  color: #ddd;
  border: 1px solid #666;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>