
// // src/pages/[codename]/hooks/useCodenameData.js (Refactored)
// import { useState, useEffect, useMemo } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { fetchRomsList, fetchRomBuildsForCodename } from '../api/fetchers'; 

// export const useROMData = (codename) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Query 1: Get the overall ROMs list (will use cache if available)
//   const {
//     data: romsList = [],
//     isLoading: isLoadingList,
//     error: errorList,
//     isSuccess: isSuccessList,
//   } = useQuery({
//     queryKey: ['romsList'], // Same key as in useROMBuilds - will reuse cache!
//     queryFn: fetchRomsList,
//     enabled: !!codename, // Only fetch if codename is provided
//   });

//   // Query 2: Get the builds for the specific codename
//   const {
//     data: availableROMs = [],
//     isLoading: isLoadingBuilds,
//     error: errorBuilds,
//     isSuccess: isSuccessBuilds,
//   } = useQuery({
//     queryKey: ['romBuilds', codename], // Dynamic key includes codename
//     queryFn: () => fetchRomBuildsForCodename(codename), // Pass codename to fetcher
//     enabled: !!codename, // Only fetch if codename is provided
//   });

//   // Combine loading and error states
//   const loading = isLoadingList || isLoadingBuilds;
//   const error = errorList || errorBuilds;
//   const isSuccess = isSuccessList && isSuccessBuilds; // Both need to succeed

//   // Derive the specific device info once the list is loaded
//   const device = useMemo(() => {
//     if (!isSuccessList || !codename) return null;
//     return romsList.find(d => d.codename === codename) || null;
//   }, [romsList, codename, isSuccessList]);

//   // Determine if modal should be open after loading/success states settle
//   useEffect(() => {
//     // Only make decision once loading is finished and codename is present
//     if (!loading && codename && isSuccess) {
//       // Check conditions based on the successfully fetched data
//       if (!device || availableROMs.length === 0) {
//         setIsModalOpen(true);
//       } else {
//         setIsModalOpen(false);
//       }
//     } else if (!loading && codename && error) {
//         // If loading finished but there was an error (e.g., 404 handled by fetcher, or other network error)
//         // Decide if modal should open based on error state or data absence
//         // Example: Open modal if device lookup failed or builds are empty after load attempt
//          if (!device || availableROMs.length === 0) {
//             setIsModalOpen(true); // Maybe open modal on error/not found cases
//          } else {
//             setIsModalOpen(false);
//          }
//     } else if (!codename || loading) {
//         // Reset modal if codename removed or still loading
//         setIsModalOpen(false);
//     }
//   }, [loading, codename, device, availableROMs, isSuccess, error]); // Dependencies for modal logic

//   return {
//     device, // Derived from cached romsList
//     availableROMs, // From the specific builds query
//     loading,
//     isModalOpen,
//     error: error ? error.message : null,
//   };
// };







// src/pages/[codename]/hooks/useCodenameData.js (Refactored with JSON structure handling)
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRomsList, fetchRomBuildsForCodename } from '../api/fetchers';

export const useROMData = (codename) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Query 1: Get the overall ROMs list (remains the same)
  const {
    data: romsList = [],
    isLoading: isLoadingList,
    error: errorList,
    isSuccess: isSuccessList,
  } = useQuery({
    queryKey: ['romsList'],
    queryFn: fetchRomsList,
    enabled: !!codename,
  });

  // Query 2: Get the builds for the specific codename (Modified with select)
  const {
    data: availableROMs = [], // Default to empty array remains appropriate
    isLoading: isLoadingBuilds,
    error: errorBuilds,
    isSuccess: isSuccessBuilds,
  } = useQuery({
    queryKey: ['romBuilds', codename],
    queryFn: () => fetchRomBuildsForCodename(codename), // fetcher returns the object { codename: [...] }
    enabled: !!codename,
    // *** ADDED SELECT FUNCTION ***
    // This function receives the data fetched by queryFn
    // and transforms it before it's returned as 'data' (availableROMs)
    select: (fetchedData) => {
      // Check if fetchedData is valid, is an object, and has the 'codename' property which is an array
      if (fetchedData && typeof fetchedData === 'object' && fetchedData !== null && Array.isArray(fetchedData[codename])) {
        // If the structure matches, return the array of builds
        return fetchedData[codename];
      }
      // Otherwise, return an empty array to prevent errors downstream
      // (e.g., if the fetch failed partially or returned unexpected data)
      console.warn(`Unexpected data structure for codename "${codename}". Expected format: { "${codename}": [...] }, Got:`, fetchedData);
      return [];
    },
  });

  // Combine loading and error states (remains the same)
  const loading = isLoadingList || isLoadingBuilds;
  const error = errorList || errorBuilds;
  const isSuccess = isSuccessList && isSuccessBuilds;

  // Derive the specific device info (remains the same)
  const device = useMemo(() => {
    if (!isSuccessList || !codename) return null;
    return romsList.find(d => d.codename === codename) || null;
  }, [romsList, codename, isSuccessList]);

  // Determine if modal should be open (remains the same logic, but now uses correctly processed availableROMs)
  useEffect(() => {
    if (!loading && codename && isSuccess) {
      if (!device || availableROMs.length === 0) {
        setIsModalOpen(true);
      } else {
        setIsModalOpen(false);
      }
    } else if (!loading && codename && error) {
       if (!device || availableROMs.length === 0) {
          setIsModalOpen(true);
       } else {
          setIsModalOpen(false);
       }
    } else if (!codename || loading) {
        setIsModalOpen(false);
    }
  }, [loading, codename, device, availableROMs, isSuccess, error]);

  // Return statement (remains the same)
  return {
    device,
    availableROMs, // This now contains the correctly extracted array of builds
    loading,
    isModalOpen,
    error: error ? error.message : null,
  };
};