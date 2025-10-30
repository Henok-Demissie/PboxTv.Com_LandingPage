import { NextResponse } from "next/server"

const TMDB_BASE = "https://api.themoviedb.org/3"
const TMDB_IMG = "https://image.tmdb.org/t/p/w500"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title") || ""
  if (!title) return NextResponse.json({ error: "missing title" }, { status: 400 })

  const apiKey = process.env.TMDB_API_KEY
  if (!apiKey) return NextResponse.json({ error: "missing TMDB_API_KEY" }, { status: 500 })

  try {
    const q = encodeURIComponent(title)
    const res = await fetch(`${TMDB_BASE}/search/multi?query=${q}&include_adult=false&language=en-US&page=1`, {
      headers: { Authorization: `Bearer ${apiKey}`, accept: "application/json" },
      cache: "no-store",
    })
    const data = await res.json()
    const first = data?.results?.find((r: any) => r?.poster_path)
    if (!first?.poster_path) return NextResponse.json({ poster: null })
    const poster = `${TMDB_IMG}${first.poster_path}`
    return NextResponse.json({ poster })
  } catch (e) {
    return NextResponse.json({ poster: null })
  }
}



