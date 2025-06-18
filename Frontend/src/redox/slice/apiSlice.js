import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { updateAccessToken, logout } from '../../redox/actions/loginActionCreator'; // Adjust path as needed

// Base query with token injection
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.coursepass.me/api/v1/',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().login.token.access;
    console.log("this",accessToken);
    

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshToken = api.getState().login.token.refresh;

    if (!refreshToken) {
      console.log('No refresh token available');
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: 'auth/refresh',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: { refresh: refreshToken },
      },
      api,
      extraOptions
    );

    console.log('Refresh request details:', {
      url: 'auth/refresh',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: { refresh: refreshToken },
    });

    console.log('this is refresh: ', refreshResult);

    if (refreshResult?.data?.access) {
      const access = refreshResult.data.access;

      api.dispatch(updateAccessToken(access));

      // Update access token in localStorage
      const updateAccess = (access) => {
        try {
          const tokenString = localStorage.getItem('token');
          if (tokenString !== null) {
            const token = JSON.parse(tokenString);
            token.access = access;
            localStorage.setItem('token', JSON.stringify(token));
            console.log('Access token updated in localStorage');
          }
        } catch (error) {
          console.error('Error updating access token:', error);
        }
      };
      updateAccess(access);

      // Retry the original request with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log('Token refresh expired');
      api.dispatch(logout());
    }
  }

  return result;
};

// Create the API instance
export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => '/users',
    }),
    getUserId: builder.query({
      query: (id) => `user/${id}`,
    }),
    getUserEnroll: builder.query({
      query: (id) => `enrollment/user/${id}`,
    }),
    enrollUser: builder.mutation({
      query: ({ userID, courseID }) => ({
        url: '/enrollment',
        method: 'POST',
        body: { userID, courseID },
      }),
    }),
    deEnrollUser: builder.mutation({
      query: ({ enrollID }) => ({
        url: `/enrollment/${enrollID}`,
        method: 'DELETE',
      }),
    }),
    getCourse: builder.query({
      query: (id) => `/course/${id}/outlines`,
    }),
    getAllCourse: builder.query({
      query: () => '/courses',
    }),
    getNote: builder.query({
      query: (id) => `/outline/${id}/notes`,
    }),
    getNoteSession: builder.query({
      query: ({ outline, selectedValue }) => `/note/${outline}/${selectedValue}`,
    }),
    // Flashcards
    getFlashcard: builder.query({
      query: (id) => `/flashcards/${id}`,
    }),
    getFlashcardOutline: builder.query({
      query: (id) => `/flashcard/${id}/outline`,
    }),
    createFlashCard: builder.mutation({
      query: ({ outlineID, courseID, question, answer, userID }) => ({
        url: '/flashcard',
        method: 'POST',
        body: { outlineID, courseID, question, answer, userID },
      }),
    }),
    delFlashcard: builder.mutation({
      query: ({ flashcardID }) => ({
        url: `/flashcard/${flashcardID}`,
        method: 'DELETE',
      }),
    }),
    // Assignment
    getAssignmentAlloc: builder.query({
      query: (id) => `/allocation/${id}/user`,
    }),
    createAssignment: builder.mutation({
      query: ({ courseID, title, due_date, detail }) => ({
        url: '/assignment',
        method: 'POST',
        body: { courseID, title, due_date, detail },
      }),
    }),
    getAssignment: builder.query({
      query: (courseID) => `/assignment/${courseID}`,
    }),
    allocate: builder.mutation({
      query: ({ userID, courseID, assignmentID }) => ({
        url: '/allocation',
        method: 'POST',
        body: { userID, courseID, assignmentID },
      }),
    }),
    // Quizzes
    getQuizeMetaData: builder.query({
      query: () => `/quiz/filter/`,
    }),
    getQuizeFilter: builder.query({
      query: ({ course, uni, year }) => `course/${course}/quizes/${year}/${uni}`,
    }),
    score: builder.mutation({
      query: ({ userID, courseID, score }) => ({
        url: '/score',
        method: 'POST',
        body: { userID, courseID, score },
      }),
    }),
    // Score
    getScoreAVG: builder.query({
      query: (userID) => `score/${userID}`,
    }),
    getCourseScoreAVG: builder.query({
      query: ({ userID, courseID }) => `score/${userID}/${courseID}`,
    }),
    getPoint: builder.query({
      query: (userID) => `streak/${userID}`,
    }),
    point: builder.mutation({
      query: ({ userID, note_id }) => ({
        url: '/point',
        method: 'POST',
        body: { userID, note_id },
      }),
    }),
    // Rank
    getRank: builder.query({
      query: (userID) => `rank/${userID}`,
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetUserQuery,
  useGetUserIdQuery,
  useGetUserEnrollQuery,
  useGetCourseQuery,
  useGetAllCourseQuery,
  useEnrollUserMutation,
  useDeEnrollUserMutation,
  useGetNoteQuery,
  useGetNoteSessionQuery,
  useGetFlashcardQuery,
  useGetFlashcardOutlineQuery,
  useCreateFlashCardMutation,
  useGetAssignmentAllocQuery,
  useCreateAssignmentMutation,
  useLazyGetAssignmentQuery,
  useAllocateMutation,
  useGetQuizeMetaDataQuery,
  useGetQuizeFilterQuery,
  useScoreMutation,
  useGetScoreAVGQuery,
  useGetCourseScoreAVGQuery,
  useGetPointQuery,
  usePointMutation,
  useGetRankQuery,
  useDelFlashcardMutation,
} = api;