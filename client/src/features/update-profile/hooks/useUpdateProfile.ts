import { useMutation } from '@tanstack/react-query';

import { CurrentUserService } from '../../../entities/current-user/service/current-user.service';

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: CurrentUserService.updateMe,
  });
};
