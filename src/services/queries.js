import { useQuery, useMutation } from '@tanstack/react-query';
import { apiService } from './api';

export const queryKeys = {
  colors: ['colors'],
};

export const useColors = () => {
  return useQuery({
    queryKey: queryKeys.colors,
    queryFn: apiService.getColors,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useSubmitForm = () => {
  return useMutation({
    mutationFn: apiService.submitForm,
  });
};
