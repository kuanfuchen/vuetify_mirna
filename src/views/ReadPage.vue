<template>
  <div>
    <MiRNATabs class="px-2 mt-3"></MiRNATabs>
  </div>
  
</template>
<script lang="ts" setup>
/* eslint-disable */
  import { Subject, takeUntil,debounceTime } from 'rxjs';
  import { dataService } from '@/service/data_service';
  import MiRNATabs from '../components/MiRNATabs.vue';
  const comSubject$ = new Subject();
  dataService.ReadAlignmentSubject$.pipe(takeUntil(comSubject$),debounceTime(100)).subscribe((readAlignmentTableInfo: object) => {
    dataService.transferHandleFinishMeg(readAlignmentTableInfo);
  });
</script>