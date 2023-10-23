<template>
  <div>
    <!-- Hide By status Bar -->
    <div class="hideBar">
      <label class="hideLabel"> Hide: </label>
      <div class="checkbox">
        <!-- All status -->
        <input
          :id="productDataBystatus.status"
          v-model="hidestatus"
          type="checkbox"
          class="styled"
          :value="productDataBystatus.status"
          @click="hideShowALLstatus"
        />
        <label :for="productDataBystatus.status">All statuses</label>

        <!-- Dynamic status -->
        <div v-for="status in productDataBystatus.status" :key="status">
          <input :id="status" v-model="hidestatus" type="checkbox" class="styled" :value="status" />
          <label :for="status">{{ status }}</label>
        </div>
      </div>
    </div>

    <!-- Main Table Design -->
    <table>
      <thead>
        <tr>
          <td :colspan="12">Dashboard SLA</td>
        </tr>
        <tr>
          <th colspan="3">{{ wwData }}</th>
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
        <template v-for="(data, status, index) in productDataBystatus.data">
          <!-- status -->
          <tr>
            <td class="width1" :rowspan="calstatusRowspan(data)">
              {{ status }}
            </td>
          </tr>

          <template v-for="cores in Object.keys(data)">
            <!-- cores -->
            <tr>
              <td class="width1" :rowspan="Object.keys(data[cores]).length + 1">
                {{ cores }}
              </td>
            </tr>

            <tr v-for="(v, k) in data[cores]">
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
    </table>
    <!-- End of Table Design -->
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'; // Import Composition API functions
import data from '../assets/data.json';

export default {
  setup() {
    const hidestatus = ref([]);
    const UIData = ref([]);
    const allCheckBox = ref([]);
    const wwInfo = computed(() => getWWFromDate());
    const wwData = computed(
      () => `${wwInfo.value.year}WW${wwInfo.value.workweek}.${wwInfo.value.numofday}`
    );

    onMounted(() => {
      UIData.value = data;
    });

    const calstatusRowspan = (data) => {
      let sum = Object.keys(data).length + 1;
      for (const cores in data) {
        sum += Object.keys(data[cores]).length;
      }
      return sum;
    };

    const getWWFromDate = (date = null) => {
      let currentDate = date || new Date();
      let startDate = new Date(currentDate.getFullYear(), 0, 1);
      let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

      return {
        year: currentDate.getFullYear(),
        workweek: Math.ceil(days / 7),
        numofday: currentDate.getDay(),
      };
    };

    const hideShowALLstatus = () => {
      if (!document.querySelector('.styled').checked) {
        hidestatus.value = [];
        allCheckBox.value = [];
      }

      if (document.querySelector('.styled').checked) {
        hidestatus.value = productDataBystatus.value.status;
        allCheckBox.value = productDataBystatus.value.status;
      }

      allCheck.value = !allCheck.value;

      if (allCheck.value) {
      } else {
        hidestatus.value = [];
        allCheckBox.value = [];
      }
    };

    const productDataBystatus = computed(() => {
      let tmp = {};
      let data = UIData.value;
      let statusSet = new Set();

      data.forEach((element) => {
        let status = element.Status;
        let cores = element.Cores;

        // push status to set
        statusSet.add(status);

        if (hidestatus.value.includes(status)) return; // Hide by status
        if (!tmp[status]) tmp[status] = {};
        if (!tmp[status][cores]) tmp[status][cores] = [];

        tmp[status][cores].push(element);
      });

      // sort status in order
      const strings = new Set(statusSet);
      const sortedStringsArray = [...strings].sort();
      statusSet = new Set(sortedStringsArray);

      return {
        status: [...statusSet],
        data: tmp,
      };
    });

    return {
      hidestatus,
      allCheckBox,
      wwInfo,
      wwData,
      calstatusRowspan,
      getWWFromDate,
      hideShowALLstatus,
      productDataBystatus,
    };
  },
};
</script>

<style scoped>
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
  margin-left: 10px;
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
