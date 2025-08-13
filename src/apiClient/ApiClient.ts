// API Client functions for the expense tracker app
import type { Group } from "@/stores/group"
import type { GroupDetails } from "@/views/GroupDetailsView.vue"
import type {addGroup} from '../views/CreateGroupDialog.vue'
interface User {
    id?: number
    name: string
    email: string
    password?: string
}

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        if (!response.ok) {
            throw new Error(`Login failed: ${response.status}`)
        }

        const data = await response.json()
        console.log('Login successful:', data)
        return data
    } catch (err: any) {
        console.error('Login error:', err)
        throw err
    }
}

export const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch('http://localhost:8000/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.status}`)
        }

        const data = await response.json()
        console.log('Users fetched:', data)
        return data.users || data
    } catch (err: any) {
        console.error('Fetch users error:', err)
        throw err
    }
}
export const register = async (email: string, password: string, display_name: string) => {
    try {
        const response = await fetch('http://localhost:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                display_name
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Registration failed')
        }

        const data = await response.json()
        console.log('Registration successful:', data)
        return data
    } catch (err: any) {
        console.error('Registration error:', err)
        throw err
    }
}


export const getAllGroups = async () => {
    const response =await fetch("http://localhost:8000/api/groups/", {
        method : "GET",
        headers: {
            "Content-Type" : "application/json"
        }
    })
if (response.ok) {
    const data = await response.json();
    const groupsArray: Group[] = data.groups || data;
    return groupsArray
    console.log(groupsArray);

    // console.log(response)
}


}


export const getGroupDetails = async (id:string) => {
    const response =await fetch(`http://localhost:8000/api/groups/${id}`, {
        method : "GET",
        headers: {
            "Content-Type" : "application/json"
        }
    })
    if (response.ok) {
        const data = await response.json();
        const details: GroupDetails[] = data || [];
        return details
    }
     return [];

}

// api/groups/<uuid:group_id>/



export const createNewGroup = async (formData: FormData) => {
  const response = await fetch("http://localhost:8000/api/groups/", {
    method: "POST",
    body: formData, // Multipart data send
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to create group: ${JSON.stringify(errorData)}`);
  }

  return await response.json();
};


// getAllGroups()
// api/groups/