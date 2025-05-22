import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
    reducerPath: "chatApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/",
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if(token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        }
    }),
    tagTypes: ['Chat', 'Messages'],
    endpoints: (builder) => ({
        createChat: builder.mutation({
            query: ({userId, content}) => ({
                url: 'chats',
                method: 'POST',
                body: {userId, content}
            }),
            invalidatesTags: ['Chat']
        }),
        getChats: builder.query({
            query: () => 'chats',
             providesTags: (result) =>
                result
                ? result.map((chat) => ({ type: 'Chat', id: chat.id }))
                : ['Chat'],
            transformResponse: (response) => {
                const currentUserId = parseInt(localStorage.getItem('user_id'));
                return response.map(chat => {
                  const interlocutor = chat.members.find(m => m.id !== currentUserId);
                  return {
                    ...chat,
                    interlocutor,
                    lastMessage: chat.messages?.[0] || null
                  };
                });
              }
          }),
        findChat: builder.query({
            query: (toUserId) => `/chats/find/${toUserId}`,
            providesTags: ['Chat']
        }),
        sendMessage: builder.mutation({
            query: ({chatId, formData}) => ({
                url: `/chats/${chatId}/messages`,
                method: 'POST',
                body: formData
            }),
            invalidatesTags: (result, error, {chatId}) => [
                { type: 'Messages', id: chatId }, 
                'Chat'
              ]
        }),
        getMessages: builder.query({
            query: (chatId) => `/chats/${chatId}/messages`,
            providesTags: (result, error, chatId) => [
                { type: 'Messages', id: chatId } 
              ]
        }),
        readMessage: builder.mutation({
            query: (chatId) => ({
                url: `/chats/${chatId}/read`,
                method: 'POST',
            }),
           invalidatesTags: (result, error, chatId) => [
                { type: 'Chat', id: chatId },
                { type: 'Messages', id: chatId }
            ],
        })
        
    })
})

export const { useGetChatsQuery,
     useGetMessagesQuery, 
     useSendMessageMutation,
     useCreateChatMutation,
     useFindChatQuery,
    useReadMessageMutation } = chatApi;