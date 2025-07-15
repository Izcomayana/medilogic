"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Features", href: "#features" },
    { name: "Solutions", href: "#solutions" },
    { name: "Contact", href: "#contact" },
    { name: "Login", href: "#login" },
    { name: "Register", href: "#register" },
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

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((item, index) =>
                item.name === "Register" ? (
                  <Link key={item.name} href={item.href}>
                    <Button className="bg-white text-[#15941f] font-semibold  transition-all rounded-md border hover:border-[#ffffff] hover:text-gray-50 hover:bg-[#15941f] cursor-pointer">
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
                ),
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
                    isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 !w-full !h-full transition-all duration-300 cursor-pointer ${
                    isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
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
          isOpen ? "max-h-80 opacity-100 backdrop-blur-sm" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 border-t border-[#ffffff]">
          {navLinks.map((item, index) =>
            item.name === "Register" ? (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block max-w-[30rem] px-3 py-2 font-semibold text-center text-[#15941f] bg-[#ffffff] hover:bg-transparent hover:text-[#ffffff] hover:border-[#ffffff] hover:border-2 rounded-md transition-all duration-300 transform ${
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: isOpen ? `${index * 225}ms` : "0ms" }}
              >
                {item.name}
              </Link>
            ) : item.name === "Login" ? (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block max-w-[30rem] px-3 py-2 font-semibold text-center bg-[#15941f] text-[#ffffff] border-[#ffffff] border-2 rounded-md hover:text-[#15941f] hover:bg-[#ffffff] transition-all duration-300 transform ${
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: isOpen ? `${index * 225}ms` : "0ms" }}
              >
                {item.name}
              </Link>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium text-[#ffffff] transition-all duration-300 transform z-10 ${
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-36 opacity-0"
                }`}
                style={{ transitionDelay: isOpen ? `${index * 200}ms` : "0ms" }}
              >
                {item.name}
              </Link>
            ),
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 md:hidden transiton-all duration-300 z-[-20]"
          onClick={() => setIsOpen(false)}
          style={{ top: "57px" }}
        />
      )}
    </nav>
  );
}

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const navLinks = [
//     { name: "About", href: "#about" },
//     { name: "Features", href: "#features" },
//     { name: "Solutions", href: "#solutions" },
//     { name: "Contact", href: "#contact" },
//     { name: "Login", href: "#login" },
//     { name: "Register", href: "#register" },
//   ];

//   return (
//     <nav className="fixed top-0 bg-[#15941f] w-full px-4 z-50 shadow-lg backdrop-blur-md 2xl:px-0">
//       <div className="w-full opacity-100">
//         <div className="container mx-auto flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link href="/" className="flex items-center space-x-2 group">
//               <div className="bg-green-500 rounded transition-transform duration-200 group-hover:scale-110">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="12"
//                   height="12"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="3.5"
//                   className="lucide lucide-plus h-8 w-8 text-gray-50 rotate-0 transition-transform duration-300 group-hover:rotate-90"
//                   aria-hidden="true"
//                 >
//                   <path d="M5 12h14"></path>
//                   <path d="M12 5v14"></path>
//                 </svg>
//               </div>
//               <span className="text-white text-xl font-bold tracking-tight">
//                 Medilogic
//               </span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:block">
//             <div className="ml-10 flex items-baseline space-x-8">
//               {navLinks.map((item, index) =>
//                 item.name === "Register" ? (
//                   <Link key={item.name} href={item.href}>
//                     <Button className="bg-white text-[#15941f] font-semibold  transition-all rounded-md border hover:border-[#ffffff] hover:text-gray-50 hover:bg-[#15941f] cursor-pointer">
//                       {item.name}
//                     </Button>
//                   </Link>
//                 ) : (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className="relative px-3 py-2 text-sm text-[#ffffff] font-medium transition-all duration-300 group lg:text-base"
//                     style={{ animationDelay: `${index * 100}ms` }}
//                   >
//                     {item.name}
//                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ffffff] transition-all duration-300 group-hover:w-full"></span>
//                   </Link>
//                 ),
//               )}
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="lg:hidden">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={toggleMenu}
//               className="text-[#ffffff] hover:text-[#159420ae] transition-all duration-600"
//             >
//               <div className="relative w-6 h-6">
//                 <Menu
//                   className={`absolute inset-0 !w-full !h-full transition-all duration-300 cursor-pointer ${
//                     isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
//                   }`}
//                 />
//                 <X
//                   className={`absolute inset-0 !w-full !h-full transition-all duration-300 cursor-pointer ${
//                     isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
//                   }`}
//                 />
//               </div>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation Menu */}
//       <div
//         className={`lg:hidden transition-all duration-500 ease-in-out ${
//           isOpen ? "max-h-80 opacity-100 backdrop-blur-sm" : "max-h-0 opacity-0"
//         } overflow-hidden`}
//       >
//         <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 border-t border-[#ffffff]">
//           {navLinks.map((item, index) =>
//             item.name === "Register" ? (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 onClick={() => setIsOpen(false)}
//                 className={`block max-w-[30rem] px-3 py-2 font-semibold text-center text-[#15941f] bg-[#ffffff] hover:bg-transparent hover:text-[#ffffff] hover:border-[#ffffff] hover:border-2 rounded-md transition-all duration-300 transform ${
//                   isOpen
//                     ? "translate-x-0 opacity-100"
//                     : "translate-y-8 opacity-0"
//                 }`}
//                 style={{ transitionDelay: isOpen ? `${index * 225}ms` : "0ms" }}
//               >
//                 {item.name}
//               </Link>
//             ) : item.name === "Login" ? (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 onClick={() => setIsOpen(false)}
//                 className={`block max-w-[30rem] px-3 py-2 font-semibold text-center bg-[#15941f] text-[#ffffff] border-[#ffffff] border-2 rounded-md hover:text-[#15941f] hover:bg-[#ffffff] transition-all duration-300 transform ${
//                   isOpen
//                     ? "translate-x-0 opacity-100"
//                     : "translate-y-8 opacity-0"
//                 }`}
//                 style={{ transitionDelay: isOpen ? `${index * 225}ms` : "0ms" }}
//               >
//                 {item.name}
//               </Link>
//             ) : (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 onClick={() => setIsOpen(false)}
//                 className={`block px-3 py-2 text-base font-medium text-[#ffffff] transition-all duration-300 transform z-10 ${
//                   isOpen
//                     ? "translate-x-0 opacity-100"
//                     : "-translate-x-36 opacity-0"
//                 }`}
//                 style={{ transitionDelay: isOpen ? `${index * 200}ms` : "0ms" }}
//               >
//                 {item.name}
//               </Link>
//             ),
//           )}
//         </div>
//       </div>

//       {isOpen && (
//         <div
//           className="fixed inset-0 md:hidden transiton-all duration-300 z-[-20]"
//           onClick={() => setIsOpen(false)}
//           style={{ top: "57px" }}
//         />
//       )}
//     </nav>
//   );
// }
