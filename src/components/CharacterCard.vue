<template>
   <li class="flex flex-col sm:flex-row overflow-hidden rounded-[0.5rem] bg-[#3C3E44] m-[13.5px] w-full sm:h-[220px] sm:w-[600px] shadow-lg">
      <div class="flex-[2_1_0] ">
        <img  :src="character.image" alt="character image" class="object-center object-cover m-0 h-[300px] sm:h-full w-full"/>
      </div>
      <div class="p-[0.75rem] flex-[3_1_0] flex flex-col ">
        <div class="flex flex-col flex-[1_1_0]  text-gray-800 justify-start  items-start">
          <h2 class="text-[27px] leading-[1.1] text-stone-100 font-bold">{{ character.name }}</h2>
          <div>
            <span :class="statusClass" class="w-[9px] h-[9px] inline-flex rounded-full mr-2"></span>
            <span class="text-[16px] text-stone-100 leading-normal text-gray-800">{{ character.status }} - {{ character.species }}</span>
          </div>
        </div>
        <div class='flex flex-col flex-[1_1_0] justify-center  items-start' >
          <p class='text-gray-400'>Last known location:</p>
          <p  class=' text-stone-100'>{{character.location.name}}</p>
       </div>
       <div class='flex flex-col flex-[1_1_0] justify-end  items-start' >
          <p class='text-gray-400'>First seen in:</p>
          <p  class='text-stone-100'>{{character.origin.name}}</p>
       </div>
      </div>
    </li>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Character } from '../types';

export default defineComponent({
  name: 'CharacterCard',
  props: {
    character: {
      type: Object as PropType<Character>,
      required: true
    }
  },
  
  setup(props) {
    const statusClass = computed(() => {
      return props.character.status === 'Alive' 
      ? 'bg-green-500' 
      : props.character.status === 'Dead' 
      ? 'bg-red-500' : 'bg-gray-500';
    });

    return { statusClass };
  }
});
</script>

