<script setup lang="ts">
import { GoogleGenerativeAI } from "@google/generative-ai"
import { v4 as uuidv4 } from 'uuid';
import Avatar from '~/components/chat/Avatar.vue'
import Content from '~/components/chat/Content.vue'
import Message from '~/components/chat/Message.vue';
const messages = ref([
  { id: uuidv4(), content: '***Hello***', role: 'user' },
  { id: uuidv4(), content: '***Hi***', role: 'model' },
])

const message = ref('')

const handleSendMessage = async () => {
  console.log('send message')
  messages.value.push({ id: uuidv4(), content: message.value, role: 'user' })
  const content = message.value
  message.value = ''

  const id = uuidv4();
  const genAI = new GoogleGenerativeAI('AIzaSyBP1Fr_50N06sr7IakyfysJQJtPl8DAJ4M');
      
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

    const chatSession = model.startChat({
      generationConfig,
      history: messages.value.map((item) => {
        return {
          role: item.role,
          parts: [
            {
              text: item.content,
            },
          ],
        };
      })
    });
  
    const result1 = await chatSession.sendMessageStream(content);
    const messagesLength = messages.value.length;
    messages.value[messagesLength] = { id, content: '', role: 'model' };
    for await (const item of result1.stream) {
      if (!item || !item.candidates || !item.candidates[0] || !item.candidates[0].content || !item.candidates[0].content.parts || !item.candidates[0].content.parts[0] || !item.candidates[0].content.parts[0].text) {
        continue;
      }
      console.log(item.candidates[0].content.parts[0].text);
      messages.value[messagesLength].content += item.candidates[0].content.parts[0].text;
      // setTimeout(() => {
      //   // concat each word 

      // }, 500);
      // nextTick and scroll to bottom
      nextTick(() => {
        const chat = document.querySelector('.box-container');
        if (!chat) return;
        chat.scrollTop = chat.scrollHeight;
      });
    }
}
</script>
<template>
  <div class="h-full flex flex-col overflow-hidden justify-between py-12">
    <div class="box-container flex-auto p-4 overflow-y-auto">
      <div class="flex flex-col gap-4">
        <Message v-for="message in messages" :key="message.id" :message="message" />
      </div>
    </div>
    <div class="flex justify-center items-center w-full">
      <div class="w-[80%] h-[60px] border shadow-md rounded-xl">
        <!-- input -->
        <div class="flex justify-between p-3">
          <input @keyup.enter="handleSendMessage" v-model="message" placeholder="Enter message..."
            class=" w-full outline-none" type="text">
          <svg @click="handleSendMessage" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20"
            height="20" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-width="1.5"
              d="m4.497 20.835l16.51-7.363c1.324-.59 1.324-2.354 0-2.944L4.497 3.164c-1.495-.667-3.047.814-2.306 2.202l3.152 5.904c.245.459.245 1 0 1.458l-3.152 5.904c-.74 1.388.81 2.87 2.306 2.202Z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>