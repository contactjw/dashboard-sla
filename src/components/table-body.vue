<template>
  <tbody>
    <template v-for="(data, status) in store.productDataBystatus.data">
      <!-- status -->
      <tr>
        <td class="width1" :rowspan="store.calstatusRowspan(data)">
          {{ status }}
        </td>
      </tr>

      <template v-for="cores in Object.keys(data)">
        <!-- cores -->
        <tr>
          <td
            class="width1"
            :rowspan="Object.keys(data[cores as unknown as keyof typeof data]).length + 1"
          >
            {{ cores }}
          </td>
        </tr>

        <tr v-for="v in data[cores as unknown as keyof typeof data]">
          <!-- product -->
          <td class="productColumn">{{ v.Product }}</td>

          <!-- Lithography -->
          <td>{{ v.Lithography }}</td>

          <!-- Threads -->
          <td>
            <div class="innerCells">
              <input :value="v.Threads" :disabled="true" type="text" />
            </div>
          </td>

          <!-- Base Freq -->
          <td>
            <div class="innerCells">
              <input :value="v.Base_Freq" :disabled="true" type="text" />
            </div>
          </td>

          <!-- Max Turbo Freq -->
          <td>
            <div class="innerCells">
              <input :value="v.Max_Turbo_Freq" type="text" :disabled="true" />
            </div>
          </td>
        </tr>
      </template>
    </template>
  </tbody>
</template>

<script setup lang="ts">
import { useTableDataStore } from '../stores/tableData';

const store = useTableDataStore();
</script>

<style scoped></style>
