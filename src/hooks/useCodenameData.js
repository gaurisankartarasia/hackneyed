
// src/pages/[codename]/hooks/useCodenameData.js (Refactored)
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRomsList, fetchRomBuildsForCodename } from '../api/fetchers'; 

export const useROMData = (codename) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Query 1: Get the overall ROMs list (will use cache if available)
  const {
    data: romsList = [],
    isLoading: isLoadingList,
    error: errorList,
    isSuccess: isSuccessList,
  } = useQuery({
    queryKey: ['romsList'], // Same key as in useROMBuilds - will reuse cache!
    queryFn: fetchRomsList,
    enabled: !!codename, // Only fetch if codename is provided
  });

  // Query 2: Get the builds for the specific codename
  const {
    data: availableROMs = [],
    isLoading: isLoadingBuilds,
    error: errorBuilds,
    isSuccess: isSuccessBuilds,
  } = useQuery({
    queryKey: ['romBuilds', codename], // Dynamic key includes codename
    queryFn: () => fetchRomBuildsForCodename(codename), // Pass codename to fetcher
    enabled: !!codename, // Only fetch if codename is provided
  });

  // Combine loading and error states
  const loading = isLoadingList || isLoadingBuilds;
  const error = errorList || errorBuilds;
  const isSuccess = isSuccessList && isSuccessBuilds; // Both need to succeed

  // Derive the specific device info once the list is loaded
  const device = useMemo(() => {
    if (!isSuccessList || !codename) return null;
    return romsList.find(d => d.codename === codename) || null;
  }, [romsList, codename, isSuccessList]);

  // Determine if modal should be open after loading/success states settle
  useEffect(() => {
    // Only make decision once loading is finished and codename is present
    if (!loading && codename && isSuccess) {
      // Check conditions based on the successfully fetched data
      if (!device || availableROMs.length === 0) {
        setIsModalOpen(true);
      } else {
        setIsModalOpen(false);
      }
    } else if (!loading && codename && error) {
        // If loading finished but there was an error (e.g., 404 handled by fetcher, or other network error)
        // Decide if modal should open based on error state or data absence
        // Example: Open modal if device lookup failed or builds are empty after load attempt
         if (!device || availableROMs.length === 0) {
            setIsModalOpen(true); // Maybe open modal on error/not found cases
         } else {
            setIsModalOpen(false);
         }
    } else if (!codename || loading) {
        // Reset modal if codename removed or still loading
        setIsModalOpen(false);
    }
  }, [loading, codename, device, availableROMs, isSuccess, error]); // Dependencies for modal logic

  return {
    device, // Derived from cached romsList
    availableROMs, // From the specific builds query
    loading,
    isModalOpen,
    error: error ? error.message : null,
  };
};







