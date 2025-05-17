
import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link
import { BookOpen, Film, Settings } from "lucide-react"; // Film for movies
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    {
      name: "책 기록",
      icon: <BookOpen className="h-6 w-6" />,
      href: "/books",
      active: pathname === "/books" || pathname === "/", // Make /books active for / also
    },
    {
      name: "영화 기록",
      icon: <Film className="h-6 w-6" />,
      href: "/movies",
      active: pathname === "/movies",
    },
    // {
    //   name: "설정",
    //   icon: <Settings className="h-6 w-6" />,
    //   href: "/settings",
    //   active: pathname === "/settings",
    // },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20"> {/* Increased max-width for better card layout */}
        <header className="py-6">
          <div className="flex justify-center">
            <h1 className="text-3xl font-bold text-primary">책 & 영화 기록</h1>
          </div>
        </header>
        <main>{children}</main>
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex justify-around py-3"> {/* Changed justify-between to justify-around */}
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link // Use Link component
                    to={item.href}
                    className={cn(
                      "flex flex-col items-center space-y-1 p-2 rounded-md", // Added padding and rounded
                      item.active
                        ? "text-primary bg-primary/10" // Active style with background
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    )}
                  >
                    {item.icon}
                    <span className="text-xs font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Layout;

