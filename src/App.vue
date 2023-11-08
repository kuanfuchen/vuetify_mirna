<template>
  <router-view />
</template>

<script lang="ts" setup>
  //
  import { /* defineComponent */ onMounted } from 'vue';
  import { dataService } from '@/service/data_service.js';
// import data from './service/data_service';
// export default defineComponent({
//   name: 'App'
// })
// import Textraw from './assets/miRNA-seq/Bowtie2/00. QC (Trim adaptor & Trim base)/01. Raw reads/pre_alignment_qaqc.txt?raw';
onMounted(() => {
  dataService.handleQCReadAlignmentfolder();
  dataService.handleRawReadsFolder();
});
</script>
