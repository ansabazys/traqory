import { useWebsiteContext } from '@/contexts/website-context';

export function useWebsiteState() {
  const { websites, isLoading, selectedWebsite } = useWebsiteContext();

  const hasWebsites = websites.length > 0;

  const hasSelection = selectedWebsite !== null;

  return {
    isLoading,
    hasWebsites,
    hasSelection,
    selectedWebsite,
  };
}
