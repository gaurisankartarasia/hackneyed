
// src/pages/[romName]/hooks/useROMDetails.js 
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRomsList, fetchRomBuildsForCodename } from '../api/fetchers'; 
import { encodeROMName } from '../utils/encodeROMName'; 

export const useROMDetails = (codename, romName) => {
  const {
    data: romsList = [],
    isLoading: isLoadingList,
    error: errorList,
    isSuccess: isSuccessList,
  } = useQuery({
    queryKey: ['romsList'], 
    queryFn: fetchRomsList,
    enabled: !!codename && !!romName, 
  });

  const {
    data: deviceROMs = [], 
    isLoading: isLoadingBuilds,
    error: errorBuilds,
    isSuccess: isSuccessBuilds,
  } = useQuery({
    queryKey: ['romBuilds', codename], 
    queryFn: () => fetchRomBuildsForCodename(codename), 
    enabled: !!codename && !!romName, 

    select: (fetchedData) => {
      if (fetchedData && typeof fetchedData === 'object' && fetchedData !== null && Array.isArray(fetchedData[codename])) {
        return fetchedData[codename];
      }
      console.warn(`[useROMDetails] Unexpected data structure for codename "${codename}". Expected format: { "${codename}": [...] }, Got:`, fetchedData);
      return [];
    },
  });

  const loading = isLoadingList || isLoadingBuilds;
  const error = errorList || errorBuilds;
  const isSuccess = isSuccessList && isSuccessBuilds;

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

     if (isSuccess && !romDetails) { 
       console.warn(`[useROMDetails] Could not find ROM details matching slug "${decodedRomName}" for codename ${codename} within available builds:`, deviceROMs);
     }
     if (isSuccessList && !deviceInfo) { 
       console.warn(`[useROMDetails] Could not find device info for codename ${codename} in romsList:`, romsList);
     }

    return { deviceInfo, romDetails };

  }, [isSuccess, isSuccessList, romName, codename, romsList, deviceROMs]); 

  return {
    romDetails: derivedData.romDetails,
    deviceInfo: derivedData.deviceInfo,
    loading,
    error: error ? error.message : null,
  };
};
