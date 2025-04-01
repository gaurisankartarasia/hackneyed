import { useQuery } from '@tanstack/react-query';
import { fetchMeConfig } from '../api/fetchers';

const SESSION_STORAGE_KEY = 'meConfigData';
const QUERY_KEY = 'meConfig';

export const useMeConfig = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => {
      const storedData = sessionStorage.getItem(SESSION_STORAGE_KEY);

      if (storedData) {
        console.log('[RQ Hook] Data found in session storage.');
        return JSON.parse(storedData);
      }

      console.log('[RQ Hook] Fetching data from API.');
      const data = await fetchMeConfig();

      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data));
        console.log('[RQ Hook] Data saved to session storage.');
      } catch (error) {
        console.error('[RQ Hook] Error saving to session storage:', error);
      }

      return data;
    },
    staleTime: Infinity, 
    cacheTime: Infinity, 
  });
};
