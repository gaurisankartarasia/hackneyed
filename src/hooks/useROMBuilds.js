

import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRomsList } from '../api/fetchers';

export const useROMBuilds = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: romBuilds = [], isLoading, error, isSuccess } = useQuery({
    queryKey: ['romsList'],
    queryFn: fetchRomsList,
  });

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




