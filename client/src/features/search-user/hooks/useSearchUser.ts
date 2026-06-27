import { useQuery } from '@tanstack/react-query';
import { UserApi } from '@/entities/user/api/user.api';
import { UserPreview } from '@/entities/user/model/user.types';

export const useSearchUser = (query: string) => {
  return useQuery<UserPreview[]>({
    queryKey: ['user-search', query],
    enabled: query.trim().length >= 2,
    queryFn: async () => {
      const response = await UserApi.searchUsers(query);
      return response.data;
    },
  });
};
