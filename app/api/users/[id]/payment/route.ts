import { NextResponse } from "next/server"
import { updatePaymentStatus } from "@/lib/server/userService"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()
    
    if (!status || !['paid', 'unpaid'].includes(status)) {
      return NextResponse.json({ error: "Invalid payment status" }, { status: 400 })
    }

    await updatePaymentStatus(params.id, status)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Update payment status error", err)
    return NextResponse.json({ error: "Failed to update payment status" }, { status: 500 })
  }
}
