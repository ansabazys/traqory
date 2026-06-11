"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  BarChart2,
  Zap,
  Settings,
  ChevronLeft,
  Activity,
  CircleQuestionMark,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ProfileMenu } from "@/components/dashboard/profile-menu";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/overview" },
  { icon: Activity, label: "Realtime", href: "/realtime" },
  { icon: BarChart2, label: "Analytics", href: "/analytics" },
  { icon: Zap, label: "Events", href: "/events" },
  { icon: Globe, label: "Websites", href: "/websites" },
];

export function Sidebar({
  collapsed,
  setCollapsed,
  open,
  setOpen,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* MOBILE OVERLAY */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-[#050505] border-r border-white/5 transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col px-3 py-4">
          {/* TOP */}
          <div className="flex items-center justify-between mb-6">
            {!collapsed && <span className="text-white font-semibold text-lg">traqory</span>}

            {/* COLLAPSE BUTTON */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-md hover:bg-[#111]"
            >
              <ChevronLeft
                className={cn("h-4 w-4 text-white transition-transform", collapsed && "rotate-180")}
              />
            </button>
          </div>

          {/* NAV */}
          <div className="space-y-1 flex-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition",
                    isActive
                      ? "bg-[#1a1a1a] text-white"
                      : "text-gray-400 hover:bg-[#111] hover:text-white",
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>

          {/* FOOTER */}
          <div className="mt-6 flex flex-col gap-4 border-t border-white/5 pt-4">
            <div className="space-y-1 flex-1">
              <Link
                href="/settings"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-[#111] hover:text-white"
              >
                <Settings className="h-4 w-4" />
                {!collapsed && "Settings"}
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-[#111] hover:text-white"
              >
                <CircleQuestionMark className="h-4 w-4" />
                {!collapsed && "Get Help"}
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-[#111] hover:text-white"
              >
                <Search className="h-4 w-4" />
                {!collapsed && "Search"}
              </Link>
            </div>

            <ProfileMenu collapsed={collapsed} pathname={pathname} />
          </div>
        </div>
      </aside>
    </>
  );
}
