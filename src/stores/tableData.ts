import { defineStore } from 'pinia';
import { ref, computed } from 'vue'; // Import Composition API functions
import data from '../assets/data.json';

export const useTableDataStore = defineStore('data', () => {
  const hidestatus = ref<string[]>([]);
  const UIData = ref<any[]>([]);
  const allCheckBox = ref<string[]>([]);
  UIData.value = data;

  const calstatusRowspan = (data: { [x: string]: {} }) => {
    let sum: number = Object.keys(data).length + 1;
    for (const cores in data) {
      sum += Object.keys(data[cores]).length;
    }
    return sum;
  };

  const getWWFromDate = (date = null) => {
    let currentDate: Date = date || new Date();
    let startDate: Date = new Date(currentDate.getFullYear(), 0, 1);
    let days: number = Math.floor(
      (currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
    );

    return {
      year: currentDate.getFullYear(),
      workweek: Math.ceil(days / 7),
      numofday: currentDate.getDay(),
    };
  };

  const hideShowALLstatus = () => {
    const styledElement: HTMLInputElement | null = document.querySelector('.styled');

    if (styledElement && styledElement instanceof HTMLInputElement) {
      if (styledElement.checked) {
        hidestatus.value = productDataBystatus.value.status;
        allCheckBox.value = productDataBystatus.value.status;
      } else {
        hidestatus.value = [];
        allCheckBox.value = [];
      }
    }
  };

  const productDataBystatus = computed(() => {
    let tmp: Record<string, Record<number, any[]>> = {};
    let data: Array<any> = UIData.value;
    let statusSet: Set<string> = new Set();

    data.forEach((element: { Status: string; Cores: number }) => {
      let status: string = element.Status;
      let cores: number = element.Cores;

      // push status to set
      statusSet.add(status);

      if (hidestatus.value.includes(status)) return; // Hide by status
      if (!tmp[status]) tmp[status] = {};
      if (!tmp[status][cores]) tmp[status][cores] = [];

      tmp[status][cores].push(element);
    });

    // sort status in order
    const strings: Set<string> = new Set(statusSet);
    const sortedStringsArray: Array<string> = [...strings].sort();
    statusSet = new Set(sortedStringsArray);

    return {
      status: [...statusSet],
      data: tmp,
    };
  });

  const wwInfo = computed(() => getWWFromDate());
  const wwData = computed(
    () => `${wwInfo.value.year}WW${wwInfo.value.workweek}.${wwInfo.value.numofday}`
  );

  const colorMapping = ref<Record<string, string>>({
    Discontinued: 'red',
    Launched: 'green',
    'Launched (with IPU)': 'blue',
    Announced: 'yellow',
    // ... add other statuses and their corresponding colors
  });

  return {
    calstatusRowspan,
    getWWFromDate,
    hideShowALLstatus,
    productDataBystatus,
    hidestatus,
    UIData,
    allCheckBox,
    wwInfo,
    wwData,
    colorMapping,
  };
});
