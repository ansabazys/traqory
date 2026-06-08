import { useWebsiteContext } from "@/contexts/website-context";

export function useSelectedWebsite() {
  return useWebsiteContext();
}