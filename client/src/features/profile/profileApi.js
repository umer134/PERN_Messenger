import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setProfile } from "./profileSlice";

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({
            baseUrl: "/api/",
            credentials: 'include',
            prepareHeaders: (headers) => {
                const token = localStorage.getItem('token');
                if(token) headers.set("Authorization", `Bearer ${token}`);
                return headers;
            }
        }),
        endpoints: (builder) => ({
            updateProfile: builder.mutation({
                query:({name}) => ({
                    url: '/user/update',
                    method: 'PUT',
                    body: {name},
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                async onQueryStarted(_, {dispatch, queryFulfilled}) {
                    try {
                        const { data } = await queryFulfilled;
                        const normalizedData = {
                            id: data.id,
                            name: data.username, // ключ name как в старом формате
                            email: data.email,
                            avatar: data.avatar_url,
                            isActivated: data.isActivated,
                            online: data.online,
                            last_seen: data.last_seen,
                        };
                        dispatch(setProfile(normalizedData))
                    } catch(e) {
                        console.log('error', e)
                    }
                }
            })
        })
});

export const { useUpdateProfileMutation } = profileApi;
