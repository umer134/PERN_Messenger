import { currentUserApi } from "../api/currentUser.api";
import { store } from "../../../app/providers/store";
import { hydrateCurrentUser } from "../model/currentUser.slice";
import { mapCurrentUser } from "../lib/currentUser.mapper";
import { CurrentUserAdapter } from "../model/current-user.adapter";
import { UpdateProfileDto } from "../types/currentUser.types";

export class CurrentUserService {
  
  static async fetchMe() {
    const { data } = await currentUserApi.getMe();

    store.dispatch(
      hydrateCurrentUser(mapCurrentUser(data))
    );
  }

  static async updateMe(dto: UpdateProfileDto) {

    const adaptedDto = CurrentUserAdapter.toApi(dto);
    const { data } = await currentUserApi.updateMe(adaptedDto);

    store.dispatch(
      hydrateCurrentUser(mapCurrentUser(data))
    );

    return data;
  }
}