import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-[#032541] text-white flex justify-between items-center px-8 py-4 sticky top-0 z-10">
      <div className="flex items-center">
        <Link to={"/"} className="text-2xl font-bold">
          Movie App
        </Link>
      </div>
      <nav className="hidden md:flex space-x-4">
        {links.map((link) => (
          <Link key={link.label} to={link.href} className="hover:underline">
            {link.label}
          </Link>
        ))}
      </nav>
      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation menu">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-16 right-0 bg-[#032541] shadow-lg rounded-lg">
          {links.map((link) => (
            <Link key={link.label} to={link.href} className="block px-8 py-4 hover:bg-gray-100 rounded" onClick={() => setIsOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
