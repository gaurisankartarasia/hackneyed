

// import { useState, useMemo, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { fetchRomsList } from '../api/fetchers';

// export const useROMBuilds = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const { data: romBuilds = [], isLoading, error, isSuccess } = useQuery({
//     queryKey: ['romsList'],
//     queryFn: fetchRomsList,
//   });

//   const filteredBuilds = useMemo(() => {
//     if (!isSuccess || !romBuilds) return [];
//     return romBuilds.filter(build =>
//       build.device?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       build.codename?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm, romBuilds, isSuccess]);

//   useEffect(() => {
//     if (error) {
//       console.error('Error fetching ROM list:', error);
//     }
//   }, [error]);

//   return {
//     filteredBuilds,
//     searchTerm,
//     setSearchTerm,
//     isLoading,
//     error: error ? error.message : null,
//   };
// };




import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRomsList } from '../api/fetchers';

export const useROMBuilds = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cachedData, setCachedData] = useState(() => {
    const storedData = localStorage.getItem('cachedRomsList');
    return storedData ? JSON.parse(storedData) : [];
  });

  const { data: romBuilds = [], isLoading, error, isSuccess } = useQuery({
    queryKey: ['romsList'],
    queryFn: fetchRomsList,
    staleTime: Infinity, 
    cacheTime: Infinity, 
    refetchOnWindowFocus: false, 
  });

  useEffect(() => {
    if (isSuccess && romBuilds.length > 0) {
      localStorage.setItem('cachedRomsList', JSON.stringify(romBuilds));
      setCachedData(romBuilds);
    }
  }, [romBuilds, isSuccess]);

  // Use cached data if API data is not available
  const finalBuilds = isSuccess ? romBuilds : cachedData;

  const filteredBuilds = useMemo(() => {
    if (!finalBuilds) return [];
    return finalBuilds.filter(build =>
      build.device?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      build.codename?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, finalBuilds]);

  return {
    filteredBuilds,
    searchTerm,
    setSearchTerm,
    isLoading: isLoading && cachedData.length === 0, 
    error: error ? error.message : null,
  };
};
