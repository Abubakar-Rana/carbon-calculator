import { NextResponse } from "next/server"
import { createUser, listUsers } from "@/lib/server/userService"

export async function GET() {
  try {
    const users = await listUsers()
    return NextResponse.json({ users })
  } catch (err) {
    console.error("List users error:", err)
    return NextResponse.json({ 
      error: "Database connection failed. Please check your network." 
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const createdBy = body?.createdBy || "admin"
    const user = await createUser(createdBy)
    return NextResponse.json({ user })
  } catch (err) {
    console.error("Create user error:", err)
    return NextResponse.json({ 
      error: "Database connection failed. Please check your network."
    }, { status: 500 })
  }
}
