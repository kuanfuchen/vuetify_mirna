<template>
  <div class="">
      <v-navigation-drawer v-model="defineProp.leftDrawer" location="left">
        <v-list>
          <v-list-item to="/" :active="activeItem === 'projectInfo'" @click="activeItem = 'projectInfo'">
            <v-list-item-title v-text="'Project Info'" ></v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-subheader>Quality Control</v-list-subheader>
          <v-list-item v-for="(item, i) in sideBarGroupA" :key="i" :to="item.to"
            @click="activeItem = item.value"  :active="activeItem === item.value">
              <v-list-item-title v-text="item.title" >
              </v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-subheader>Analysis</v-list-subheader>
          <v-list-item v-for="(item, i) in sideBarGroupB" :key="i" :to="item.to"
            @click="activeItem = item.value"  :active="activeItem === item.value">
              <v-list-item-title v-text="item.title" >
              </v-list-item-title>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script setup lang="ts">
  const defineProp = defineProps(['leftDrawer']);
  import { ref } from 'vue';
  const activeItem = ref('projectInfo');
  const sideBarGroupA = [
  {
    value:"readAlignment",
    title:'Read & Alignment',
    to:'/readAlignment'
  },{
    value:'visualization',
    title:'Visualization',
    to:'/visualization'
  }];
  const sideBarGroupB = [
  {
    value:'differenceExpression',
    title:'Difference Expression',
    to:'differenceExpression'
  }];
</script>
