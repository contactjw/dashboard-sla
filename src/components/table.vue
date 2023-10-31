<template>
  <div>
    <!-- Hide By status Bar -->
    <div class="hideBar">
      <label class="hideLabel"> Select What To Hide: </label>
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
        <label :for="'status-' + store.productDataBystatus.status">All statuses</label>

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

    <!-- Main Table Design -->
    <table>
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
      <tbody>
        <template v-for="(data, status) in store.productDataBystatus.data">
          <!-- status -->
          <tr
            :style="{
              backgroundColor: store.colorMapping[status] || 'white',
            }"
          >
            <td class="width1" :rowspan="store.calstatusRowspan(data)">
              {{ status }}
            </td>
          </tr>

          <template v-for="cores in Object.keys(data)">
            <!-- cores -->
            <tr
              :style="{
                backgroundColor: store.colorMapping[status] || 'white',
              }"
            >
              <td
                class="width1"
                :rowspan="Object.keys(data[cores as unknown as keyof typeof data]).length + 1"
              >
                {{ cores }}
              </td>
            </tr>

            <tr v-for="v in data[cores as unknown as keyof typeof data]">
              <!-- product -->
              <td
                class="productColumn"
                :style="{
                  backgroundColor: store.colorMapping[status] || 'white',
                }"
              >
                {{ v.Product }}
              </td>

              <!-- Lithography -->
              <td
                :style="{
                  backgroundColor: store.colorMapping[status] || 'white',
                }"
              >
                {{ v.Lithography }}
              </td>

              <!-- Threads -->
              <td>
                <div class="innerCells">
                  <input
                    :value="v.Threads"
                    v-on:dblclick="handleDoubleClick()"
                    :disabled="false"
                    type="text"
                    :style="{
                      backgroundColor: store.colorMapping[status] || 'white',
                    }"
                  />
                </div>
              </td>

              <!-- Base Freq -->
              <td>
                <div class="innerCells">
                  <input
                    :value="v.Base_Freq"
                    :disabled="true"
                    type="text"
                    :style="{
                      backgroundColor: store.colorMapping[status] || 'white',
                    }"
                  />
                </div>
              </td>

              <!-- Max Turbo Freq -->
              <td>
                <div class="innerCells">
                  <input
                    :value="v.Max_Turbo_Freq"
                    type="text"
                    :disabled="true"
                    :style="{
                      backgroundColor: store.colorMapping[status] || 'white',
                    }"
                  />
                </div>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
    <!-- End of Table Design -->
  </div>
</template>

<script setup lang="ts">
import { useTableDataStore } from '../stores/tableData';
// in the process of modularizing components of the table.
// import ControlLabels from './control-labels.vue';
// import TableHeading from './table-heading.vue';
// import TableBody from './table-body.vue';
import { ref } from 'vue';
const store = useTableDataStore();
const isDisabled = ref(false);

function handleDoubleClick() {
  isDisabled.value = true;
}

const saveData = store.saveData;
</script>

<style scoped>
.hideBar label {
  margin-right: 20px;
}
.fas.fa-times {
  display: none;
}

.fas.fa-times.comment {
  display: block;
}

.overWrittenCells:hover .fas {
  display: block;
}

.innerCells {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.innerCells.comment {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

table {
  width: 100%;
  white-space: nowrap !important;
}

table td {
  position: relative;
}

i {
  cursor: pointer;
}

.legendColorBox {
  margin: 0.4%;
  float: left;
  height: 20px;
  width: 30px;
  border: 1px solid grey;
  margin-right: 4%;
}

.inputBox {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  text-align: center;
  border: 0;
  text-transform: uppercase !important;
}

.inputBoxOverWritten {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  text-align: center;
  border: 0;
  width: 80px;
  text-transform: uppercase !important;
  background: none !important;
}

.overWrittenCells {
  border: 2px solid rgb(194, 1, 1);
}

.overWrittenCells input {
  outline: 0;
}

input::placeholder {
  color: black;
}

input:focus::-webkit-input-placeholder {
  color: grey;
}

input[disabled] {
  cursor: text;
  background-color: inherit;
  color: black;
}

.legend-labels {
  white-space: nowrap !important;
  padding: 0%;
  display: flex;
  list-style-type: none;
  margin-bottom: 5px;
}

.legend-labels li {
  font-size: small;
  margin-right: 2%;
}

select {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  text-align: center;
  border: 0;
}

table tr td:not(.skip),
table tr th {
  text-align: center;
}

td,
th {
  padding: 2px !important;
  width: 100px;
  border: 1px solid black;
}

.reference {
  width: 1%;
  background-color: #00b0f0;
}

.released {
  width: 1%;
  background-color: #7fff00;
}

.partial {
  width: 1%;
  background-color: #ffa500;
}

.tentative {
  width: 1%;
  background-color: #dcdcdc;
}

.planned {
  width: 1%;
  background-color: #82ffac;
}

.hideBar {
  list-style: none;
  display: flex;
}

.productColumn {
  width: 1%;
  background-color: white;
}

.checkbox {
  list-style: none;
  display: flex;
}

.checkbox label {
  margin-left: 5px;
}

.redActual {
  width: 1%;
  color: red;
  background-color: #dcdcdc;
}

.width1 {
  width: 1%;
  /* white-space: nowrap !important; */
}
</style>
