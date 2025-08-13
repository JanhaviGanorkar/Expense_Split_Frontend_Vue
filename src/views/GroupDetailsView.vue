<template>
  <div class="group-details-container">
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading group details...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>Error: {{ error }}</p>
      <p>Could not load group details.</p>
    </div>

    <div v-else-if="group" class="details-card">
      <div class="header-section">
        <h2 class="group-name">👥 {{ group.name }}</h2>
        <p class="group-description">{{ group.description }}</p>
      </div>

      <div class="info-section">
    
        <div class="info-item">
          <strong>Type:</strong> <span>{{ group.group_type }}</span>
        </div>
        <div class="info-item">
          <strong>Created By:</strong> <span>{{ group.created_by }}</span>
        </div>
        <div class="info-item">
          <strong>Created At:</strong> <span>{{ new Date(group.created_at).toLocaleString() }}</span>
        </div>
      </div>
      
      <div class="members-section">
        <h3>Members</h3>
        <ul v-if="group.members && group.members.length > 0" class="members-list">
          <li v-for="member in group.members" :key="member.user_id" class="member-item">
            <span class="member-role">{{ member.role }}</span>
            <span class="member-name">{{ member.user_name }}</span>
            <span class="member-join-date">Joined: {{ new Date(member.joined_at).toLocaleDateString() }}</span>
          </li>
        </ul>
        <p v-else class="no-members">No members in this group.</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getGroupDetails } from "../apiClient/ApiClient";

const route = useRoute();
export interface GroupDetails {
  id: string;
  name: string;
  description: string;
  group_type: string;
  created_by: string;
  members: {
    user_id: string;
    user_name: string;
    role: string;
    joined_at: string;
  }[];
  created_at: string;
}

const group = reactive<GroupDetails>({
  id: "",
  name: "",
  description: "",
  group_type: "",
  created_by: "",
  members: [],
  created_at: ""
});

const loading = ref(true);
const error = ref("");

onMounted(async () => {
  const groupId = route.params.id as string;
  if (!groupId) {
    error.value = "Group ID not found.";
    loading.value = false;
    return;
  }

  try {
    const response = await getGroupDetails(groupId);
    
    // response ek object hai → spread karke reactive object me assign
    Object.assign(group, response);

    console.log("Loaded group:", group);
  } catch (err) {
    error.value = "Failed to fetch group details.";
    console.error("Error fetching group details:", err);
  } finally {
    loading.value = false;
  }
});

</script>

<style scoped>
/* Global-like styles for a polished look */
body {
  font-family: 'Poppins', sans-serif; /* Example font */
  background-color: #1a1a1a;
  color: #e5e5e5;
}

.group-details-container {
  max-width: 900px;
  margin: 3rem auto;
  padding: 0 2rem;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.details-card {
  background: linear-gradient(145deg, #2d2d2d, #1f1f1f);
  border-radius: 18px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  color: #f0f0f0;
  border: 1px solid #333;
}

.header-section {
  text-align: center;
  /* border-bottom: 2px solid #444; */
  padding-bottom: 2rem;
  /* margin-bottom: 2rem; */
}

.group-name {
  font-size: 3rem;
  margin: 0;
  color: #00bfa5;
  font-weight: 800;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.group-description {
  font-style: italic;
  color: #b0b0b0;
  margin-top: 0.75rem;
  font-size: 1.1rem;
}

/* .info-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
} */

.info-item {
  /* background: #a71010; */
  padding: 1.5rem;
  /* border-radius: 12px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.2); */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
}

.info-item strong {
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.info-item span {
  font-size: 1rem;
  color: #b0b0b0;
  word-break: break-all;
  text-align: center;
}

.members-section {
  margin-top: 3rem;
}

.members-section h3 {
  /* border-bottom: 2px solid #444; */
  padding-bottom: 0.75rem;
  /* margin-bottom: 1.5rem; */
  color: #00bfa5;
  font-size: 1.5rem;
}

.members-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  gap: 1.5rem;
}

.member-item {
  background: #333;
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.member-item:hover {
  background-color: #444;
}

.member-name {
  font-weight: 700;
  color: #fff;
  font-size: 1.1rem;
}

.member-role {
  font-size: 0.9em;
  padding: 4px 10px;
  background-color: #00bfa5;
  color: #1a1a1a;
  border-radius: 6px;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.member-join-date {
  font-size: 0.9em;
  color: #999;
  margin-top: 0.5rem;
}

.loading-state, .error-state {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #b0b0b0;
  border: 1px dashed #444;
  border-radius: 12px;
  margin-top: 2rem;
  animation: fadeIn 0.5s ease-in-out;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: #00bfa5;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .details-card {
    padding: 2rem;
  }
  .info-section {
    grid-template-columns: 1fr;
  }
}
</style>