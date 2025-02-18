<script setup lang="ts">
import { ref } from 'vue';
import ky from 'ky';
import { z } from 'zod';
import { ProductSchema } from '@/schemas/product.schema';
import ResponseJson from '@/components/ResponseJson.vue';

type Product = z.infer<typeof ProductSchema>;
type Errors = Partial<Record<keyof Product, string>>;

const product = ref<Product>({
    name: '',
    image: '',
    description: '',
    brand: '',
    price: '',
    currency: 'EUR',
    availability: 'https://schema.org/InStock'
});

const errors = ref<Errors>({});
const responseMessage = ref<string | null>(null);
const isError = ref<boolean>(false);

const submitForm = async () => {
    errors.value = {};
    responseMessage.value = null;
    isError.value = false;
    
    const result = ProductSchema.safeParse(product.value);
    if (!result.success) {
        result.error.errors.forEach(err => {
            if (err.path.length) {
                const key = err.path[0] as keyof Product;
                errors.value[key] = err.message;
            }
        });
        return;
    }
    console.log("Produit valide :", product.value);

    try {
        const response = await ky.post('http://localhost:3000/api/product', {
            json: { data: product.value }
        });
        responseMessage.value = await response.text();
    } catch (error) {
        responseMessage.value = "Erreur lors de l'envoi du produit.";
        isError.value = true;
    }
};
</script>

<template>
  <section class="flex">
    <form @submit.prevent="submitForm" class="px-4 gap-6 w-1/2 text-white flex flex-col justify-between">
      <div>
        <label>Nom: <input v-model="product.name" type="text" class="border border-purple-500 p-2 w-full" required></label>
        <p v-if="errors.name" class="text-purple-400">{{ errors.name }}</p>
        
        <label>Image URL: <input v-model="product.image" type="url" class="border border-purple-500 p-2 w-full" required></label>
        <p v-if="errors.image" class="text-purple-400">{{ errors.image }}</p>
        
        <label>Description: <textarea v-model="product.description" class="border border-purple-500 p-2 w-full" required></textarea></label>
        <p v-if="errors.description" class="text-purple-400">{{ errors.description }}</p>
        
        <label>Marque: <input v-model="product.brand" type="text" class="border border-purple-500 p-2 w-full" required></label>
        <p v-if="errors.brand" class="text-purple-400">{{ errors.brand }}</p>
        
        <label>Prix: <input v-model="product.price" type="text" class="border border-purple-500 p-2 w-full" required></label>
        <p v-if="errors.price" class="text-purple-400">{{ errors.price }}</p>
        
        <label>Devise: 
          <select v-model="product.currency" class="border border-purple-500 p-2 w-full">
            <option value="EUR">Euro (€)</option>
            <option value="USD">Dollar ($)</option>
            <option value="GBP">Livre (£)</option>
          </select>
        </label>
        <p v-if="errors.currency" class="text-purple-400">{{ errors.currency }}</p>
        
        <label>Disponibilité: 
          <select v-model="product.availability" class="border border-purple-500 p-2 w-full">
            <option value="https://schema.org/InStock">En stock</option>
            <option value="https://schema.org/OutOfStock">Rupture de stock</option>
            <option value="https://schema.org/PreOrder">Précommande</option>
          </select>
        </label>
      </div>
      
      <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded">Soumettre</button>
    </form>

    <ResponseJson :message="responseMessage" :isError="isError" @close="responseMessage = null" />
  </section>
</template>
