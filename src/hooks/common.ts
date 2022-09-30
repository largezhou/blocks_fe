import { ComponentInternalInstance } from 'vue'

/**
 * 设置一个定时器，并在 unmounted 的时候销毁
 *
 * @see window.setInterval
 */
export const useInterval = (
  ins: ComponentInternalInstance | null,
  handler: TimerHandler,
  timeout?: number,
  ...args: any[]
): number => {
  const interval = window.setInterval(handler, timeout, ...args)
  onUnmounted(() => window.clearInterval(interval), ins)
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

/**
 * 设置一个延迟执行，并在 unmounted 的时候销毁
 *
 * @see window.setTimeout
 */
export const useTimeout = (
  ins: ComponentInternalInstance | null,
  handler: TimerHandler,
  timeout?: number,
  ...args: any[]
): number => {
  const i = window.setTimeout(handler, timeout, ...args)
  onUnmounted(() => window.clearTimeout(i), ins)
  return i
}
