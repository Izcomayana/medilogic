"use client"

// import { useState } from "react"
import { Menu, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar () {
  // const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <nav className="bg-green-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-white p-1.5 rounded-md transition-transform duration-200 group-hover:scale-110">
              <Plus className="h-6 w-6 text-green-500 rotate-0 transition-transform duration-300 group-hover:rotate-90" />
            </div>
            <span className="text-white text-xl font-bold tracking-tight">Medilogic</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white hover:text-green-100 px-3 py-2 text-sm font-medium transition-all duration-200 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="#login"
              className="text-white hover:text-green-100 px-4 py-2 text-sm font-medium transition-colors duration-200"
            >
              Login
            </Link>
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Link href="#register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
};

