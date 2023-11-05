<template>
  <thead>
    <tr>
      <td :colspan="12">Dashboard SLA</td>
    </tr>
    <tr>
      <th colspan="3">{{ store.wwData }}</th>
      <th colspan="8">Product Info</th>
    </tr>
    <tr>
      <th>Status</th>
      <th>Cores</th>
      <th class="width1">Product</th>
      <th class="width1">Lithography</th>
      <th>Threads</th>
      <th>Base Freq</th>
      <th>Max Turbo Freq</th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import { useTableDataStore } from '../stores/tableData';

const store = useTableDataStore();
</script>

<style scoped>

</style>
