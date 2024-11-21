<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { RouterView } from 'vue-router'

const { needRefresh, updateServiceWorker } = useRegisterSW({
  onNeedRefresh() {
    alert('リロードします')
    window.location.reload()
  }
})

</script>

<template>
  <h1>PWA APP</h1>
  <p v-if="needRefresh">リロードが必要です</p>
  <button v-if="needRefresh"  @click="updateServiceWorker()">リロードする</button>
  <div>
    <RouterView />
  </div>
</template>
