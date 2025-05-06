
import React from "react";
import { useLocation } from "react-router-dom";
import { Smile, BookOpen, BarChart2, Music, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    {
      name: "기분 기록",
      icon: <Smile className="h-6 w-6" />,
      href: "/",
      active: pathname === "/",
    },
    {
      name: "일기장",
      icon: <BookOpen className="h-6 w-6" />,
      href: "/journal",
      active: pathname === "/journal",
    },
    {
      name: "통계",
      icon: <BarChart2 className="h-6 w-6" />,
      href: "/stats",
      active: pathname === "/stats",
    },
    {
      name: "힐링 콘텐츠",
      icon: <Music className="h-6 w-6" />,
      href: "/healing",
      active: pathname === "/healing",
    },
    {
      name: "설정",
      icon: <Settings className="h-6 w-6" />,
      href: "/settings",
      active: pathname === "/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 pb-20">
        <header className="py-6">
          <div className="flex justify-center">
            <h1 className="text-3xl font-bold text-primary">마음 일기</h1>
          </div>
        </header>
        <main>{children}</main>
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex justify-between py-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center space-y-1",
                      item.active
                        ? "text-primary"
                        : "text-gray-500 hover:text-gray-800"
                    )}
                  >
                    {item.icon}
                    <span className="text-xs">{item.name}</span>
                  </a>
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
