<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'

onMounted(() => {
  const { updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      if (r) {
        r.update()
      }
    },
    onNeedRefresh() {
      alert('新しいバージョンがリリースされました。\n画面をリロードします')
      window.location.reload()
    }
  })
  updateServiceWorker()
})
</script>

<template>
  <h1>PWA Test APP</h1>
  <div>
    <RouterView />
  </div>
</template>
