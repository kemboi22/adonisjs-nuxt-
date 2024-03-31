<script setup lang="ts">
import type {User} from "~/types";

const authStore = useAuthStore()
const formData = ref<User>(<User>{})
</script>

<template>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl">
        Login
      </CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="authStore.login(formData)">
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                v-model="formData.email"
                required
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a href="#" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required v-model="formData.password"/>
          </div>
          <Button type="submit" class="w-full">
            {{ authStore.loading ? 'Loading ....' : 'Login' }}
          </Button>
        </div>
      </form>

      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <NuxtLink to="/auth/register" class="underline">
          Sign up
        </NuxtLink>
      </div>
    </CardContent>
  </Card>
</template>
