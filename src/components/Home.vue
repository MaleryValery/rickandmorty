<template>
  <div>
    <div class="flex justify-center items-center gap-2">
      <input class='rounded px-2 py-1 text-stone-500' v-model="filters.name" placeholder="Filter by name">
      <select class='rounded px-2 py-1 text-stone-500' v-model="filters.status">
        <option value="">All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <button class='rounded px-2 py-1 border border-stone-100' @click="applyFilters">Apply</button>
    </div>

    <div v-if="loading" class="loader p-4 text-xl text-center">
      Loading...
    </div>

    <div v-if="error" class="error-message p-6 text-xl text-white">
      {{ error }}
    </div>

    <ul v-if="!error && !loading" class='py-[4.5rem] flex flex-wrap items-center max-w-[1920px] justify-center justify-items-center'>
      <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
    </ul>
    <div v-if="!error && !loading" class="flex justify-center items-center gap-2 p-4 pb-10">
      <button class='rounded px-2 py-1 border border-stone-100 disabled:opacity-20' @click="prevPage" :disabled="page === 1">Prev</button>
      <span>Page {{ page }}</span>
      <button class="rounded px-2 py-1 border border-stone-100 disabled:opacity-20" @click="nextPage" :disabled="!hasMore">Next</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import axios from 'axios';
import CharacterCard from '../components/CharacterCard.vue';
import { Character, ApiResponse } from '../types';


export default defineComponent({
  name: 'Home',
  components: { CharacterCard },
  setup() {
    const characters = ref<Character[]>([]);
    const page = ref(1);
    const hasMore = ref(true);
    const filters = ref({ name: '', status: '' });
    const error = ref<string | null>(null);
    const loading = ref(false);

    const fetchCharacters = async () => {
      try{
        loading.value = true;
        error.value = null;
        const response = await axios.get<ApiResponse>('https://rickandmortyapi.com/api/character', {
        params: {
          page: page.value,
          name: filters.value.name,
          status: filters.value.status
        }
      });
      characters.value = response.data.results;
      hasMore.value = response.data.info.next !== null;
      if (characters.value.length === 0) {
          error.value = 'No characters found';
        }
      }catch(err){
        error.value = 'An error occurred while fetching characters';
      } finally {
        loading.value = false;
      }
    
    };

    const applyFilters = () => {
      page.value = 1;
      fetchCharacters();
    };

    const prevPage = () => {
      if (page.value > 1) {
        page.value--;
        fetchCharacters();
      }
    };

    const nextPage = () => {
      if (hasMore.value) {
        page.value++;
        fetchCharacters();
      }
    };

    watch(page, fetchCharacters);

    fetchCharacters();

    return {
      characters,
      page,
      hasMore,
      filters,
      error,
      loading,
      applyFilters,
      prevPage,
      nextPage
    };
  }
});
</script>
