<template>
  <v-app-bar color="teal-darken-4" >
    <template v-slot:image>
      <v-img  gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>miRNA</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon><v-icon>mdi-wrench</v-icon></v-btn>
    <!-- <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
    <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn> -->
  </v-app-bar>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  const leftDrawer = ref(true);
  const emits = defineEmits(['handleLeftDrawers']);
  const toggleDrawer = ()=>{
    leftDrawer.value = !leftDrawer.value;
    emits('handleLeftDrawers', leftDrawer.value)
  }

</script>
