// stores/groupStore.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Group {
  id: string
  name:string
  description: string
  group_type: string
  created_by: string
//   members: Array<string>
  created_at?: string
}

export const useGroupStore = defineStore('groups', () => {
  const groups = ref<Group[]>([])

  const totalGroups = computed(() => groups.value.length)
  const getGroupById = (id: string) => groups.value.find(g => g.id === id)

  // Mutations
  const setGroups = (newGroups: Group[]) => {
    groups.value = newGroups
  }

  const addGroup = (group: Group) => {
    groups.value.push(group)
  }

  const removeGroup = (id: string) => {
    groups.value = groups.value.filter(g => g.id !== id)
  }

  return {
    groups,
    totalGroups,
    getGroupById,
    setGroups,
    addGroup,
    removeGroup
  }
})
