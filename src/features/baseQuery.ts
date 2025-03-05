

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from '../init';




const baseQueryAccessToken = fetchBaseQuery({
    baseUrl:baseUrl,
    prepareHeaders:(headars)=>{
        const token =localStorage.getItem('access');
        if (token){
            headars.set('Authorization', `Bearer ${token}`);
        }
        return headars;
    },
});

export default baseQueryAccessToken;