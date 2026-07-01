import { useDispatch } from 'react-redux';
import { currentUserApi } from '@/entities/current-user/api';
import { hydrateCurrentUser } from '@/entities/current-user/model/currentUser.slice';
import { mapCurrentUser } from '@/entities/current-user/lib';

export const useFetchCurrentUser = () => {
  const dispatch = useDispatch();

  const fetchMe = async () => {
    try {
      const { data } = await currentUserApi.getMe();
      dispatch(hydrateCurrentUser(mapCurrentUser(data)));
    } catch (error) {
      console.error(error);
    }
  };

  return { fetchMe };
};
