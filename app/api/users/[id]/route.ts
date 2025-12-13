import { NextResponse } from "next/server"
import { deleteUserById } from "@/lib/server/userService"

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    if (!id) {
      return NextResponse.json({ error: "Missing user id" }, { status: 400 })
    }
    await deleteUserById(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Delete user error", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
