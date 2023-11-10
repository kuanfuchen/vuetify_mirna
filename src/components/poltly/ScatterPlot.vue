<template>
  <div>
    <div id="scatterplot_visualization"></div>
  </div>
</template>
<script setup lang="ts">
  import Plotly from 'plotly.js-dist-min';
  import { takeUntil, Subject, debounceTime } from 'rxjs';
  import { watch } from 'vue';
  import { dataService } from '../../service/data_service.js';
  const comSubject$ = new Subject();
  const trace1 = {
    x: [],
    y: [],
    mode: 'markers',
    type: 'scatter',
    name: 'Team A',
    text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
    marker: { size: 12 }
  };
  const layout = {
    xaxis: { range: [] },
    yaxis: { range: [] },
  };
  const data = [ trace1,/* trace2 */];
  const defineScatterGraphInfo = defineProps(['scatterGraphInfo']);
  let scatter_Info:object = {
    headers:[],
    info:[]
  };
  
  const handleScatterPlotInfo = () => {
    const infoTitle = defineScatterGraphInfo.scatterGraphInfo;
    if(scatter_Info.headers.length === 0 && scatter_Info.info.length === 0) return;
    if(infoTitle.length === 0) return;
    const scatterplot_visualizationDiv = document.getElementById('scatterplot_visualization');
    Plotly.purge(scatterplot_visualizationDiv);
    const scatter_Info_Index_Array = [];
    for( let i = 0 ; infoTitle.length > i ; i++){
      if(scatter_Info.headers.length === 0 ) return;
      const scatter_Info_Index = scatter_Info.headers.indexOf(infoTitle[i]);
      if(scatter_Info_Index !== -1) scatter_Info_Index_Array.push(scatter_Info_Index)
    }
    let maxVal:number = 0;
    let minVal:number = 0;
    const traceSite = [];
    trace1.x.length = 0;
    trace1.y.length = 0;
    for(let i = 0 ; scatter_Info_Index_Array.length > i ; i++){
      traceSite[i] = [];
      for(let j = 0 ; scatter_Info.info.length > j ;j++){
        traceSite[i].push(scatter_Info.info[j][scatter_Info_Index_Array[i]])
        if(scatter_Info.info[j][scatter_Info_Index_Array[i]] > maxVal) {
          maxVal = scatter_Info.info[j][scatter_Info_Index_Array[i]];
        }
        if(minVal > scatter_Info.info[j][scatter_Info_Index_Array[i]]) minVal = scatter_Info.info[j][scatter_Info_Index_Array[i]];
      }
    }
    maxVal = Math.ceil(maxVal);
    minVal = Math.floor(minVal - 1);
    console.log(minVal, maxVal)
    trace1.x = traceSite[0];
    trace1.y = traceSite[1];
    layout.xaxis = {
      range: [ minVal, maxVal],
      title: infoTitle[0]
    };
    layout.yaxis = {
      range:[minVal, maxVal],
      title:infoTitle[1]
    };
    drawGraphScatterPlot_visualization(scatterplot_visualizationDiv)
  };
  const drawGraphScatterPlot_visualization = (div:any)=>{
    Plotly.newPlot(div, data, layout);
  };
  dataService.visualization_Plot$.pipe(takeUntil(comSubject$),debounceTime(300)).subscribe(async(visualization_info:object)=>{
    if(visualization_info.info.length === 0) return;
    scatter_Info = visualization_info;
    await handleScatterPlotInfo()
  });
  watch(defineScatterGraphInfo.scatterGraphInfo,()=>{
    handleScatterPlotInfo()
  });
</script>