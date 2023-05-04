// //this file contains service definition that queries the publicly avaialble 311 rat sighting API

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// //define service using base URL and expected endpoints
// export const ratApi = createApi({
//   reducerPath: 'RAT_API',
//   baseQuery: fetchBaseQuery({
//     baseUrl: '"https://data.cityofnewyork.us/resource/3q43-55fe.json"',
//     prepareHeaders: (headers) => {
//       headers.set('X-App-Token', RAT_API_TOKEN);
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     getRatSighting: builder.query({
//       query: () =>
//         `?$select=latitude&$select=longitude`,
//     }),
//   }),
// });

// //export hooks for usage in functional components, which are auto-generated based on the defined endpoints
// export const { getRatSightingQuery } = ratApi;

// //resources:  https://redux-toolkit.js.org/tutorials/rtk-query#create-an-api-service
