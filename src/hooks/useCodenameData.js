
// // src/pages/[codename]/hooks/useCodenameData.js (Refactored with JSON structure handling)
// import { useState, useEffect, useMemo } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { fetchRomsList, fetchRomBuildsForCodename } from '../api/fetchers';

// export const useROMData = (codename) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const {
//     data: romsList = [],
//     isLoading: isLoadingList,
//     error: errorList,
//     isSuccess: isSuccessList,
//   } = useQuery({
//     queryKey: ['romsList'],
//     queryFn: fetchRomsList,
//     enabled: !!codename,
//   });

//   const {
//     data: availableROMs = [], 
//     isLoading: isLoadingBuilds,
//     error: errorBuilds,
//     isSuccess: isSuccessBuilds,
//   } = useQuery({
//     queryKey: ['romBuilds', codename],
//     queryFn: () => fetchRomBuildsForCodename(codename),
//     enabled: !!codename,
   
//     select: (fetchedData) => {
//       if (fetchedData && typeof fetchedData === 'object' && fetchedData !== null && Array.isArray(fetchedData[codename])) {
//         return fetchedData[codename];
//       }
 
//       console.warn(`Unexpected data structure for codename "${codename}". Expected format: { "${codename}": [...] }, Got:`, fetchedData);
//       return [];
//     },
//   });

//   const loading = isLoadingList || isLoadingBuilds;
//   const error = errorList || errorBuilds;
//   const isSuccess = isSuccessList && isSuccessBuilds;

//   const device = useMemo(() => {
//     if (!isSuccessList || !codename) return null;
//     return romsList.find(d => d.codename === codename) || null;
//   }, [romsList, codename, isSuccessList]);

//   useEffect(() => {
//     if (!loading && codename && isSuccess) {
//       if (!device || availableROMs.length === 0) {
//         setIsModalOpen(true);
//       } else {
//         setIsModalOpen(false);
//       }
//     } else if (!loading && codename && error) {
//        if (!device || availableROMs.length === 0) {
//           setIsModalOpen(true);
//        } else {
//           setIsModalOpen(false);
//        }
//     } else if (!codename || loading) {
//         setIsModalOpen(false);
//     }
//   }, [loading, codename, device, availableROMs, isSuccess, error]);

//   return {
//     device,
//     availableROMs, 
//     loading,
//     isModalOpen,
//     error: error ? error.message : null,
//   };
// };







import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRomsList, fetchRomBuildsForCodename } from '../api/fetchers';

export const useROMData = (codename) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cachedList, setCachedList] = useState(() => {
    const storedData = localStorage.getItem('cachedRomsList');
    return storedData ? JSON.parse(storedData) : [];
  });
  const [cachedROMs, setCachedROMs] = useState(() => {
    const storedData = localStorage.getItem(`cachedRomBuilds-${codename}`);
    return storedData ? JSON.parse(storedData) : [];
  });

  const { data: romsList = [], isLoading: isLoadingList, error: errorList, isSuccess: isSuccessList } = useQuery({
    queryKey: ['romsList'],
    queryFn: fetchRomsList,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!codename,
  });

  const { data: availableROMs = [], isLoading: isLoadingBuilds, error: errorBuilds, isSuccess: isSuccessBuilds } = useQuery({
    queryKey: ['romBuilds', codename],
    queryFn: () => fetchRomBuildsForCodename(codename),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!codename,
    select: (fetchedData) => {
      if (fetchedData && typeof fetchedData === 'object' && fetchedData !== null && Array.isArray(fetchedData[codename])) {
        return fetchedData[codename];
      }
      console.warn(`Unexpected data structure for codename "${codename}".`, fetchedData);
      return [];
    },
  });

  // Cache fetched data
  useEffect(() => {
    if (isSuccessList && romsList.length > 0) {
      localStorage.setItem('cachedRomsList', JSON.stringify(romsList));
      setCachedList(romsList);
    }
  }, [romsList, isSuccessList]);

  useEffect(() => {
    if (isSuccessBuilds && availableROMs.length > 0) {
      localStorage.setItem(`cachedRomBuilds-${codename}`, JSON.stringify(availableROMs));
      setCachedROMs(availableROMs);
    }
  }, [availableROMs, isSuccessBuilds, codename]);

  const finalList = isSuccessList ? romsList : cachedList;
  const finalROMs = isSuccessBuilds ? availableROMs : cachedROMs;

  const device = useMemo(() => {
    if (!finalList || !codename) return null;
    return finalList.find(d => d.codename === codename) || null;
  }, [finalList, codename]);

  const loading = isLoadingList || isLoadingBuilds;
  const error = errorList || errorBuilds;

  useEffect(() => {
    if (!loading && codename) {
      setIsModalOpen(!device || finalROMs.length === 0);
    }
  }, [loading, codename, device, finalROMs]);

  return {
    device,
    availableROMs: finalROMs,
    loading: loading && cachedROMs.length === 0,
    isModalOpen,
    error: error ? error.message : null,
  };
};
