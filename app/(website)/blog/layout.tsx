import { FloatingThemeToggle } from "@/components/blog/FloatingThemeToggle"

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <FloatingThemeToggle />
            {children}
        </>
    )
}
