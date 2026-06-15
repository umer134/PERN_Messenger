import { useMutation, useQuery } from "@tanstack/react-query"
import { UserApi } from "../../../entities/user/api/user.api"
import { UserSearchAdapter } from "../model/userSearch.adapter";
import { UserResponse } from "../../../entities/user/model/user.model";
import { User } from "../../../entities/user/model/user.types";


export const useSearchUser = (query: string) => {
  return useQuery<User[]>({
    queryKey: ["user-search", query],
    enabled: query.trim().length >= 2,
    queryFn: async () => {
      const response = await UserApi.searchUsers(query);
      console.log(response)
      return response.data;
    }
  });
}