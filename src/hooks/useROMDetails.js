
// // src/pages/[romName]/hooks/useROMDetails.js (Refactored)
// import {  useMemo } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { fetchRomsList, fetchRomBuildsForCodename } from '../api/fetchers'; // Adjust path
// import { encodeROMName } from '../utils/encodeROMName'; // Keep your encoding util

// export const useROMDetails = (codename, romName) => {
//   // Query 1: Get the overall ROMs list (will use cache)
//   const {
//     data: romsList = [],
//     isLoading: isLoadingList,
//     error: errorList,
//     isSuccess: isSuccessList,
//   } = useQuery({
//     queryKey: ['romsList'], // Uses cache
//     queryFn: fetchRomsList,
//     enabled: !!codename && !!romName, // Only run when params are ready
//   });

//   // Query 2: Get the builds for the codename (will use cache)
//   const {
//     data: deviceROMs = [],
//     isLoading: isLoadingBuilds,
//     error: errorBuilds,
//     isSuccess: isSuccessBuilds,
//   } = useQuery({
//     queryKey: ['romBuilds', codename], // Uses cache if same codename was fetched
//     queryFn: () => fetchRomBuildsForCodename(codename),
//     enabled: !!codename && !!romName, // Only run when params are ready
//   });

//   // Combined states
//   const loading = isLoadingList || isLoadingBuilds;
//   const error = errorList || errorBuilds;
//   const isSuccess = isSuccessList && isSuccessBuilds;

//   // Derive device info and specific ROM details using useMemo for efficiency
//   const derivedData = useMemo(() => {
//     if (!isSuccess || !romName || !codename) {
//       return { deviceInfo: null, romDetails: null };
//     }

//     const deviceInfo = romsList.find(d => d.codename === codename) || null;

//     const decodedRomName = decodeURIComponent(romName);
//     const romDetails = deviceROMs.find(r => {
//       if (r && r.name) {
//         const encodedName = encodeROMName(r.name, r.version, r.project_name);
//         return encodedName === decodedRomName;
//       }
//       return false;
//     }) || null;

//      // Log warnings after data processing is done
//      if (!romDetails) {
//        console.warn(`[useROMDetails] Could not find ROM details matching slug "${decodedRomName}" for codename ${codename}`);
//      }
//      if (!deviceInfo) {
//        console.warn(`[useROMDetails] Could not find device info for codename ${codename}`);
//      }

//     return { deviceInfo, romDetails };

//   }, [isSuccess, romName, codename, romsList, deviceROMs]); 

//   return {
//     romDetails: derivedData.romDetails,
//     deviceInfo: derivedData.deviceInfo,
//     loading,
//     error: error ? error.message : null,
//   };
// };


// src/pages/[romName]/hooks/useROMDetails.js (Refactored with JSON structure handling)
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRomsList, fetchRomBuildsForCodename } from '../api/fetchers'; // Adjust path
import { encodeROMName } from '../utils/encodeROMName'; // Keep your encoding util

export const useROMDetails = (codename, romName) => {
  // Query 1: Get the overall ROMs list (remains the same)
  const {
    data: romsList = [],
    isLoading: isLoadingList,
    error: errorList,
    isSuccess: isSuccessList,
  } = useQuery({
    queryKey: ['romsList'], // Uses cache
    queryFn: fetchRomsList,
    enabled: !!codename && !!romName, // Only run when params are ready
  });

  // Query 2: Get the builds for the codename (Modified with select)
  const {
    data: deviceROMs = [], // Default to empty array is fine
    isLoading: isLoadingBuilds,
    error: errorBuilds,
    isSuccess: isSuccessBuilds,
  } = useQuery({
    queryKey: ['romBuilds', codename], // Uses cache if same codename was fetched
    queryFn: () => fetchRomBuildsForCodename(codename), // fetcher returns { codename: [...] }
    enabled: !!codename && !!romName, // Only run when params are ready
    // *** ADDED SELECT FUNCTION ***
    // Extracts the array from the fetched object { codename: [...] }
    select: (fetchedData) => {
      // Check if fetchedData is valid, is an object, and has the 'codename' property which is an array
      if (fetchedData && typeof fetchedData === 'object' && fetchedData !== null && Array.isArray(fetchedData[codename])) {
        // Return the array of builds
        return fetchedData[codename];
      }
      // Otherwise, return an empty array and log a warning
      console.warn(`[useROMDetails] Unexpected data structure for codename "${codename}". Expected format: { "${codename}": [...] }, Got:`, fetchedData);
      return [];
    },
  });

  // Combined states (remains the same)
  const loading = isLoadingList || isLoadingBuilds;
  const error = errorList || errorBuilds;
  const isSuccess = isSuccessList && isSuccessBuilds;

  // Derive device info and specific ROM details using useMemo (this logic now works correctly)
  const derivedData = useMemo(() => {
    // Check if both queries succeeded and params are present
    if (!isSuccess || !romName || !codename) {
      return { deviceInfo: null, romDetails: null };
    }

    // Find device info from the general list
    const deviceInfo = romsList.find(d => d.codename === codename) || null;

    // Decode the romName from the URL/params
    const decodedRomName = decodeURIComponent(romName);

    // Find the specific ROM details within the extracted array (deviceROMs)
    // This .find() now operates on the correct array data thanks to the 'select' function
    const romDetails = deviceROMs.find(r => {
      if (r && r.name) {
        // Assuming encodeROMName correctly generates the identifier used in romName
        const encodedName = encodeROMName(r.name, r.version, r.project_name);
        return encodedName === decodedRomName;
      }
      return false;
    }) || null; // Default to null if not found

     // Log warnings if data wasn't found after processing
     if (isSuccess && !romDetails) { // Only log if queries succeeded but find failed
       console.warn(`[useROMDetails] Could not find ROM details matching slug "${decodedRomName}" for codename ${codename} within available builds:`, deviceROMs);
     }
     if (isSuccessList && !deviceInfo) { // Only log if list query succeeded but find failed
       console.warn(`[useROMDetails] Could not find device info for codename ${codename} in romsList:`, romsList);
     }

    return { deviceInfo, romDetails };

  }, [isSuccess, isSuccessList, romName, codename, romsList, deviceROMs]); // Added isSuccessList dependency for deviceInfo warning logic

  // Return statement (remains the same)
  return {
    romDetails: derivedData.romDetails,
    deviceInfo: derivedData.deviceInfo,
    loading,
    error: error ? error.message : null,
  };
};
