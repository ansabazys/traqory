import { WebsiteProvider } from "@/providers/website-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WebsiteProvider>
      {children}
    </WebsiteProvider>
  );
}