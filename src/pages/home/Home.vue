<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { checkPWA } from '../../shared/pwa';
import { useRouter } from 'vue-router';
import { swipeHandler } from '../../shared/lib/swipeHandler';

const isPWA = ref(false)
onMounted(() => {
  isPWA.value = checkPWA()
})

const router = useRouter()

const { onTouchStart, onTouchEnd } = swipeHandler({ onLeftSwipe: () => router.push('/about') })
</script>

<template>
  <h1>Home Page</h1>
  <div style="margin-top: 10px; margin-bottom: 10px;">
    <span v-if="isPWA">PWAとして閲覧しています。</span>
    <span v-else>ブラウザとして閲覧しています。</span>
  </div>
  
  <div @touchstart="onTouchStart" @touchend="onTouchEnd" style="height: 80px; width: full; padding: 20px 0 20px 0; background-color: whitesmoke;">
    スワイプするとAboutPageに遷移します
  </div>
</template>
