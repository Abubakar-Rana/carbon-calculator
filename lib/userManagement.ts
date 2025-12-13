// User management utilities
export interface User {
  id: string
  username: string
  password: string
  createdAt: string
  createdBy: string
}

// Generate random username
export function generateUsername(): string {
  const prefix = "carbon"
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, "0")
  return `${prefix}${randomNum}`
}

// Generate random password
export function generatePassword(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%"
  let password = ""
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

// Get all users from localStorage
export function getAllUsers(): User[] {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem("carbonUsers")
  return users ? JSON.parse(users) : []
}

// Save users to localStorage
export function saveUsers(users: User[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("carbonUsers", JSON.stringify(users))
}

// Create a new user
export function createUser(createdBy: string = "admin"): User {
  const users = getAllUsers()
  
  // Generate unique username
  let username = generateUsername()
  while (users.some(u => u.username === username)) {
    username = generateUsername()
  }
  
  const newUser: User = {
    id: Date.now().toString(),
    username,
    password: generatePassword(),
    createdAt: new Date().toISOString(),
    createdBy
  }
  
  users.push(newUser)
  saveUsers(users)
  
  return newUser
}

// Delete a user
export function deleteUser(userId: string): void {
  const users = getAllUsers()
  const filteredUsers = users.filter(u => u.id !== userId)
  saveUsers(filteredUsers)
}

// Check if username exists
export function usernameExists(username: string): boolean {
  const users = getAllUsers()
  return users.some(u => u.username === username)
}
