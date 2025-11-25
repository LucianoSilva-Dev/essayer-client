import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'

export const createAutoSave = (saveFn: (txt: string, duracao: number) => Promise<void>, debounceDelay: number, throttleDelay: number) => {
  const throttledSave = throttle(saveFn, throttleDelay)
  const debouncedSave = debounce(saveFn, debounceDelay)

  return async function (txt: string, duracao: number) {
    await throttledSave(txt, duracao)
    await debouncedSave(txt, duracao)
  }
}