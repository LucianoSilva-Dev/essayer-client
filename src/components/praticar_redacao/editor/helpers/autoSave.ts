export const createAutoSave = (
  fn: (txt: string, duracao: number) => Promise<void>,
  throttleDelay: number, // Acts as "maxWait"
  debounceDelay: number  // Acts as "wait"
) => {
  let timeoutId: NodeJS.Timeout | undefined;
  let lastArgs: [string, number] | undefined;
  let lastCallTime: number | undefined;
  let lastInvokeTime: number = 0;

  const invokeFunc = async (time: number) => {
    const args = lastArgs;
    const thisArg = undefined; // We don't need 'this' context here usually

    lastArgs = undefined;
    lastInvokeTime = time;

    if (args) {
      await fn(...args);
    }
  };

  const leadingEdge = (time: number) => {
    // Reset any existing timer
    lastInvokeTime = time;
    // Start the trailing edge timer
    timeoutId = setTimeout(timerExpired, debounceDelay);
  };

  const remainingWait = (time: number) => {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = debounceDelay - timeSinceLastCall;
    
    // Remaining time until maxWait (throttle) is reached
    const timeUntilMaxWait = throttleDelay - timeSinceLastInvoke;

    // Return the minimum of (debounce wait) and (throttle wait)
    // allowing the throttle to preempt the debounce if needed.
    return Math.min(timeWaiting, timeUntilMaxWait);
  };

  const shouldInvoke = (time: number) => {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;

    // Invoke if:
    // 1. First call (handled by leadingEdge actually, but logic holds)
    // 2. Debounce delay passed since last call
    // 3. MaxWait (throttle) passed since last invoke
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= debounceDelay ||
      timeSinceLastInvoke >= throttleDelay
    );
  };

  const timerExpired = async () => {
    const time = Date.now();
    if (shouldInvoke(time)) {
       return trailingEdge(time);
    }
    // Restart timer for remaining wait
    timeoutId = setTimeout(timerExpired, remainingWait(time));
  };

  const trailingEdge = async (time: number) => {
    timeoutId = undefined;
    
    // Only invoke if we have arguments (meaning a call happened)
    // and if we shouldn't have invoked already? 
    // Actually standard debounce invokes if there are args.
    if (lastArgs) {
        await invokeFunc(time);
    }
    
    // Reset args is handled in invokeFunc
  };

  return async (txt: string, duracao: number) => {
    const time = Date.now();
    lastArgs = [txt, duracao];
    lastCallTime = time;

    const isInvoking = shouldInvoke(time);

    if (isInvoking) {
      if (timeoutId === undefined) {
          // First call of the sequence
          return leadingEdge(time);
      }
      if (throttleDelay > 0) {
        // Handle maxWait edge case:
        // Reset timer to ensure we check again soon, 
        // effectively updating the "debounce" timer but respecting "maxWait"
        clearTimeout(timeoutId);
        timeoutId = setTimeout(timerExpired, remainingWait(time));
        
        // If we were supposed to invoke because of maxWait, we should invoke immediately?
        // Wait, standard debounce only invokes on trailing edge OR entry if leading=true.
        // Here we want "maxWait" behavior.
        
        // If enough time has passed since last INVOKE, we execute immediately (throttle behavior)
        // Check explicitly for maxWait condition
        if (time - lastInvokeTime >= throttleDelay) {
             return invokeFunc(time);
        }
      }
    }
    
    if (timeoutId === undefined) {
      timeoutId = setTimeout(timerExpired, debounceDelay);
    }
  };
};
