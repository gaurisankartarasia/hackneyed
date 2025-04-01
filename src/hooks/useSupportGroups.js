
import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGroupsConfig } from '../api/fetchers';

const STORAGE_KEY = 'supportGroupsData';
const QUERY_KEY = 'supportGroups';

export const useSupportGroups = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: fetchedSupportGroups,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const storedData = sessionStorage.getItem(STORAGE_KEY);

      if (storedData) {
        console.log('[useSupportGroups] Data found in session storage.');
        try {
          return JSON.parse(storedData);
        } catch (parseError) {
          console.error('Error parsing stored support groups:', parseError);
          sessionStorage.removeItem(STORAGE_KEY);
        }
      }

      console.log('[useSupportGroups] Fetching support groups from API.');
      const data = await fetchGroupsConfig();

      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        console.log('[useSupportGroups] Support groups saved to session storage.');
      } catch (saveError) {
        console.error('Error saving support groups to sessionStorage:', saveError);
      }

      return data;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const filteredGroups = useMemo(() => {
    if (!fetchedSupportGroups) return [];
    return fetchedSupportGroups.filter(group =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, fetchedSupportGroups]);

  useEffect(() => {
    if (error) {
      console.error('Error fetching support groups:', error);
    }
  }, [error]);

  return {
    filteredGroups,
    searchTerm,
    setSearchTerm,
    isLoading,
    error: error ? error.message : null,
  };
};