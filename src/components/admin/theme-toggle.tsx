"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-1">
            <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center justify-center rounded-xl px-4 py-2 transition-colors ${theme === "light"
                        ? "bg-foreground text-background"
                        : "text-muted hover:bg-card-border hover:text-foreground"
                    }`}
            >
                <Sun className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Light</span>
            </button>
            <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center justify-center rounded-xl px-4 py-2 transition-colors ${theme === "dark"
                        ? "bg-foreground text-background"
                        : "text-muted hover:bg-card-border hover:text-foreground"
                    }`}
            >
                <Moon className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Dark</span>
            </button>
            <button
                type="button"
                onClick={() => setTheme("system")}
                className={`flex items-center justify-center rounded-xl px-4 py-2 transition-colors ${theme === "system"
                        ? "bg-foreground text-background"
                        : "text-muted hover:bg-card-border hover:text-foreground"
                    }`}
            >
                <span className="text-sm font-medium">System</span>
            </button>
        </div>
    )
}
