<script setup lang="ts">
import type {Client} from "~/types";
definePageMeta({
  middleware: ['auth']
})
const clients = ref<Client[]>([])
const getClients = async () => {
  const {data} = await useApiFetch('/clients')
  console.log(data.value)
  // @ts-ignore
  clients.value = data.value
}
getClients()
</script>

<template>
  <div class="container">
    <div class="p-3">
      <CreateNewClient/>
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
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>
