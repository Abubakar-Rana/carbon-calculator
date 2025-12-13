import { getDb } from "@/lib/db"
import { ObjectId } from "mongodb"

export type UserDoc = {
  _id?: ObjectId
  username: string
  password: string
  role: "admin" | "user"
  createdAt: string
  createdBy: string
}

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "carbonadmin"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "carbonadmin1"

function generateUsername(): string {
  const prefix = "carbon"
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, "0")
  return `${prefix}${randomNum}`
}

function generatePassword(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%"
  let password = ""
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

export async function ensureAdminExists() {
  const db = await getDb()
  const users = db.collection<UserDoc>("carbonusers")
  const existing = await users.findOne({ username: ADMIN_USERNAME })
  if (!existing) {
    const now = new Date().toISOString()
    await users.insertOne({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
      role: "admin",
      createdAt: now,
      createdBy: "system"
    })
  }
}

export async function listUsers() {
  const db = await getDb()
  const users = db.collection<UserDoc>("carbonusers")
  // Only fetch regular users, not admin
  const docs = await users.find({ role: "user" }, { projection: { password: 1, username: 1, role: 1, createdAt: 1, createdBy: 1 } }).sort({ createdAt: -1 }).toArray()
  return docs
}

export async function createUser(createdBy = "admin") {
  const db = await getDb()
  const users = db.collection<UserDoc>("carbonusers")

  let username = generateUsername()
  let tries = 0
  while (tries < 5) {
    const exists = await users.findOne({ username })
    if (!exists) break
    username = generateUsername()
    tries += 1
  }

  const password = generatePassword()
  const now = new Date().toISOString()
  const doc: UserDoc = {
    username,
    password,
    role: "user",
    createdAt: now,
    createdBy
  }
  const result = await users.insertOne(doc)
  return { ...doc, _id: result.insertedId }
}

export async function deleteUserById(id: string) {
  const db = await getDb()
  const users = db.collection<UserDoc>("carbonusers")
  const _id = new ObjectId(id)
  await users.deleteOne({ _id })
}

export async function validateCredentials(username: string, password: string) {
  // First check if it's admin login from env variables
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return { username: ADMIN_USERNAME, role: "admin" as const }
  }
  
  // Otherwise check regular users from MongoDB
  const db = await getDb()
  const users = db.collection<UserDoc>("carbonusers")
  const user = await users.findOne({ username, password, role: "user" })
  if (!user) return null
  return { username: user.username, role: user.role }
}
