'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  X,
} from 'lucide-react';

import { cn } from '@/lib/utils/cn';

import { ProfileMenu } from '@/components/dashboard/profile-menu';

const navItems = [
  {
    icon: LayoutDashboard,
    label: 'Overview',
    href: '/overview',
  },
  {
    icon: Activity,
    label: 'Realtime',
    href: '/realtime',
  },
  {
    icon: BarChart2,
    label: 'Analytics',
    href: '/analytics',
  },
  {
    icon: Zap,
    label: 'Events',
    href: '/events',
  },
  {
    icon: Globe,
    label: 'Websites',
    href: '/websites',
  },
];

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export function Sidebar({ collapsed, setCollapsed, open, setOpen }: SidebarProps) {
  const pathname = usePathname();

  const handleNavigate = () => {
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen border-r border-white/5 bg-[#050505] transition-all duration-300',

          // Mobile
          'w-64',

          // Desktop
          collapsed ? 'md:w-16' : 'md:w-64',

          // Drawer behavior
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        <div className="flex h-full flex-col px-3 py-4">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            {!collapsed && <span className="font-semibold text-lg text-white">traqory</span>}

            <div className="flex items-center gap-1">
              {/* Mobile close */}
              <button
                onClick={() => setOpen(false)}
                className="flex  p-2 hover:bg-[#111] md:hidden border border-white/5"
              >
                <X className="h-4 w-4 text-white" />
              </button>

              {/* Desktop collapse */}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden rounded-md p-2 hover:bg-[#111] md:flex"
              >
                <ChevronLeft
                  className={cn(
                    'h-4 w-4 text-white transition-transform',
                    collapsed && 'rotate-180',
                  )}
                />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavigate}
                  className={cn(
                    'flex items-center rounded-md text-sm transition-colors',

                    collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2.5',

                    isActive
                      ? 'bg-[#1a1a1a] text-white'
                      : 'text-gray-400 hover:bg-[#111] hover:text-white',
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />

                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-6 border-t border-white/5 pt-4">
            <div className="space-y-1">
              <Link
                href="/settings"
                onClick={handleNavigate}
                className={cn(
                  'flex items-center rounded-md text-sm text-gray-400 transition-colors hover:bg-[#111] hover:text-white',

                  collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2.5',
                )}
              >
                <Settings className="h-4 w-4" />

                {!collapsed && <span>Settings</span>}
              </Link>

              <Link
                href="/help"
                onClick={handleNavigate}
                className={cn(
                  'flex items-center rounded-md text-sm text-gray-400 transition-colors hover:bg-[#111] hover:text-white',

                  collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2.5',
                )}
              >
                <CircleQuestionMark className="h-4 w-4" />

                {!collapsed && <span>Get Help</span>}
              </Link>

              <Link
                href="/search"
                onClick={handleNavigate}
                className={cn(
                  'flex items-center rounded-md text-sm text-gray-400 transition-colors hover:bg-[#111] hover:text-white',

                  collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2.5',
                )}
              >
                <Search className="h-4 w-4" />

                {!collapsed && <span>Search</span>}
              </Link>
            </div>

            <div className="mt-4">
              <ProfileMenu collapsed={collapsed} pathname={pathname} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
