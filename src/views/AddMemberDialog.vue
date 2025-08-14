<script setup lang="ts">
import { ref, watch } from 'vue';
import { getUsers, addMemberToGroup } from '../apiClient/ApiClient';

const props = defineProps<{
  groupId: string;
  isOpen: boolean;
}>();

const emit = defineEmits(['close', 'memberAdded']);

// State variables
const searchTerm = ref('');
const searchResults = ref<any[]>([]);
const loading = ref(false);
const error = ref('');
const success = ref('');
const selectedUserId = ref<string | null>(null);

// Debounce timer for search
let debounceTimer: ReturnType<typeof setTimeout>;

// Search for users when search term changes
watch(searchTerm, (newValue) => {
  // Clear previous timer
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  // Set a new timer for debouncing
  debounceTimer = setTimeout(async () => {
    if (newValue.length >= 2) {
      try {
        loading.value = true;
        error.value = '';
        searchResults.value = await getUsers(newValue);
      } catch (err: any) {
        error.value = err.message || 'Failed to search users';
        console.error('Error searching users:', err);
      } finally {
        loading.value = false;
      }
    } else {
      searchResults.value = [];
    }
  }, 300); // 300ms debounce delay
});

// Select a user
function selectUser(userId: string) {
  selectedUserId.value = userId;
}

// Add member to group
async function addMember() {
  if (!selectedUserId.value) {
    error.value = 'Please select a user first';
    return;
  }

  try {
    loading.value = true;
    error.value = '';
    success.value = '';
    
    await addMemberToGroup(props.groupId, selectedUserId.value);
    
    success.value = 'Member added successfully!';
    selectedUserId.value = null;
    
    // Emit event to parent
    emit('memberAdded');
    
    // Close the dialog after a short delay
    setTimeout(() => {
      emit('close');
    }, 1500);
    
  } catch (err: any) {
    error.value = err.message || 'Failed to add member';
    console.error('Error adding member:', err);
  } finally {
    loading.value = false;
  }
}

// Close the dialog
function closeDialog() {
  emit('close');
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeDialog">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3>Add Member to Group</h3>
        <button class="close-btn" @click="closeDialog">×</button>
      </div>
      
      <div class="modal-content">
        <!-- Error/Success messages -->
        <div v-if="error" class="error-message">{{ error }}</div>
        <div v-if="success" class="success-message">{{ success }}</div>
        
        <!-- Search input -->
        <div class="search-container">
          <input 
            type="text" 
            v-model="searchTerm" 
            placeholder="Search users by name or email..." 
            class="search-input"
            :disabled="loading"
          />
          <div v-if="loading" class="search-loader"></div>
        </div>
        
        <!-- Search results -->
        <div class="search-results">
          <div v-if="searchTerm.length < 2" class="info-message">
            Type at least 2 characters to search
          </div>
          
          <div v-else-if="loading" class="loading-message">
            Searching...
          </div>
          
          <div v-else-if="searchResults.length === 0" class="info-message">
            No users found
          </div>
          
          <div 
            v-else
            v-for="user in searchResults" 
            :key="user.id"
            class="user-item"
            :class="{ 'selected': selectedUserId === user.id }"
            @click="selectUser(user.id)"
          >
            <div class="user-avatar">{{ user.display_name?.charAt(0) || user.email?.charAt(0) || '?' }}</div>
            <div class="user-info">
              <div class="user-name">{{ user.display_name || 'Unnamed User' }}</div>
              <div class="user-email">{{ user.email }}</div>
            </div>
            <div v-if="selectedUserId === user.id" class="selected-icon">✓</div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="cancel-btn" @click="closeDialog" :disabled="loading">Cancel</button>
        <button 
          class="add-btn" 
          :disabled="!selectedUserId || loading" 
          @click="addMember"
        >
          {{ loading ? 'Adding...' : 'Add Member' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  max-height: 60vh;
  overflow-y: auto;
}

.search-container {
  position: relative;
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 1rem;
  background-color: #3a3a3a;
  border: 1px solid #555;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #00bfa5;
  box-shadow: 0 0 0 2px rgba(0, 191, 165, 0.2);
}

.search-loader {
  position: absolute;
  right: 12px;
  top: calc(50% - 8px);
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top-color: #00bfa5;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.search-results {
  margin-top: 1rem;
}

.info-message, .loading-message {
  text-align: center;
  padding: 1.5rem;
  color: #aaa;
}

.error-message {
  background-color: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.3);
  color: #f44336;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
}

.success-message {
  background-color: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.3);
  color: #4caf50;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #3a3a3a;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-item:hover {
  background-color: #444;
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

.user-item.selected {
  background-color: rgba(0, 191, 165, 0.15);
  border: 1px solid #00bfa5;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background-color: #00bfa5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  margin-right: 1rem;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.user-email {
  font-size: 0.9rem;
  color: #bbb;
}

.selected-icon {
  width: 24px;
  height: 24px;
  background-color: #00bfa5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: white;
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

.cancel-btn:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.1);
}

.add-btn {
  background-color: #00bfa5;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.add-btn:hover:not(:disabled) {
  background-color: #009688;
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

.add-btn:disabled, .cancel-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>