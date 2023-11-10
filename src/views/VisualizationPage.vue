<template>
  <div class="mt-3 px-3">
    <v-tabs v-model="useStyleTab" color="primary">
      <v-tab v-for="(item, i) in displayStyle" color="primary" :key="i" class="text-none">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="useStyleTab">
        <v-window-item value="Graph">
          <div>
            <div class="d-flex justify-center">
              <div class="text-h6 w-25">
                <p class="text-center mb-2">Sample1</p>
                <v-select v-model="sample1Item" @update:modelValue="changeSample1"
                :items="selctedSampleItem"
                variant="outlined"
                ></v-select>
              </div>
              <div class="text-h6 mx-5">V.S</div>
              <div class="text-h6 w-25">
                <p class="text-center mb-2">Sample2</p>
                <v-select v-model="sample2Item" @update:modelValue="changeSample2"
                  :items="selctedSampleItem"
                  variant="outlined"
                ></v-select>
              </div>
            </div>
          </div>
          <v-card class="mx-3 mt-3" width="100%">
            <template v-slot:title>
              Scatter Plot
            </template>
            <ScatterPlot :scatterGraphInfo="selectedSampleTitle"></ScatterPlot>
          </v-card>
          <v-card class="mx-3 mt-3" width="100%">
            <template v-slot:title>
              Box Plot
            </template>
            <BoxPlot></BoxPlot>
          </v-card>
        </v-window-item>
        <v-window-item value="Table">
            <!-- <MiRNATabs class="px-2 mt-3" ></MiRNATabs> -->
          <!--  -->
          <v-tabs v-model="miRNATab" class="text-none">
            <v-tab class="text-none" v-for="(tab, i) in miRNATabs" :key="i" @click="selectedTable(i)">{{ tab }}</v-tab>
          </v-tabs>
          <v-card-text>
            <v-window v-model="miRNATab">
              <v-window-item v-for="(tab, index) in miRNATabs" :key="index" :value="tab">
                <DisplayTable :table="tableComponentInfo"></DisplayTable>
              </v-window-item>
            </v-window>
          </v-card-text>
          <!--  -->
        </v-window-item>
      </v-window>
    </v-card-text>
  </div>
</template>
<script setup lang="ts">
  /* eslint-disable */
  import { onMounted, ref, reactive } from 'vue';
  import { dataService } from '../service/data_service.js';
  import { Subject, takeUntil, debounceTime } from 'rxjs';
  import DisplayTable from '../components/DisplayTable.vue';
  import BoxPlot from '../components/poltly/BoxPlot.vue';
  import ScatterPlot from '../components/poltly/ScatterPlot.vue'
  // import MiRNATabs from '../components/MiRNATabs.vue';
  const comSubject$ = new Subject();
  const tableComponentInfo = ref({});
  const miRNATab = ref('');
  const miRNATabs = ref([]);
  const miRNATables = ref([]);
  const selctedSampleItem = ref([]);
  const sample1Item = ref('');
  const sample2Item = ref('');
  const selectedSampleTitle = reactive([]);
  const displayStyle = ref(['Graph', 'Table']);
  const useStyleTab = ref('Graph'); 
  dataService.visualization_Plot$.pipe(takeUntil(comSubject$),debounceTime(100)).subscribe(async(visualization_info:object)=>{
    selctedSampleItem.value = await visualization_info.headers;
    if(visualization_info.headers.length > 1){
      sample1Item.value = visualization_info.headers[0];
      sample2Item.value = visualization_info.headers[1];
      selectedSampleTitle.length = 0;
      selectedSampleTitle.push(visualization_info.headers[0], visualization_info.headers[1])
      // selectedSampleTitle = [visualization_info.headers[0], visualization_info.headers[1]];
    }
  });

  dataService.handleRawReadsFolder$.pipe(takeUntil(comSubject$), debounceTime(300)).subscribe((microRNAraw)=>{
    miRNATabs.value = microRNAraw.tabs;
    miRNATab.value = microRNAraw.tabs[0];
    miRNATables.value = microRNAraw.tabsTable;
    handleTableComponent(microRNAraw.tabsTable[0]);
    //tabs模板速度太快，資料還沒處理好就畫出介面，導致介面無資料，之後要延遲tabs時間
    // dataService.transferHandleFinishMeg(microRNAraw);
  });
// const selectedTable = (item:string)=>{
//   console.log(item)
//   if(item === 'Table'){
//     console.log(microRNArawTable)
//     dataService.transferHandleFinishMeg(microRNArawTable);
//   }
// }
const changeSample1 = (ev:string)=> {
  sample1Item.value = ev;
  selectedSampleTitle.length = 0;
  selectedSampleTitle.push(sample1Item.value, sample2Item.value)
}
const changeSample2 = (ev:string)=> {
  sample2Item.value = ev;
  selectedSampleTitle.length = 0;
  selectedSampleTitle.push(sample1Item.value, sample2Item.value)
}
const selectedTable = (index:number)=>{
  if(index > miRNATables.value.length || index < 0) return;
  handleTableComponent(miRNATables.value[index])
};
const handleTableComponent = (tableInfo:object) => {
  tableComponentInfo.value =  tableInfo;
};
onMounted(async() => {
})
</script>