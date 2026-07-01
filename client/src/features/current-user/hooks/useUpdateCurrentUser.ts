import { useDispatch } from 'react-redux';
import { currentUserApi } from '@/entities/current-user/api';
import { hydrateCurrentUser } from '@/entities/current-user/model/currentUser.slice';
import { mapCurrentUser } from '@/entities/current-user/lib';
import { CurrentUserAdapter } from '@/entities/current-user/model';
import { UpdateProfileDto } from '@/entities/current-user/types/currentUser.types';

export const useUpdateCurrentUser = () => {
  const dispatch = useDispatch();

  const updateMe = async (dto: UpdateProfileDto) => {
    const adaptedDto = CurrentUserAdapter.toApi(dto);
    const { data } = await currentUserApi.updateMe(adaptedDto);
    dispatch(hydrateCurrentUser(mapCurrentUser(data)));
    return data;
  };

  return { updateMe };
};
