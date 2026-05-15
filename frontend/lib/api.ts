const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://alanaqrawi-aie-backend.vercel.app"

export async function postChat(message: string): Promise<{ reply: string }> {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Backend ${res.status}: ${text || res.statusText}`)
  }

  return res.json()
}
