"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center px-6 gap-4">
                <div className="flex-1 flex items-center gap-4">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search..."
                            className="pl-10 bg-muted/50"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}
