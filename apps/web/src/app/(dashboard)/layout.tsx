"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { WebsiteProvider } from "@/providers/website-provider";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

import { useSession } from "@/hooks/auth/use-session";
import { useSidebar } from "@/hooks/ui/use-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { data, isLoading } =
    useSession();

  const {
    collapsed,
    setCollapsed,
    open,
    setOpen,
  } = useSidebar();

  useEffect(() => {
    if (
      !isLoading &&
      !data?.user
    ) {
      router.push("/login");
    }
  }, [
    data,
    isLoading,
    router,
  ]);

  if (isLoading) {
    return null;
  }

  if (!data?.user) {
    return null;
  }

  return (
    <WebsiteProvider>
      <div className="h-screen overflow-hidden bg-[#0a0a0a]">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          open={open}
          setOpen={setOpen}
        />

        <div
          className={`flex h-full flex-col transition-all duration-300 ${
            collapsed
              ? "md:ml-16"
              : "md:ml-64"
          }`}
        >
          <Header
            setOpen={setOpen}
          />

          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="mx-auto h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </WebsiteProvider>
  );
}