import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue'; // Import Composition API functions
import axios from 'axios';
import data from '../assets/data.json';

export const useTableDataStore = defineStore('data', () => {
  const hidestatus = ref<string[]>([]);
  const UIData = ref<any[]>([]);
  const allCheckBox = ref<string[]>([]);
  UIData.value = data;

  const fetchData = async () => {
    try {
      const response = await fetch('../assets/data.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      UIData.value = await response.json();
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const saveData = async () => {
    try {
      await axios.post('http://localhost:3001/save', data);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Failed to save data', error);
    }
  };

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
    Discontinued: 'rgba(255, 0, 0, 0.5)',
    Launched: 'rgba(0, 255, 0, 0.5)',
    'Launched (with IPU)': 'rgba(0, 156, 255, 0.5)',
    Announced: 'rgba(255, 255, 0, 0.5)',
    // ... add other statuses and their corresponding colors
  });


  // search bar ( I ALREADY APPLIED SEARCH TO THE INPUT IN CONTROL-LABELS.vue)
  const showSearchBoxProducts = () => {
    const styledElement: HTMLInputElement | null = document.querySelector('.styled');
    const search = document.querySelector('.searchInput');

    watch(search, () => {
      status.value = q.filter((quiz) => quiz.name.toLowerCase().includes(search.value.toLowerCase()))
    })

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
  

  return {
    fetchData,
    saveData,
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
