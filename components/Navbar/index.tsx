'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const applyLinks = [
    { name: 'Apply as an Organization', href: '/apply' },
    { name: 'Apply as a Regulator', href: '/apply' },
    { name: 'Apply as a Medilogic Driver', href: '/apply' },
  ];

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contacts' },
    // { name: 'Apply as an Organization', href: '/apply' },
    { name: 'Login', href: '/login' },
    { name: 'Register', href: '/register' },
  ];

  const authLinks = [
    { name: 'Login', href: '/login' },
    { name: 'Register', href: '/register' },
  ];

  return (
    <nav className="fixed top-0 bg-[#15941f] w-full px-4 z-50 shadow-lg backdrop-blur-md 2xl:px-0">
      <div className="w-full opacity-100">
        <div className="container mx-auto flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="rounded transition-transform duration-200 group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  className="lucide lucide-plus h-8 w-8 text-gray-50 rotate-0 transition-transform duration-300 group-hover:rotate-90"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </div>
              <span className="text-white text-xl font-bold tracking-tight">
                Medilogic
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex ml-10 items-baseline space-x-8">
            <Link
              href="/about"
              className="relative px-3 py-2 text-sm text-[#ffffff] font-medium transition-all duration-300 group lg:text-base"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ffffff] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              href="/features"
              className="relative px-3 py-2 text-sm text-[#ffffff] font-medium transition-all duration-300 group lg:text-base"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ffffff] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              href="/pricing"
              className="relative px-3 py-2 text-sm text-[#ffffff] font-medium transition-all duration-300 group lg:text-base"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ffffff] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Apply dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white text-base font-medium px-3 py-2 hover:bg-transparent focus:bg-transparent">
                    Apply
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className="w-56">
                      {applyLinks.map((item) => (
                        <li key={item.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {item.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-baseline space-x-8">
            <div className="">
              {authLinks.map((item, index) =>
                item.name === 'Register' ? (
                  <Link key={item.name} href={item.href}>
                    <Button className="bg-white text-[#15941f] font-semibold ml-4 transition-all rounded-md border hover:border-[#ffffff] hover:text-gray-50 hover:bg-[#15941f] cursor-pointer">
                      {item.name}
                    </Button>
                  </Link>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative px-3 py-2 text-sm text-[#ffffff] font-medium transition-all duration-300 group lg:text-base"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ffffff] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-[#ffffff] hover:text-[#159420ae] transition-all duration-600"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 !w-full !h-full transition-all duration-300 cursor-pointer ${
                    isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`}
                />
                <X
                  className={`absolute inset-0 !w-full !h-full transition-all duration-300 cursor-pointer ${
                    isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                  }`}
                />
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden transition-all duration-500 ease-in-out ${
          isOpen
            ? 'max-h-fit opacity-100 backdrop-blur-sm'
            : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 border-t border-[#ffffff]">
          {/* Primary mobile links */}
          {/* Primary mobile links (NO auth buttons here) */}
          {navLinks
            .filter((item) => !['Login', 'Register'].includes(item.name))
            .map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-white"
              >
                {item.name}
              </Link>
            ))}

          {/* Divider */}
          <div className="my-4 border-t border-white/40" />

          {/* Apply section (MentorsHub-style) */}
          <div className="grid grid-cols-2 gap-y-2 px-3 text-sm text-white/80">
            {applyLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-white transition text-sm "
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth buttons LAST */}
          <div className="mt-4 space-y-2">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block max-w-[30rem] px-3 py-2 font-semibold text-center text-white border-2 border-white rounded-md"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="block max-w-[30rem] px-3 py-2 font-semibold text-center text-[#15941f] bg-white rounded-md"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 md:hidden transiton-all duration-300 z-[-20]"
          onClick={() => setIsOpen(false)}
          style={{ top: '57px' }}
        />
      )}
    </nav>
  );
}
