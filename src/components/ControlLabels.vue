<template>
  <div class="hideBar">
    <label class="hideLabel"> Hide: </label>
    <div class="checkbox">
      <!-- All status -->
      <input
        :id="'status-' + store.productDataBystatus.status"
        v-model="store.hidestatus"
        type="checkbox"
        class="styled"
        :value="store.productDataBystatus.status"
        @click="store.hideShowALLstatus"
      />
      <label :for="'status-' + store.productDataBystatus.status[0]">All statuses</label>

      <!-- Dynamic status -->
      <div v-for="status in store.productDataBystatus.status" :key="status">
        <input
          :id="status"
          v-model="store.hidestatus"
          type="checkbox"
          class="styled"
          :value="status"
        />
        <label :for="status">{{ status }}</label>
      </div>
      <input v-model.trim="search" class="searchInput" type="text" placeholder="Search..." />
      <button @click="saveData">Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTableDataStore } from '../stores/tableData';
import {ref, watch} from "vue";

const store = useTableDataStore();
const saveData = store.saveData;

// Maybe move these into pinia store to modify the searches
const search = ref("")

// watch(search, () => {
//   status.value = q.filter((quiz) => quiz.name.toLowerCase().includes(search.value.toLowerCase()))
// })

</script>

<style scoped>
.hideBar input.search-input {
  border: none;
  background-color: rgba(128, 128, 128, 0.1);
  padding: 10px;
  margin-right: 25px;
  border-radius: 5px;
}
</style>
