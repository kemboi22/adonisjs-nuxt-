<script setup lang="ts">
import type {User} from "~/types";

const authStore = useAuthStore()
const formData = ref<User>(<User>{})
</script>

<template>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-xl">
        Sign Up
      </CardTitle>
      <CardDescription>
        Enter your information to create an account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="authStore.register(formData)">
        <div class="grid gap-4">
          <div class="grid gap-2">
            <div class="space-y-2">
              <Label for="first-name">Full Name</Label>
              <Input id="first-name" placeholder="Max" required v-model="formData.fullName" />
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                v-model="formData.email"
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password" v-model="formData.password" />
          </div>
          <Button type="submit" class="w-full">
            {{ authStore.loading ? "Loading ..." : "Create an account" }}
          </Button>
        </div>
      </form>

      <div class="mt-4 text-center text-sm">
        Already have an account?
        <NuxtLink to="/auth/login" class="underline">
          Sign in
        </NuxtLink>
      </div>
    </CardContent>
  </Card>
</template>
