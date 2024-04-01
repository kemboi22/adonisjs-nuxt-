export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    if (authStore.accessToken != ''  && authStore.user)
    {
        return navigateTo("/")
    }
})
