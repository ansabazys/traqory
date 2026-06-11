"use client";

import { useRouter } from "next/navigation";

import {
  CreditCard,
  LogOut,
  Settings,
  UserCircle2,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import { useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/utils/cn";

import { useSession } from "@/hooks/auth/use-session";
import { useLogout } from "@/hooks//auth/use-logout";
import { useProfileMenu } from "@/hooks/ui/use-profile-menu";

export function ProfileMenu({
  collapsed,
  pathname,
}: {
  collapsed: boolean;
  pathname: string;
}) {
  const router = useRouter();

  const queryClient =
    useQueryClient();

  const { data } =
    useSession();

  const logoutMutation =
    useLogout();

  const {
    isOpen,
    containerRef,
    closeMenu,
    toggleMenu,
  } = useProfileMenu();

  const user = data?.user;

  const displayName =
    user?.name?.trim() ||
    "Account";

  const displayEmail =
    user?.email ||
    "user@example.com";

  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(
        (part) =>
          part[0]?.toUpperCase(),
      )
      .join("") || "A";

  const menuItems = [
    {
      label: "My Account",
      icon: UserCircle2,
      onClick: () => {
        closeMenu();

        router.push(
          "/settings",
        );
      },
      active:
        pathname === "/settings",
    },
    {
      label: "Settings",
      icon: Settings,
      onClick: () => {
        closeMenu();

        router.push(
          "/settings",
        );
      },
      active:
        pathname === "/settings",
    },
    {
      label: "Billing",
      icon: CreditCard,
      onClick: () => {
        closeMenu();

        router.push(
          "/billing",
        );
      },
      active:
        pathname === "/billing",
    },
  ];

  async function handleLogout() {
    try {
      await logoutMutation.mutateAsync();

      await queryClient.invalidateQueries(
        {
          queryKey: [
            "session",
          ],
        },
      );
    } catch {
      // Keep UI responsive.
    } finally {
      closeMenu();

      router.push(
        "/",
      );
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={toggleMenu}
        className={cn(
          "group flex w-full items-center transition-colors cursor-pointer",
          collapsed
            ? "justify-center px-0 py-3 "
            : "gap-3 px-3 py-3 border bg-[#0b0b0b] hover:bg-[#101010]",
          isOpen ? "border-white/10 bg-[#101010]" : "border-white/5 ",
        )}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#111111] text-[11px] font-mono font-semibold uppercase tracking-widest text-[#d4d4d8]">
          {initials}
        </div>
        {!collapsed ? (
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-medium text-white">{displayName}</p>
            <p className="truncate text-[11px] text-[#7a7a7a]">{displayEmail}</p>
          </div>
        ) : null}
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={cn(
              "absolute left-0 bottom-full z-50 mb-2 w-full border border-[#1a1a1a] bg-[#0f0f0f] p-1 shadow-[0_10px_30px_rgba(0,0,0,0.22)]",
              collapsed && "left-0",
            )}
          >
            <div className="flex items-center gap-3 px-3 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#111111] text-[11px] font-mono font-semibold uppercase tracking-widest text-[#d4d4d8]">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{displayName}</p>
                <p className="truncate text-[11px] text-gray-400">{displayEmail}</p>
              </div>
            </div>

            <div className="mx-2 my-1 h-px bg-[#1a1a1a]" />

            <div className="py-1">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  role="menuitem"
                  onClick={item.onClick}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors active:opacity-80",
                    item.active
                      ? "text-white"
                      : "text-gray-300 hover:bg-[#151515] hover:text-white",
                  )}
                >
                  <item.icon className="h-4 w-4 text-[#7a7a7a]" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="mx-2 my-1 h-px bg-[#1a1a1a]" />

            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-[#151515] hover:text-white active:opacity-80"
            >
              <LogOut className="h-4 w-4 text-[#7a7a7a]" />
              <span>Logout</span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}