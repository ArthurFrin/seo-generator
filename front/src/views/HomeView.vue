<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path: string) => {
    router.push(path);
};
</script>

<template>
    <section class="text-white">
        <h1 class="text-2xl font-bold text-center mb-6">Sélectionnez un type d'entité</h1>
        
        <div class="flex pt-10 justify-center gap-4 mb-6 ">
            <button @click="navigateTo('/person')" class="bg-purple-600 hover:bg-purple-700 p-2 rounded w-32">Personne</button>
            <button @click="navigateTo('/organization')" class="bg-purple-600 hover:bg-purple-700 p-2 rounded w-32">Organisation</button>
            <button @click="navigateTo('/offer')" class="bg-purple-600 hover:bg-purple-700 p-2 rounded w-32">Offre</button>
            <button @click="navigateTo('/product')" class="bg-purple-600 hover:bg-purple-700 p-2 rounded w-32">Produit</button>
            <button @click="navigateTo('/event')" class="bg-purple-600 hover:bg-purple-700 p-2 rounded w-32">Événement</button>
        </div>
    </section>
</template>
