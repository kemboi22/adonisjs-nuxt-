<script setup lang="ts">
import type {Client} from "~/types";
import type {UnwrapRef} from "vue";
definePageMeta({
  middleware: ['auth']
})
const clients = ref<Client[]>([])
const authStore = useAuthStore()
const editModalOpen = ref(false)
const selectedClient = ref<Client>(<Client>{})
const getClients = async () => {
  const {data} = await useApiFetch('/clients')
  // @ts-ignore
  clients.value = data.value
}
getClients()
const openModal = (client: Client) => {
  editModalOpen.value = true
  selectedClient.value = client
  console.log(editModalOpen.value)
}

const deleteClient = async (id: number | undefined) => {
  await useApiFetch('/clients/'+id, {
    method: "DELETE"
  })
  await getClients()
}
</script>

<template>
  <div class="container">
    <div class="p-3 flex justify-between">
      <CreateNewClient/>
      <Button variant="destructive" @click.prevent="authStore.logout()">
        Logout
      </Button>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>All Users</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-[100px]">
                Id
              </TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Town</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="client in clients" :key="client.id">
              <TableCell class="font-medium">
                {{ client.id }}
              </TableCell>
              <TableCell>{{ client.firstName }}</TableCell>
              <TableCell>{{ client.lastName }}</TableCell>
              <TableCell>{{ client.age }}</TableCell>
              <TableCell>{{ client.town }}</TableCell>
              <TableCell>{{ client.gender }}</TableCell>
              <TableCell>
                <div class="flex justify-between">
                  <Button @click.prevent="openModal(client)">Edit</Button>
                  <Button @click.prevent="deleteClient(client?.id)" variant="destructive">Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
  <EditClientComponent :is-open="editModalOpen" :client="selectedClient" @close="() => editModalOpen = false"/>
</template>
