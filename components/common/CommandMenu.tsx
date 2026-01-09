"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { useTheme } from "next-themes"
import {
    Search,
    FileText,
    Home,
    Briefcase,
    Phone,
    Laptop,
    Moon,
    Sun,
    Monitor
} from "lucide-react"

export function CommandMenu() {
    const router = useRouter()
    const [open, setOpen] = React.useState(false)
    const { setTheme } = useTheme()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false)
        command()
    }, [])

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] p-4 sm:p-0">
                <Command className="relative flex flex-col w-full overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl">
                    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <Command.Input
                            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Type a command or search..."
                        />
                    </div>
                    <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                        <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>

                        <Command.Group heading="Navigation" className="text-xs font-medium text-muted-foreground px-2 py-1.5 [&_[cmdk-item]]:rounded-md [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-2 [&_[cmdk-item]]:cursor-default [&_[cmdk-item]]:flex [&_[cmdk-item]]:items-center">
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/"))}
                                className="aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                                <Home className="mr-2 h-4 w-4 opacity-70" />
                                <span>Home</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/services"))}
                                className="aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                                <Briefcase className="mr-2 h-4 w-4 opacity-70" />
                                <span>Services</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/blog"))}
                                className="aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                                <FileText className="mr-2 h-4 w-4 opacity-70" />
                                <span>Blog</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/contact"))}
                                className="aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                                <Phone className="mr-2 h-4 w-4 opacity-70" />
                                <span>Contact</span>
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="Services" className="text-xs font-medium text-muted-foreground px-2 py-1.5 mt-2">
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/services/cctv-systems"))}
                                className="aria-selected:bg-accent aria-selected:text-accent-foreground rounded-md px-2 py-2 cursor-pointer flex items-center"
                            >
                                <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary/20">C</div>
                                <span>CCTV Systems</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push("/services/desktops-laptops"))}
                                className="aria-selected:bg-accent aria-selected:text-accent-foreground rounded-md px-2 py-2 cursor-pointer flex items-center"
                            >
                                <Laptop className="mr-2 h-4 w-4 opacity-70" />
                                <span>Laptops</span>
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="Theme" className="text-xs font-medium text-muted-foreground px-2 py-1.5 mt-2">
                            <Command.Item
                                onSelect={() => runCommand(() => setTheme("light"))}
                                className="aria-selected:bg-accent aria-selected:text-accent-foreground rounded-md px-2 py-2 cursor-pointer flex items-center"
                            >
                                <Sun className="mr-2 h-4 w-4 opacity-70" />
                                <span>Light</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => setTheme("dark"))}
                                className="aria-selected:bg-accent aria-selected:text-accent-foreground rounded-md px-2 py-2 cursor-pointer flex items-center"
                            >
                                <Moon className="mr-2 h-4 w-4 opacity-70" />
                                <span>Dark</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => setTheme("system"))}
                                className="aria-selected:bg-accent aria-selected:text-accent-foreground rounded-md px-2 py-2 cursor-pointer flex items-center"
                            >
                                <Monitor className="mr-2 h-4 w-4 opacity-70" />
                                <span>System</span>
                            </Command.Item>
                        </Command.Group>

                    </Command.List>

                    <div className="border-t p-2 text-xs text-muted-foreground flex items-center justify-end px-3 py-2 bg-muted/50">
                        <span className="bg-background border rounded px-1.5 py-0.5 text-[10px] mr-1">ESC</span> to close
                    </div>
                </Command>

                {/* Backdrop close handler */}
                <div
                    className="fixed inset-0 z-[-1]"
                    onClick={() => setOpen(false)}
                />
            </div>
        </div>
    )
}
