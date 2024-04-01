<script setup lang="ts">
import type {User} from "~/types";

const authStore = useAuthStore()
const formData = ref<User>(<User>{})
</script>

<template>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl">
        Forgot Password
      </CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="authStore.forgotPassword(formData)">
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
          <Button type="submit" class="w-full">
            {{ authStore.loading ? 'Loading ....' : 'Send Reset Token' }}
          </Button>
        </div>
      </form>

      <div class="mt-4 text-center text-sm">
        Already have an account
        <NuxtLink to="/auth/login" class="underline">
          Sign In
        </NuxtLink>
      </div>
    </CardContent>
  </Card>
</template>
