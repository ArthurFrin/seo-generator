<script setup lang="ts">
import { ref } from 'vue';
import ky from 'ky';
import { OffersSchema } from '@/schemas/offers.schema';
import ResponseJson from '@/components/ResponseJson.vue';
import type { z } from 'zod';

type Offers = z.infer<typeof OffersSchema>;
type Errors = Partial<Record<keyof Offers, string>>;

const offer = ref<Offers>({
    currency: 'EUR',
    price: '',
    availability: 'https://schema.org/InStock',
    url: '',
});

const errors = ref<Errors>({});
const responseMessage = ref<string | null>(null);
const isError = ref<boolean>(false);

const submitForm = async () => {
    errors.value = {};
    responseMessage.value = null;
    isError.value = false;

    const result = OffersSchema.safeParse(offer.value);
    if (!result.success) {
        result.error.errors.forEach(err => {
            if (err.path.length) {
                const key = err.path[0] as keyof Offers;
                errors.value[key] = err.message;
            }
        });
        return;
    }
    console.log("Offre valide :", offer.value);

    try {
        const response = await ky.post('http://localhost:3000/api/offer', {
            json: { data: offer.value }
        });
        responseMessage.value = await response.text();
    } catch (error) {
        responseMessage.value = "Erreur lors de l'envoi de l'offre.";
        isError.value = true;
    }
};
</script>

<template>
  <section class="flex">
    <form @submit.prevent="submitForm" class="px-4 gap-6 w-1/2 text-white flex flex-col justify-between">
      <div>
        <label>Prix: <input v-model="offer.price" type="text" class="border border-purple-500 p-2 w-full" required></label>
        <p v-if="errors.price" class="text-purple-400">{{ errors.price }}</p>
        
        <label>Devise: 
          <select v-model="offer.currency" class="border border-purple-500 p-2 w-full">
            <option value="EUR">Euro (€)</option>
            <option value="USD">Dollar ($)</option>
            <option value="GBP">Livre (£)</option>
          </select>
        </label>
        <p v-if="errors.currency" class="text-purple-400">{{ errors.currency }}</p>
        
        <label>Disponibilité: 
          <select v-model="offer.availability" class="border border-purple-500 p-2 w-full">
            <option value="https://schema.org/InStock">En stock</option>
            <option value="https://schema.org/OutOfStock">Rupture de stock</option>
            <option value="https://schema.org/PreOrder">Précommande</option>
          </select>
        </label>
        <p v-if="errors.availability" class="text-purple-400">{{ errors.availability }}</p>

        <label>URL: <input v-model="offer.url" type="url" class="border border-purple-500 p-2 w-full" required></label>
        <p v-if="errors.url" class="text-purple-400">{{ errors.url }}</p>
      </div>
      
      <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded">Soumettre</button>
    </form>

    <ResponseJson :message="responseMessage" :isError="isError" @close="responseMessage = null" />
  </section>
</template>
