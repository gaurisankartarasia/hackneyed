
// src/pages/[romName]/hooks/useROMDetails.js (Refactored)
import {  useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRomsList, fetchRomBuildsForCodename } from '../api/fetchers'; // Adjust path
import { encodeROMName } from '../utils/encodeROMName'; // Keep your encoding util

export const useROMDetails = (codename, romName) => {
  // Query 1: Get the overall ROMs list (will use cache)
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

  // Query 2: Get the builds for the codename (will use cache)
  const {
    data: deviceROMs = [],
    isLoading: isLoadingBuilds,
    error: errorBuilds,
    isSuccess: isSuccessBuilds,
  } = useQuery({
    queryKey: ['romBuilds', codename], // Uses cache if same codename was fetched
    queryFn: () => fetchRomBuildsForCodename(codename),
    enabled: !!codename && !!romName, // Only run when params are ready
  });

  // Combined states
  const loading = isLoadingList || isLoadingBuilds;
  const error = errorList || errorBuilds;
  const isSuccess = isSuccessList && isSuccessBuilds;

  // Derive device info and specific ROM details using useMemo for efficiency
  const derivedData = useMemo(() => {
    if (!isSuccess || !romName || !codename) {
      return { deviceInfo: null, romDetails: null };
    }

    const deviceInfo = romsList.find(d => d.codename === codename) || null;

    const decodedRomName = decodeURIComponent(romName);
    const romDetails = deviceROMs.find(r => {
      if (r && r.name) {
        const encodedName = encodeROMName(r.name, r.version, r.project_name);
        return encodedName === decodedRomName;
      }
      return false;
    }) || null;

     // Log warnings after data processing is done
     if (!romDetails) {
       console.warn(`[useROMDetails] Could not find ROM details matching slug "${decodedRomName}" for codename ${codename}`);
     }
     if (!deviceInfo) {
       console.warn(`[useROMDetails] Could not find device info for codename ${codename}`);
     }

    return { deviceInfo, romDetails };

  }, [isSuccess, romName, codename, romsList, deviceROMs]); 

  return {
    romDetails: derivedData.romDetails,
    deviceInfo: derivedData.deviceInfo,
    loading,
    error: error ? error.message : null,
  };
};



