
// src/pages/[codename]/hooks/useCodenameData.js (Refactored with JSON structure handling)
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRomsList, fetchRomBuildsForCodename } from '../api/fetchers';

export const useROMData = (codename) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const {
    data: availableROMs = [], 
    isLoading: isLoadingBuilds,
    error: errorBuilds,
    isSuccess: isSuccessBuilds,
  } = useQuery({
    queryKey: ['romBuilds', codename],
    queryFn: () => fetchRomBuildsForCodename(codename),
    enabled: !!codename,
   
    select: (fetchedData) => {
      if (fetchedData && typeof fetchedData === 'object' && fetchedData !== null && Array.isArray(fetchedData[codename])) {
        return fetchedData[codename];
      }
 
      console.warn(`Unexpected data structure for codename "${codename}". Expected format: { "${codename}": [...] }, Got:`, fetchedData);
      return [];
    },
  });

  const loading = isLoadingList || isLoadingBuilds;
  const error = errorList || errorBuilds;
  const isSuccess = isSuccessList && isSuccessBuilds;

  const device = useMemo(() => {
    if (!isSuccessList || !codename) return null;
    return romsList.find(d => d.codename === codename) || null;
  }, [romsList, codename, isSuccessList]);

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

  return {
    device,
    availableROMs, 
    loading,
    isModalOpen,
    error: error ? error.message : null,
  };
};