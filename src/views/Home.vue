<template>
  <v-container class="">
    <v-responsive class="align-center fill-height">
      <v-card class="mx-auto ">
      <!-- prepend-icon="mdi-home" -->
        <template v-slot:title>
          <div class="text-h4 text-teal text-bold mb-6">Project Information</div>
        </template>
        <v-card-text class="d-flex tableBackground" v-for="( userInfo, index ) in projectUsrInfo.userInfoOrder" :key="index">
          <div class="v-row mt-1">
            <p class="v-col-md-4 v-col-xl-3 text-h6">{{ userInfo }}</p>
            <p class="v-col-md-8 v-col-xl-9 text-h6">{{ projectUsrInfo[userInfo] }}</p>
          </div>
          <q-separator v-if="index < projectUsrInfo.userInfoOrder.length - 1" />
        </v-card-text>
      </v-card>
    </v-responsive>
  </v-container>
</template>
<script setup lang="ts">
/* eslint-disable */
import { ref } from 'vue';
const projectUsrInfo:any = ref({
  'userInfoOrder': ['PONumber', 'Date', 'Institute', 'Customer',/*'Tel',*/'Organism', 'kit', 'Genome', 'miRNA DB'],
  'Organism':'xxx',
  'PONumber':'0000001',
  'Institute':'xx大學',
  'Customer':'xxx',
  // Tel:'',
  'kit':'kit',
  'Genome':'PDE',
  'miRNA DB': 'v22',
  'Date':'2024/12/11'
})
const backgrundPlant = ref('dark');
</script>
<style scoped>
  .tableBackground{
    background:#eceff1;
  }
</style>
