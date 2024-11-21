<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { checkPWA } from '../../shared/pwa';
import { useRouter } from 'vue-router';
import { swipeHandler } from '../../shared/lib/swipeHandler';
import { useRegisterSW } from 'virtual:pwa-register/vue';

const isPWA = ref(false)
onMounted(() => {
  isPWA.value = checkPWA()
})

const router = useRouter()

const { onTouchStart, onTouchEnd, onTouchMove } = swipeHandler({ onRightSwipe: () => router.push('/') })

const { needRefresh } = useRegisterSW()
</script>

<template>
  <h1>About Page</h1>
  <p v-if="needRefresh">リロードが必要です</p>
  <div style="margin-top: 10px; margin-bottom: 10px;">
    <span v-if="isPWA">PWAとして閲覧しています。</span>
    <span v-else>ブラウザとして閲覧しています。</span>
  </div>
  
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" style="height: 80px; width: full; padding: 20px 0 20px 0; background-color: whitesmoke;">
    スワイプするとHomePageに遷移します
  </div>
</template>