import { NextResponse } from "next/server"
import { validateCredentials } from "@/lib/server/userService"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    if (!username || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 })
    }

    const user = await validateCredentials(username, password)
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    return NextResponse.json({ success: true, role: user.role })
  } catch (err) {
    console.error("Login error", err)
    return NextResponse.json({ error: "Database connection failed. Please check your network." }, { status: 500 })
  }
}
