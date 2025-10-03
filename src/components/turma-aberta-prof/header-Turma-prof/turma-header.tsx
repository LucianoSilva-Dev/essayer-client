"use client"

import { useEffect, useState } from "react"
import { TurmaInfo } from "./turma-info"
import type { Turma, User } from "../../../types/turma"

interface TurmaHeaderProps {
  turma: Turma | null
}

export function TurmaHeader({ turma }: TurmaHeaderProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Get user from localStorage or fetch from API
    const token = localStorage.getItem("token")
    if (token) {
      // In a real app, decode JWT or fetch user data
      // For now, we'll fetch from /users/me endpoint
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.error("Failed to fetch user:", err))
    }
  }, [])

  const userInitials =
    user?.nome
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U"

  return (
    <div className="flex items-start justify-between">
      <TurmaInfo turma={turma} />

      <div className="flex items-center gap-3">
        <span className="text-sm text-foreground">Olá, {user?.nome || "Usuário"}</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium text-sm">
          {userInitials}
        </div>
      </div>
    </div>
  )
}
