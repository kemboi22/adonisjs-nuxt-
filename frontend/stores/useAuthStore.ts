import type {User} from "~/types";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User>(<User>{})
    const accessToken = ref("")
    const loading = ref(false)

    const login = async (loginUser: User) => {
        loading.value = true
        const {data, status} = await useApiFetch('/login', {
            method: "POST",
            body: {
                ...loginUser
            }
        })
        // @ts-ignore
        accessToken.value = data.value.token
        // @ts-ignore
        user.value = data.value.data
        loading.value = false
    }

    return {
        login,
        loading,
        accessToken
    }
}, {
    persist: true
})
