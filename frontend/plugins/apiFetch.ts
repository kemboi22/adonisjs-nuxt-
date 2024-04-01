export default defineNuxtPlugin(() => {
    const authStore = useAuthStore()
    const accessToken = ref(authStore.accessToken)
    const config = useRuntimeConfig()
    const $apiFetch = $fetch.create({
        baseURL: config.public.apiBaseUrl,
        onRequest({ request, options, error }) {
            if (accessToken.value) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${accessToken.value}`
                }
            }
        },
        onResponse ({ response }) {
            // response._data = new myBusinessResponse(response._data)
        },
        onResponseError({ response, options, error }) {
            if (response.status === 401) {
                navigateTo('/auth/login')
                return;
            }
        }
    })
    return {
        provide: {
            apiFetch: $apiFetch
        }
    }
})
