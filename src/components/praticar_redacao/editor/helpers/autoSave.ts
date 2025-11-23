import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'

export const createAutoSave = (saveFn: (txt: string, duracao: number) => Promise<void>, debounceDelay: number, throttleDelay: number) => {
  // Dentro dessas funções, se não tiver o console.log elas não funcionam
  const throttledSave = throttle(async (t, d) => {console.log('throttle'); await saveFn(t, d)}, throttleDelay)
  const debouncedSave = debounce(async (t, d) => {console.log('debounce'); await saveFn(t, d)}, debounceDelay)

  return async function (txt: string, duracao: number) {
    await throttledSave(txt, duracao)
    await debouncedSave(txt, duracao)
  }
}