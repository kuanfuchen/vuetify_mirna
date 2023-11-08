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
          <v-card class="mx-3 mt-3" width="100%" prepend-icon="mdi-home">
            <template v-slot:title>
              Scatter Plot
            </template>
            <div id="scatterplot_visualization"></div>
          </v-card>
          <v-card class="mx-3 mt-3" width="100%">
            <template v-slot:title>
              Box Plot
            </template>
            <div id="Boxplot_visualization"></div>
          </v-card>
        </v-window-item>
        <v-window-item value="Table">
          <!-- <MiRNATabs class="px-2 mt-3"></MiRNATabs> -->
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
  import Plotly from 'plotly.js-dist-min';
  import { onMounted, ref } from 'vue';
  import { dataService } from '../service/data_service';
  import { Subject, takeUntil, debounceTime } from 'rxjs';
  import DisplayTable from '../components/DisplayTable.vue';
  // import MiRNATabs from '../components/MiRNATabs.vue';
  const comSubject$ = new Subject();
  const tableComponentInfo = ref({});
  const miRNATab = ref('');
  const miRNATabs = ref([]);
  const miRNATables = ref([]);
  const trace1 = {
  x: [1, 2, 3, 4, 5],
  y: [1, 6, 3, 6, 1],
  mode: 'markers',
  type: 'scatter',
  name: 'Team A',
  text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
  marker: { size: 12 }
};
const trace2 = {
  x: [1.5, 2.5, 3.5, 4.5, 5.5],
  y: [4, 1, 7, 1, 4],
  mode: 'markers',
  type: 'scatter',
  name: 'Team B',
  text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
  marker: { size: 12 }
};
const data = [ trace1, trace2 ];
const layout = {
  xaxis: {
    range: [ 0.75, 5.25 ]
  },
  yaxis: {
    range: [0, 8]
  },
  title:'Data Labels Hover'
};
// 
const y0 = [];
const y1 = [];
for (let i = 0; i < 50; i ++) {
	y0[i] = Math.random();
	y1[i] = Math.random() + 1;
}

const trace3 = {
  y: y0,
  type: 'box'
};

const trace4 = {
  y: y1,
  type: 'box'
};

const boxdata = [trace3, trace4];

// 
const displayStyle = ref(['Graph', 'Table']);
const useStyleTab = ref('Graph'); 

dataService.handleRawReadsFolder$.pipe(takeUntil(comSubject$), debounceTime(300)).subscribe((microRNAraw)=>{
  console.log(microRNAraw, 'microRNAraw')
  miRNATabs.value = microRNAraw.tabs;
  miRNATab.value = microRNAraw.tabs[0];
  miRNATables.value = microRNAraw.tabsTable;
  handleTableComponent(microRNAraw.tabsTable[0]);
  // dataService.transferHandleFinishMeg(microRNAraw);
});
const selectedTable = (index:number)=>{
  if(index > miRNATables.value.length || index < 0) return;
  handleTableComponent(miRNATables.value[index])
};
const handleTableComponent = (tableInfo:object) => {
  tableComponentInfo.value =  tableInfo;
};
const drawGraphScatterPlot_visualization = ()=>{
  const scatterplot_visualization = document.getElementById('scatterplot_visualization');
  Plotly.newPlot(scatterplot_visualization, data, layout);
};
const drawGraphBoxplot_visualization = () =>{
  const boxplot_visualization = document.getElementById('Boxplot_visualization');
  Plotly.newPlot(boxplot_visualization, boxdata)
}
onMounted(()=>{
  drawGraphScatterPlot_visualization();
  drawGraphBoxplot_visualization();
})
</script>