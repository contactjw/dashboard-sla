<template>
  <tbody>
    <template v-for="(data, status) in store.productDataBystatus.data">
      <!-- status -->
      <tr :style="{
                backgroundColor: store.colorMapping[status] || 'white',
              }">
        <td class="width1" :rowspan="store.calstatusRowspan(data)">
          {{ status }}
        </td>
      </tr>

      <template v-for="cores in Object.keys(data)">
        <!-- cores -->
        <tr>
          <td
            class="width1"
            :rowspan="Object.keys(data[cores as unknown as keyof typeof data]).length + 1" :style="{
                backgroundColor: store.colorMapping[status] || 'white',
              }"
          >
            {{ cores }}
          </td>
        </tr>

        <tr v-for="v in data[cores as unknown as keyof typeof data]">
          <!-- product -->
          <td class="productColumn" :style="{
                backgroundColor: store.colorMapping[status] || 'white',
              }">{{ v.Product }}</td>

          <!-- Lithography -->
          <td :style="{
                backgroundColor: store.colorMapping[status] || 'white',
              }">{{ v.Lithography }}</td>

          <!-- Threads -->
          <td>
            <div class="innerCells" >
              <input @dblclick="handleDoubleClick" :value="v.Threads" :disabled="isDisabled" type="text" :style="{
                backgroundColor: store.colorMapping[status] || 'white',
              }"/>
            </div>
          </td>

          <!-- Base Freq -->
          <td>
            <div class="innerCells">
              <input @dblclick="handleDoubleClick" :value="v.Base_Freq" :disabled="isDisabled" type="text" :style="{
                backgroundColor: store.colorMapping[status] || 'white',
              }"/>
            </div>
          </td>

          <!-- Max Turbo Freq -->
          <td>
            <div class="innerCells">
              <input @dblclick="handleDoubleClick" :value="v.Max_Turbo_Freq" type="text" :disabled="isDisabled" :style="{
                backgroundColor: store.colorMapping[status] || 'white',
              }"/>
            </div>
          </td>
        </tr>
      </template>
    </template>
  </tbody>
</template>

<script setup lang="ts">
import { useTableDataStore } from '../stores/tableData';
import { ref } from 'vue';

const store = useTableDataStore();

const isDisabled = ref(true);

// Need to fix handleDoubleClick
const handleDoubleClick = () => {
  isDisabled.value = !isDisabled.value;
  console.log("double-clicked");
}

</script>

<style scoped></style>
