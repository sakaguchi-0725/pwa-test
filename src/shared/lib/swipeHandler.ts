interface SwipeHandlerParams {
  onLeftSwipe?: () => void
  onRightSwipe?: () => void
}

export const swipeHandler = ({ onLeftSwipe, onRightSwipe }: SwipeHandlerParams) => {
  let startX = 0
  const SWIPE_THRESHOLD = 100

  const onTouchStart = (event: TouchEvent) => {
    startX = event.touches[0]?.clientX ?? 0
  }
  
  const onTouchEnd = (event: TouchEvent) => {
    const endX = event.changedTouches[0]?.clientX ?? 0
    const diffX = endX - startX
  
    if (Math.abs(diffX) > SWIPE_THRESHOLD) {
      if (diffX > 0 && onRightSwipe) { // 右方向にスワイプ
        onRightSwipe()
      } else if (diffX < 0 && onLeftSwipe) { // 左方向にスワイプ
        onLeftSwipe()
      }
    }
  }

  return {
    onTouchStart,
    onTouchEnd,
  }
}