<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
    router.push('/');
};
</script>

<template>
    <button @click="goHome" class="return-button bg-purple-600 hover:bg-purple-700">Retour</button>
</template>

<style scoped>
.return-button {
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 10px 20px;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1000;
}
</style>
