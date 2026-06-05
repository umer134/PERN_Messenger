import { currentUserApi } from "../api/currentUser.api";
import { store } from "../../../app/providers/store";
import { hydrateCurrentUser } from "../model/currentUser.slice";
import { mapCurrentUser } from "../lib/currentUser.mapper";

export class CurrentUserService {
  
  static async fetchMe() {
    const { data } = await currentUserApi.getMe();

    store.dispatch(
      hydrateCurrentUser(mapCurrentUser(data))
    );
  }

  static async updateMe(dto) {
    const { data } = await currentUserApi.updateMe(dto);

    store.dispatch(
      hydrateCurrentUser(mapCurrentUser(data))
    );

    return data;
  }
}