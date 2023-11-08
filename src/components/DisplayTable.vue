<template>
  <div>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="tableBody"
      item-value="Sample name"
      class="elevation-1">
    </v-data-table>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { VDataTable } from "vuetify/labs/VDataTable";
  const itemsPerPage = ref(10)
  const definedprops = defineProps (['table']);
  const headers:any = ref([]);
  const tableBody = ref([]);
  onMounted(()=>{
    const tableInfo = definedprops.table;
    const bodyInfo:Array = [];
    for(let j = 0 ; tableInfo.body.length > j ; j++){
      bodyInfo[j] = [];
      for(let i = 0 ; tableInfo.headers.length > i ; i++){
      // header
        if(j === 0){
          headers.value.push({
            title: tableInfo.headers[i],
            align:'center',
            sortable:true,
            key:tableInfo.headers[i],
          })
        }
        if(!bodyInfo[j][tableInfo.headers[i]]){
          bodyInfo[j][tableInfo.headers[i]] = tableInfo.body[j][i]
        }
      }
    }
    tableBody.value = bodyInfo;
  });

  
</script>