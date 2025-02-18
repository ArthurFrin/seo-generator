<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{ message: string | null; isError: boolean }>();

const formattedMessage = computed(() => {
  try {
    return props.message ? JSON.stringify(JSON.parse(props.message), null, 2) : '';
  } catch {
    return props.message;
  }
});
</script>

<template>
  <div message class="fixed right-0 top-0 h-full w-1/2 bg-gray-800 text-white shadow-lg border-l border-gray-700 overflow-auto p-4">
    <h2 class="text-lg font-bold" :class="{ 'text-green-400': !isError, 'text-red-400': isError }">
      {{ isError ? 'Erreur' : 'Schema.org' }}
    </h2>
    <pre class="mt-2 whitespace-pre-wrap break-words">{{ formattedMessage }}</pre>
  </div>
</template>
