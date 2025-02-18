<script setup lang="ts">
import { ref } from 'vue';
import ky from 'ky';
import { EventSchema} from '@/schemas/event.schema';
import ResponseJson from '@/components/ResponseJson.vue';
import type { z } from 'zod';

type Event = z.infer<typeof EventSchema>;
type Errors = Partial<Record<keyof Event, string>>;

const event = ref<Event>({
    name: '',
    startDate: '',
    endDate: '',
    location: '',
    address: '',
    organizer: '',
});

const errors = ref<Errors>({});
const responseMessage = ref<string | null>(null);
const isError = ref<boolean>(false);

const submitForm = async () => {
    errors.value = {};
    responseMessage.value = null;
    isError.value = false;

    const result = EventSchema.safeParse(event.value);
    if (!result.success) {
        result.error.errors.forEach(err => {
            if (err.path.length) {
                const key = err.path[0] as keyof Event;
                errors.value[key] = err.message;
            }
        });
        return;
    }
    console.log("Événement valide :", event.value);

    try {
        const response = await ky.post('http://localhost:3000/api/event', {
            json: { data: event.value }
        });
        responseMessage.value = await response.text();
    } catch (error) {
        responseMessage.value = "Erreur lors de l'envoi de l'événement.";
        isError.value = true;
    }
};
</script>

<template>
  <section class="flex">
    <form @submit.prevent="submitForm" class="px-4 gap-6 w-1/2 text-white flex flex-col justify-between">
      <div>
        <label>Nom*: <input v-model="event.name" type="text" class="border border-purple-500 p-2 w-full" required></label>
        <p v-if="errors.name" class="text-purple-400">{{ errors.name }}</p>

        <label>Date de début*: <input v-model="event.startDate" type="date" class="border border-purple-500 p-2 w-full" required></label>
        <p v-if="errors.startDate" class="text-purple-400">{{ errors.startDate }}</p>

        <label>Date de fin*: <input v-model="event.endDate" type="date" class="border border-purple-500 p-2 w-full" required></label>
        <p v-if="errors.endDate" class="text-purple-400">{{ errors.endDate }}</p>

        <label>Lieu*: <input v-model="event.location" type="text" class="border border-purple-500 p-2 w-full" required></label>
        <p v-if="errors.location" class="text-purple-400">{{ errors.location }}</p>

        <label>Adresse: <input v-model="event.address" type="text" class="border border-purple-500 p-2 w-full"></label>
        <p v-if="errors.address" class="text-purple-400">{{ errors.address }}</p>

        <label>Organisateur*: <input v-model="event.organizer" type="text" class="border border-purple-500 p-2 w-full" required></label>
        <p v-if="errors.organizer" class="text-purple-400">{{ errors.organizer }}</p>
      </div>

      <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded">Soumettre</button>
    </form>

    <ResponseJson :message="responseMessage" :isError="isError" @close="responseMessage = null" />
  </section>
</template>
