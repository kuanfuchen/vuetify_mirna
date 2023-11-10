<template>
  <div>
    <div id="Boxplot_visualization"></div>
  </div>
</template>
<script setup lang="ts">
  import Plotly from 'plotly.js-dist-min';
  import { onMounted } from 'vue';
  import { dataService } from '../../service/data_service.js';
  import { takeUntil, Subject, debounceTime } from 'rxjs';
  const comSubject$ = new Subject();
  let scatter_Info:object = {
    headers:[],
    info:[]
  };
  const y0 = [];
  const y1 = [];
  for (let i = 0; i < 50; i ++) {
    y0[i] = Math.random();
    y1[i] = Math.random() + 1;
  }

  const trace1 = {
    y: y0,
    type: 'box'
  };

  const trace2 = {
    y: y1,
    type: 'box'
  };

  const boxdata = [trace1, trace2];
  const drawGraphBoxplot_visualization = () =>{
  const boxplot_visualization = document.getElementById('Boxplot_visualization');
    Plotly.newPlot(boxplot_visualization, boxdata)
  }
  const handleBoxPlotInfo = () => {
    if(scatter_Info.headers.length === 0 && scatter_Info.info.length === 0) return;
    const Boxplot_visualization = document.getElementById('Boxplot_visualization');
    Plotly.purge(Boxplot_visualization);
    const traceData = [];
    for(let i = 0 ; scatter_Info.headers.length > i ; i++){
      traceData[i] = {
        name:scatter_Info.headers[i],
        boxpoints: 'Outliers',
        type: 'box',
        y:[]
      };
      for( let j = 0 ; scatter_Info.info.length > j ; j++){
        traceData[i].y.push(scatter_Info.info[j][i])
      }
      // traceData[i] = {
      //   type: "box",
      //   y:scatter_Info.info[i]
      // }
    }
    console.log(traceData , 'traceData')
    drawBoxPlot(Boxplot_visualization, traceData)
  };
  const drawBoxPlot = (div, data) => {
    Plotly.newPlot(div, data)
  }
  dataService.visualization_Plot$.pipe(takeUntil(comSubject$),debounceTime(300)).subscribe(async(visualization_info:object)=>{
    if(visualization_info.info.length === 0) return;
    scatter_Info = visualization_info;
    await handleBoxPlotInfo();
  });
  // onMounted(()=>{
  //   drawGraphBoxplot_visualization()
  // })
</script>