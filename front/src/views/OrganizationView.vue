<script setup lang="ts">
import { ref } from 'vue';
import ky from 'ky';
import { OrganizationSchema } from '@/schemas/organization.schema';

type OrganizationType = z.infer<typeof OrganizationSchema>;

import ResponseJson from '@/components/ResponseJson.vue';
import type { z } from 'zod';

type Errors = Partial<Record<keyof OrganizationType | 'ceo.name' | 'ceo.jobTitle' | 'ceo.company' | 'ceo.url', string>>;
    
const organization = ref<OrganizationType>({
    name: '',
    url: '',
    logo: '',
    phone: '',
    ceo: {
        name: '',
        jobTitle: '',
        company: '',
        url: '',
    },
});

const errors = ref<Errors>({});
const responseMessage = ref<string | null>(null);
const isError = ref<boolean>(false);

const submitForm = async () => {
    errors.value = {};
    responseMessage.value = null;
    isError.value = false;

    const result = OrganizationSchema.safeParse(organization.value);
    if (!result.success) {
        result.error.errors.forEach(err => {
            if (err.path.length) {
                const key = err.path[0] as keyof OrganizationType;
                errors.value[key] = err.message;
            }
        });
        return;
    }
    console.log("Organisation valide :", organization.value);

    try {
        const response = await ky.post('http://localhost:3000/api/organization', {
            json: { data: organization.value }
        });
        responseMessage.value = await response.text();
    } catch (error) {
        responseMessage.value = "Erreur lors de l'envoi de l'organisation.";
        isError.value = true;
    }
};
</script>

<template>
  <section class="flex">
    <form @submit.prevent="submitForm" class="px-4 gap-6 w-1/2 text-white flex flex-col justify-between">
      <div>
        <label>Nom*: <input v-model="organization.name" type="text" class="border border-purple-500 p-2 w-full" required></label>
        <p v-if="errors.name" class="text-purple-400">{{ errors.name }}</p>

        <label>URL*: <input v-model="organization.url" type="url" class="border border-purple-500 p-2 w-full" required></label>
        <p v-if="errors.url" class="text-purple-400">{{ errors.url }}</p>

        <label>Logo: <input v-model="organization.logo" type="url" class="border border-purple-500 p-2 w-full"></label>
        <p v-if="errors.logo" class="text-purple-400">{{ errors.logo }}</p>

        <label>Téléphone*: <input v-model="organization.phone" type="text" class="border border-purple-500 p-2 w-full" required></label>
        <p v-if="errors.phone" class="text-purple-400">{{ errors.phone }}</p>

        <h3 class="text-lg mt-4 text-white">Informations du CEO</h3>

        <label>Nom du CEO*: <input v-model="organization.ceo.name" type="text" class="border border-purple-500 p-2 w-full" required></label>
        <p v-if="errors['ceo.name']" class="text-purple-400">{{ errors['ceo.name'] }}</p>

        <label>URL du CEO: <input v-model="organization.ceo.url" type="url" class="border border-purple-500 p-2 w-full"></label>
        <p v-if="errors['ceo.url']" class="text-purple-400">{{ errors['ceo.url'] }}</p>
      </div>

      <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded">Soumettre</button>
    </form>

    <ResponseJson :message="responseMessage" :isError="isError" @close="responseMessage = null" />
  </section>
</template>
