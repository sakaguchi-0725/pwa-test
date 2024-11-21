<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { checkPWA } from '../../shared/pwa';
import { useRouter } from 'vue-router';
import { swipeHandler } from '../../shared/lib/swipeHandler';
import { useRegisterSW } from 'virtual:pwa-register/vue';

const isPWA = ref(false)
onMounted(() => {
  isPWA.value = checkPWA()
})

const router = useRouter()

const { onTouchStart, onTouchEnd, onTouchMove } = swipeHandler({ onLeftSwipe: () => router.push('/about') })

const deferredPrompt = ref<Event | null>(null);
const ready = ref(false);

const beforeInstallPromptHandler = (event: Event) => {
  event.preventDefault(); // デフォルトのプロンプトをキャンセル
  deferredPrompt.value = event; // イベントを保存
  ready.value = true; // ボタンを有効にする
};

onMounted(() => {
  window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);
});

onUnmounted(() => {
  window.removeEventListener("beforeinstallprompt", beforeInstallPromptHandler);
});

const handleClickInstall = async () => {
  if (deferredPrompt.value) {
    (deferredPrompt.value as any).prompt(); // プロンプトを表示
    deferredPrompt.value = null; // リセット
    ready.value = false; // ボタンを無効にする
  }
};

const onClickVibration = () => {
  if (navigator.vibrate) {
    // 200ms振動 → 100ms停止
    navigator.vibrate([200, 100, 200, 100, 200])
    console.log('バイブレーションを実行します')
  } else {
    console.log('バイブレーションはサポートされていません')
  }
}

const { needRefresh } = useRegisterSW()
</script>

<template>
  <h1>Home Page</h1>
  <p v-if="needRefresh">リロードが必要です</p>
  <div style="margin-top: 10px; margin-bottom: 10px;">
    <span v-if="isPWA">PWAとして閲覧しています。</span>
    <span v-else>ブラウザとして閲覧しています。</span>
  </div>
  
  <div @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" style="height: 80px; width: full; padding: 20px 0 20px 0; background-color: whitesmoke;">
    スワイプするとAboutPageに遷移します
  </div>

  <button v-if="!isPWA" @click="handleClickInstall">
    PWAインストール
  </button>

  <button type="button" @click="onClickVibration">
    バイブレーション検討ボタン
  </button>
</template>
