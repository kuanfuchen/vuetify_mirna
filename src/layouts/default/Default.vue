<template>
  <v-app>
    <HeaderNav @handleLeftDrawers="toggleLeft" ></HeaderNav>  
    <LeftSide :leftDrawer="toggleLeftDrawer"></LeftSide>
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
  import HeaderNav from '../../components/HeaderNav.vue';
  import DefaultView from './View.vue';
  import LeftSide from '../../components/LeftSide.vue';
  import { ref } from 'vue'
  const toggleLeftDrawer = ref(true);
  const toggleLeft = (ev)=>{
    toggleLeftDrawer.value = ev
  }
</script>
