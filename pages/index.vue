<script setup lang="ts">
import Avatar from '~/components/chat/Avatar.vue'
import Content from '~/components/chat/Content.vue'
import Message from '~/components/chat/Message.vue';
const messages = ref([
  { id: 1, content: 'Hello', sender: 'model' },
  { id: 2, content: 'Hi', sender: 'user' },
  { id: 3, content: 'How are you?', sender: 'model' },
])

const message = ref('')

const handleSendMessage = () => {
  console.log('send message')
  messages.value.push({ id: 4, content: message.value, sender: 'user' })
  message.value = ''
}
</script>
<template>
  <div class="h-full flex flex-col overflow-hidden justify-between py-12">
    <div class="flex-auto p-4 overflow-y-auto">
      <div class="flex flex-col gap-4">
        <Message v-for="message in messages" :key="message.id" :message="message" />
      </div>
    </div>
    <div class="flex justify-center items-center w-full">
      <div class="w-[80%] h-[60px] border shadow-md rounded-xl">
        <!-- input -->
        <div class="flex justify-between p-3">
          <input 
          @keyup.enter="handleSendMessage"
          v-model="message" placeholder="Enter message..." class=" w-full outline-none" type="text">
          <svg @click="handleSendMessage" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" d="m4.497 20.835l16.51-7.363c1.324-.59 1.324-2.354 0-2.944L4.497 3.164c-1.495-.667-3.047.814-2.306 2.202l3.152 5.904c.245.459.245 1 0 1.458l-3.152 5.904c-.74 1.388.81 2.87 2.306 2.202Z"/></svg>
        </div>
      </div>
    </div>
  </div>
</template>