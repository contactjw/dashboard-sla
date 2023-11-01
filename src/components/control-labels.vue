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
      <button @click="saveData">Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTableDataStore } from '../stores/tableData';

const store = useTableDataStore();
const saveData = store.saveData;
</script>

<style scoped></style>
