export const checkPWA = (): boolean => {
  // window.matchMediaでスタンドアロンモードの確認
  const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;

  // iOSデバイスのためのチェック
  const isIOSStandalone = (window.navigator as any)?.standalone === true;

  // Androidアプリからのアクセスかどうかをチェック
  const isAndroidApp = document.referrer?.includes('android-app://');

  // いずれかの条件がtrueならPWAとして動作
  return isStandaloneMode || isIOSStandalone || isAndroidApp;
};