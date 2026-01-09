'use client'
import Link from 'next/link'
import { Logo } from '@/components/navBar/logo'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const homeMenuItems = [
    { name: 'Hero', href: '/#hero' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Contact', href: '/#contact' },
]

const mainMenuItems = [
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
]

interface HeroHeaderProps {
    logoUrl?: string | null
    logoLightUrl?: string | null
    companyName?: string
}

export const HeroHeader = ({ logoUrl, logoLightUrl, companyName }: HeroHeaderProps) => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [homeDropdownOpen, setHomeDropdownOpen] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 w-full"
        >
            <nav
                data-state={menuState && 'active'}
                className="w-full px-2">
                <div className={cn(
                    'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
                    isScrolled && 'bg-background/80 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5 shadow-lg'
                )}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo
                                    logoUrl={logoUrl}
                                    logoLightUrl={logoLightUrl}
                                    companyName={companyName}
                                    variant="default"
                                />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        {/* Desktop Menu */}
                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <NavigationMenu>
                                <NavigationMenuList className="flex gap-2 text-sm">
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="bg-card/80 backdrop-blur-sm text-foreground hover:bg-primary/10 hover:text-primary data-[state=open]:bg-primary/10 data-[state=open]:text-primary rounded-full px-4 py-2 font-medium border border-border/50">
                                            Home
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[220px] gap-2 p-3">
                                                {homeMenuItems.map((item, index) => (
                                                    <li key={index}>
                                                        <NavigationMenuLink asChild>
                                                            <Link
                                                                href={item.href}
                                                                className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary">
                                                                <div className="text-sm font-medium leading-none">{item.name}</div>
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    {mainMenuItems.map((item, index) => (
                                        <NavigationMenuItem key={index}>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href={item.href}
                                                    className="bg-card/80 backdrop-blur-sm text-foreground hover:bg-primary/10 hover:text-primary rounded-full px-4 py-2 font-medium border border-border/50 block transition-all duration-200"
                                                >
                                                    {item.name}
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>

                        {/* Mobile/Tablet Menu */}
                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden w-full">
                                <ul className="space-y-4 text-base">
                                    {/* Home Dropdown for Mobile */}
                                    <li>
                                        <button
                                            onClick={() => setHomeDropdownOpen(!homeDropdownOpen)}
                                            className="flex items-center justify-between w-full bg-muted/50 hover:bg-primary/10 text-foreground hover:text-primary rounded-xl px-4 py-3 font-medium transition-all duration-200">
                                            <span>Home</span>
                                            <ChevronDown className={cn("size-4 transition-transform", homeDropdownOpen && "rotate-180")} />
                                        </button>
                                        {homeDropdownOpen && (
                                            <ul className="mt-2 ml-4 space-y-2">
                                                {homeMenuItems.map((item, index) => (
                                                    <li key={index}>
                                                        <Link
                                                            href={item.href}
                                                            onClick={() => setMenuState(false)}
                                                            className="text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 block rounded-lg px-4 py-2 transition-all duration-200">
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                    {mainMenuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                onClick={() => setMenuState(false)}
                                                className="bg-muted/50 hover:bg-primary/10 text-foreground hover:text-primary rounded-xl px-4 py-3 font-medium block transition-all duration-200">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                >
                                    <Button
                                        asChild
                                        size="sm"
                                        className={cn("rounded-full", isScrolled ? 'lg:inline-flex' : 'hidden lg:inline-flex')}>
                                        <Link href="/contact">
                                            <span>Get Started</span>
                                        </Link>
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </motion.header>
    )
}
