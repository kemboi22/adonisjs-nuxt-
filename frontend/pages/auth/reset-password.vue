<script setup lang="ts">
import type {User} from "~/types";

const value = ref<string[]>([])
const confirmed= ref(false)
const user = ref<User>(<User>{})
const confirmPassword = ref("")
const handleComplete = (e: string[]) => {
  const {data} = useApiFetch('/confirm-remember-token', {
    method: "POST",
    body: JSON.stringify({ rememberToken: e.join('') }),
  })
  // @ts-ignore
  if (data.value?.status)
  {
    confirmed.value = true
  }
}

const submit = async () => {
  if (user.value.password !== confirmPassword.value)
  {
    alert("Passwords do not match")
    return
  }
  const {data} = await useApiFetch('/reset-password', {
    method: "POST",
    body: JSON.stringify({ password: user.value.password, rememberToken: value.value.join('') }),
  })
  if (data.value)
  {
    await navigateTo('/auth/login')
  }

}
</script>

<template>
  <div>
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          Reset Password
        </CardTitle>
        <CardDescription>
          Enter OTP Sent to you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="!confirmed">
          <PinInput
              id="pin-input"
              v-model="value"
              placeholder="○"
              @complete="handleComplete"
          >
            <PinInputGroup>
              <PinInputInput
                  v-for="(id, index) in 6"
                  :key="id"
                  :index="index"
              />
            </PinInputGroup>
          </PinInput>
        </div>
        <div v-if="confirmed">
          <div>
            <Label>Password</Label>
            <Input type="password" v-model="user.password"/>
          </div>
          <div>
            <Label>Confirm Password</Label>
            <Input type="password" v-model="confirmPassword"/>
          </div>
          <div>
            <Button @click.prevent="submit">
              Submit
            </Button>
          </div>

        </div>

      </CardContent>
    </Card>

  </div>
</template>

<style scoped>

</style>
