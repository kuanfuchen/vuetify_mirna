<template>
  <v-card >
    <v-tabs v-model="miRNATab" color="primary">
      <v-tab class="text-none" :value="tab" v-for="(tab, index) in miRNATabs" :key="index" @click="selectedTable(index)">{{ tab }}</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="miRNATab">
        <v-window-item v-for="(tab, index) in miRNATabs" :key="index" :value="tab">
          <DisplayTable :table="tableComponentInfo"></DisplayTable>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { Subject, takeUntil } from 'rxjs';
  const miRNATabs = ref([]);
  const comSubject$ = new Subject();
  const miRNATab = ref('');
  const miRNATables = ref([]);
  import { dataService } from '../service/data_service';
  import DisplayTable from '../components/DisplayTable.vue';
  const tableComponentInfo = ref({});
  dataService.transferMeg$.pipe(takeUntil(comSubject$)).subscribe((miRNAInfo:object)=>{
    miRNATabs.value = miRNAInfo.tabs;
    miRNATab.value = miRNAInfo.tabs[0];
    miRNATables.value = miRNAInfo.tabsTable;
    handleTableComponent(miRNAInfo.tabsTable[0]);
  });
  const selectedTable = (index:number)=>{
    if(index > miRNATables.value.length || index < 0) return;
    handleTableComponent(miRNATables.value[index])
  };
  const handleTableComponent = (tableInfo:object) => {
    tableComponentInfo.value =  tableInfo;
  };
</script>