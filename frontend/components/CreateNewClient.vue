<script setup lang="ts">
import type {Client} from "~/types";

const formData = ref<Client>(<Client>{})
const loading = ref(false)
const isOpen = ref(false)
const submit = async () => {
  loading.value = true
  const {data} = await useApiFetch('/clients', {
    method: "POST",
    body: {
      ...formData.value
    }
  })
  loading.value = false
  isOpen.value = false
}
</script>

<template>
  <Dialog :open="isOpen">
    <DialogTrigger as-child>
      <Button @click.prevent="() => isOpen = true">
        Add
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New User</DialogTitle>
      </DialogHeader>
      <form @submit.prevent="submit">
        <div class="grid grid-cols-2 gap-4 py-4">
          <div>
            <Label>First Name</Label>
            <Input type="text" v-model="formData.firstName"/>
          </div>
          <div>
            <Label>Last Name</Label>
            <Input type="text" v-model="formData.lastName"/>
          </div>
          <div>
            <Label>Age</Label>
            <Input type="number" v-model="formData.age"/>
          </div>
          <div>
            <Label>Town</Label>
            <Input type="text" v-model="formData.town"/>
          </div>
          <div>
            <Label>Gender</Label>
            <Select v-model="formData.gender">
              <SelectTrigger>
                <SelectValue placeholder="Select a Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem value="male">
                    Male
                  </SelectItem>
                  <SelectItem value="female">
                    Female
                  </SelectItem>
                  <SelectItem value="others">
                    Others
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

        </div>
        <DialogFooter>
          <Button variant="destructive" @click.prevent="() => isOpen = false">
            Close
          </Button>
          <Button type="submit">
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<style scoped>

</style>
