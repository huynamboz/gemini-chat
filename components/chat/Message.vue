<script setup lang="ts">
import Avatar from './Avatar.vue'
import Content from './Content.vue'
import { VMarkdownView } from 'vue3-markdown'
// import 'vue3-markdown/dist/style.css'
import  'github-markdown-css/github-markdown-light.css'
defineProps<{ message: { id: string; content: string; role: string } }>()

</script>
<template>
  <div 
  :class="[{ 'justify-end flex-row-reverse ml-auto': message.role === 'user' }, message.id]"
  class="flex gap-3 max-w-[50%]">
    <Avatar />
    <div class="flex flex-col">
      <div class="bg-gray-100 p-3 rounded-xl container-chat">
        <span style="white-space: pre-line">
          <!-- {{ message.content }} -->
          <ClientOnly>
            <VMarkdownView
              mode="light"
              :content="message.content"
            ></VMarkdownView>
          </ClientOnly>
          <!-- <MDC :value="message.content" tag="article" /> -->
        </span>
      </div>
      <div class="text-xs text-gray-500 mt-1">{{ message.role }}</div>
    </div>
  </div>
</template>
<style scoped>
:deep(.markdown-body) {
  background-color: transparent !important;
}
</style>