import type { UseFetchOptions } from 'nuxt/app';

export const useApiFetch = <T>  (
    url: string | (() => string),
    options: UseFetchOptions<T> = {}
)=> {
    return useFetch(url, {
        ...options,
        $fetch: useNuxtApp().$apiFetch,
    });
}
