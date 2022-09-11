import { onMounted, onUnmounted } from 'vue'

/**
 * 设置一个定时器，并在 unmounted 的时候销毁
 *
 * @see window.setInterval
 */
export const useInterval = (handler: TimerHandler, timeout?: number, ...args: any[]): number => {
  const interval = window.setInterval(handler, timeout, ...args)
  onUnmounted(() => window.clearInterval(interval))
  return interval
}

/**
 * 在组件挂载后，为 target 元素添加一个事件，并在组件卸载时，移除
 *
 * @see EventTarget.addEventListener
 */
export const useEventListener = (
  target: EventTarget,
  type: string,
  callback: EventListenerOrEventListenerObject | null,
  options?: AddEventListenerOptions | boolean,
) => {
  onMounted(() => target.addEventListener(type, callback, options))
  onUnmounted(() => target.removeEventListener(type, callback, options))
}
