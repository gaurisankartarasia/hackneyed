
// // src/pages/products/hooks/useROMBuilds.js (Refactored)
// import { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { fetchRomsList } from '../api/fetchers'; // Adjust import path

// export const useROMBuilds = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredBuilds, setFilteredBuilds] = useState([]);

//   // Fetch the data using React Query. It handles caching, loading, error states.
//   const {
//     data: romBuilds = [], // Provide default value (empty array)
//     isLoading,
//     error,
//     isSuccess, // Can be useful to know when data is successfully loaded
//   } = useQuery({
//     queryKey: ['romsList'], // Unique key for this data resource
//     queryFn: fetchRomsList, // The function that fetches the data
//     // staleTime: Infinity is inherited from the provider defaults
//   });

//   // Perform filtering locally when search term or fetched data changes
//   useEffect(() => {
//     // Only filter if data is successfully loaded
//     if (isSuccess && romBuilds) {
//       const results = romBuilds.filter(build =>
//         build.device?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         build.codename?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredBuilds(results);
//     } else {
//       setFilteredBuilds([]); // Reset if not success or no data
//     }
//   }, [searchTerm, romBuilds, isSuccess]); // Dependencies

//   // Log error if it occurs
//   useEffect(() => {
//     if (error) {
//       console.error('Error fetching ROM list:', error);
//     }
//   }, [error]);

//   return {
//     filteredBuilds,
//     searchTerm,
//     setSearchTerm,
//     isLoading, // Directly from useQuery
//     error: error ? error.message : null, // Provide error message
//     // romBuilds // Optionally return the full list if needed
//   };
// };





import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRomsList } from '../api/fetchers';

export const useROMBuilds = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: romBuilds = [], isLoading, error, isSuccess } = useQuery({
    queryKey: ['romsList'],
    queryFn: fetchRomsList,
  });

  // Use useMemo to prevent unnecessary state updates
  const filteredBuilds = useMemo(() => {
    if (!isSuccess || !romBuilds) return [];
    return romBuilds.filter(build =>
      build.device?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      build.codename?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, romBuilds, isSuccess]);

  useEffect(() => {
    if (error) {
      console.error('Error fetching ROM list:', error);
    }
  }, [error]);

  return {
    filteredBuilds,
    searchTerm,
    setSearchTerm,
    isLoading,
    error: error ? error.message : null,
  };
};




