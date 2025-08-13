<template>
  <div class="dialog-overlay" @click.self="$emit('close')">
    <div class="dialog-card">
      <div class="dialog-header">
        <h3>Create New Group</h3>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>

      <form @submit.prevent="createGroup">
        <div class="form-group">
          <label for="groupName">Group Name</label>
          <input type="text" id="groupName" v-model="groupForm.name" required>
        </div>
        
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="groupForm.description" required></textarea>
        </div>
        
        <div class="form-group">
          <label for="groupType">Group Type</label>
          <select id="groupType" v-model="groupForm.group_type" required>
            <option value="COSTUM_SPLIT">Custom Split</option>
            <option value="EQUALLY">Equally</option>
          </select>
        </div>

        <div class="form-group">
          <label for="groupImage">Group Image</label>
          <input type="file" id="groupImage" @change="handleImageUpload" accept="image/*">
        </div>

        <div v-if="imagePreview" class="image-preview-container">
          <img :src="imagePreview" alt="Group Image Preview" class="image-preview">
          <button type="button" class="delete-img-btn" @click="removeImage">&times;</button>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="submit-btn" :disabled="isLoading">
            {{ isLoading ? 'Creating...' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, reactive } from 'vue';
import { createNewGroup } from '../apiClient/ApiClient'; 

const emit = defineEmits(['close']);


export type addGroup = {
  name: string;
  description: string;
  group_type: string;
  avatar_url?: File | null; 
};

const groupForm = reactive<addGroup>({
  name: '',
  description: '',
  group_type: 'COSTUM_SPLIT',
  avatar_url: null,
});

const isLoading = ref(false);
const imagePreview = ref<string | null>(null);

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    groupForm.avatar_url = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  groupForm.avatar_url = null;
  imagePreview.value = null;
  const fileInput = document.getElementById('groupImage') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = ''; 
  }
};

const createGroup = async () => {
  isLoading.value = true;
  try {
    const formData = new FormData();
    formData.append('name', groupForm.name);
    formData.append('description', groupForm.description);
    formData.append('group_type', groupForm.group_type);
    if (groupForm.avatar_url) {
      formData.append('avatar_url', groupForm.avatar_url);
    }

    const newGroupData = await createNewGroup(formData); 
    console.log('Group created successfully:', newGroupData);
    emit('close');
  } catch (error) {
    console.error('Error creating group:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease-in-out;
}

.dialog-card {
  background: #2a2a2a;
  border-radius: 15px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  color: #f0f0f0;
  animation: slideIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideIn {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #444;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.dialog-header h3 {
  margin: 0;
  color: #00bfa5;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #b0b0b0;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #fff;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #ccc;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  background: #333;
  border: 1px solid #555;
  border-radius: 8px;
  color: #f0f0f0;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #00bfa5;
  box-shadow: 0 0 0 3px rgba(0, 191, 165, 0.3);
}

.form-actions {
  text-align: right;
  margin-top: 2rem;
}

.submit-btn {
  background-color: #00bfa5;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background-color: #009688;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background-color: #555;
  cursor: not-allowed;
}


.image-preview-container {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 1rem;
  border: 1px solid #555;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.delete-img-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.2rem;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.delete-img-btn:hover {
  background: rgba(255, 0, 0, 0.8);
}

</style>