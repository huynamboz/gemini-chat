<script setup lang="ts">
import Avatar from './Avatar.vue'
import Content from './Content.vue'

defineProps<{ message: { id: number; content: string; sender: string } }>()
</script>
<template>
  <div 
  :class="{ 'justify-end flex-row-reverse ml-auto': message.sender === 'user' }"
  class="flex gap-3">
    <Avatar />
    <div class="flex flex-col">
      <div class="bg-gray-100 p-3 rounded-xl">
        <p>{{ message.content }}</p>
      </div>
      <div class="text-xs text-gray-500 mt-1">{{ message.sender }}</div>
    </div>
  </div>
</template>