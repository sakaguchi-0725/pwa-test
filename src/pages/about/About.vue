<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { checkPWA } from '../../shared/pwa';
import { useRouter } from 'vue-router';

const isPWA = ref(false)
onMounted(() => {
  isPWA.value = checkPWA()
})

const router = useRouter()

const startX = ref(0)
const isSwipedLeft = ref(false)
const isSwipedRight = ref(false)
const SWIPE_THRESHOLD = 100

const onTouchStart = (event: TouchEvent) => {
  startX.value = event.touches[0].clientX;
  isSwipedLeft.value = false;
  isSwipedRight.value = false;
}

const onTouchEnd = (event: TouchEvent) => {
  const endX = event.changedTouches[0].clientX
  const diffX = endX - startX.value

  if (Math.abs(diffX) > SWIPE_THRESHOLD) {
    if (diffX > 0) {
      isSwipedRight.value = true; // 右方向にスワイプ
      console.log('Right swipe detected');
      router.push('/')
    } else {
      isSwipedLeft.value = true; // 左方向にスワイプ
      console.log('Left swipe detected')
    }
  }
}
</script>

<template>
  <h1>About Page</h1>
  <div style="margin-top: 10px; margin-bottom: 10px;">
    <span v-if="isPWA">PWAとして閲覧しています。</span>
    <span v-else>ブラウザとして閲覧しています。</span>
  </div>
  
  <div @touchstart="onTouchStart" @touchend="onTouchEnd" style="height: 80px; width: full; padding: 20px 0 20px 0; background-color: whitesmoke;">
    スワイプするとHomePageに遷移します
  </div>
</template>