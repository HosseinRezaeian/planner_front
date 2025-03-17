import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import baseUrl from '../init';

// تعریف یک Type برای پاسخ توکن جدید
interface RefreshTokenResponse {
  access: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl, // آدرس API خود را اینجا جایگذاری کنید
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('access');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log('🔄 Token expired, trying to refresh...');

    // ارسال درخواست برای دریافت توکن جدید
    const refreshResult = await baseQuery(
      {
        url: '/api/account/token/refresh/',
        method: 'POST',
        body: { refresh: localStorage.getItem('refresh') },
      },
      api,
      extraOptions
    );

    // ✅ بررسی اینکه پاسخ حاوی `access` است
    if ((refreshResult.data as RefreshTokenResponse)?.access) {
      const newAccessToken = (refreshResult.data as RefreshTokenResponse).access;
      localStorage.setItem('access', newAccessToken);

      // دوباره درخواست اصلی را ارسال کن
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error('❌ Refresh token failed');
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    }
  }

  return result;
};

export default baseQueryWithReAuth;
