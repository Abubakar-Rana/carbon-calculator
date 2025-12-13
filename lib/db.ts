import { MongoClient, Db } from "mongodb"

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || "carbonbnu"

type Cached = {
  client: MongoClient | null
  db: Db | null
  connectionFailed?: boolean
  lastAttempt?: number
}

let cached: Cached = (global as any)._mongoCache || { client: null, db: null }

export async function getDb(): Promise<Db> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local")
  }

  // If connection failed recently (within 60 seconds), throw immediately
  if (cached.connectionFailed && cached.lastAttempt) {
    const timeSinceFailure = Date.now() - cached.lastAttempt
    if (timeSinceFailure < 60000) { // 60 seconds
      throw new Error("MongoDB connection unavailable. Please check network access in MongoDB Atlas.")
    } else {
      // Reset after 60 seconds to allow retry
      cached.connectionFailed = false
    }
  }

  if (cached.db) return cached.db

  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 3000, // Fail fast - 3 seconds
      connectTimeoutMS: 3000,
      socketTimeoutMS: 3000,
    })
    
    await client.connect()
    const db = client.db(dbName)

    cached = { client, db, connectionFailed: false }
    ;(global as any)._mongoCache = cached

    return db
  } catch (error) {
    // Mark connection as failed with timestamp
    cached = { client: null, db: null, connectionFailed: true, lastAttempt: Date.now() }
    ;(global as any)._mongoCache = cached
    throw error
  }
}
