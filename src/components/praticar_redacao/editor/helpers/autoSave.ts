export const createAutoSave = (fn: (txt: string, duracao: number) => Promise<void>, throttleDelay: number, debounceDelay: number) => {
  let canLog = true
  let timeout: NodeJS.Timeout | undefined

  return async (txt: string, duracao: number) => {
    if (canLog) {
      console.log('throttle');
      await fn.apply(this, [txt, duracao])
      canLog = false
      setTimeout(() => {
        canLog = true
      }, throttleDelay)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(async () => {
      console.log('debounce');
      await fn.apply(this, [txt, duracao])
    }, debounceDelay)
  }
}
