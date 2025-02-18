<script setup lang="ts">
import { ref } from 'vue';
import ky from 'ky';
import { PersonSchema } from '@/schemas/person.schema';
import ResponseJson from '@/components/ResponseJson.vue';
import type { z } from 'zod';

type Person = z.infer<typeof PersonSchema>;
type Errors = Partial<Record<keyof Person, string>>;

const person = ref<Person>({
    name: '',
    jobTitle: '',
    company: '',
    url: '',
});

const errors = ref<Errors>({});
const responseMessage = ref<string | null>(null);
const isError = ref<boolean>(false);

const submitForm = async () => {
    errors.value = {};
    responseMessage.value = null;
    isError.value = false;

    const result = PersonSchema.safeParse(person.value);
    if (!result.success) {
        result.error.errors.forEach(err => {
            if (err.path.length) {
                const key = err.path[0] as keyof Person;
                errors.value[key] = err.message;
            }
        });
        return;
    }
    console.log("Personne valide :", person.value);

    try {
        const response = await ky.post('http://localhost:3000/api/person', {
            json: { data: person.value }
        });
        responseMessage.value = await response.text();
    } catch (error) {
        responseMessage.value = "Erreur lors de l'envoi des informations.";
        isError.value = true;
    }
};
</script>

<template>
  <section class="flex">
    <form @submit.prevent="submitForm" class="px-4 gap-6 w-1/2 text-white flex flex-col justify-between">
      <div>
        <label>Nom*: <input v-model="person.name" type="text" class="border border-purple-500 p-2 w-full" required></label>
        <p v-if="errors.name" class="text-purple-400">{{ errors.name }}</p>

        <label>Poste: <input v-model="person.jobTitle" type="text" class="border border-purple-500 p-2 w-full" ></label>
        <p v-if="errors.jobTitle" class="text-purple-400">{{ errors.jobTitle }}</p>

        <label>Entreprise: <input v-model="person.company" type="text" class="border border-purple-500 p-2 w-full" ></label>
        <p v-if="errors.company" class="text-purple-400">{{ errors.company }}</p>

        <label>URL: <input v-model="person.url" type="url" class="border border-purple-500 p-2 w-full" ></label>
        <p v-if="errors.url" class="text-purple-400">{{ errors.url }}</p>
      </div>

      <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded">Soumettre</button>
    </form>

    <ResponseJson :message="responseMessage" :isError="isError" @close="responseMessage = null" />
  </section>
</template>
