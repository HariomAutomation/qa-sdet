/**
 * Method decorator to log test steps.
 */
export function Step(stepName?: string) {
  return function (
    _target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const name = stepName || propertyKey;
      console.log(`\n📌 [STEP START] ${name} with args:`, JSON.stringify(args));
      const startTime = Date.now();
      try {
        const result = await originalMethod.apply(this, args);
        console.log(`✔ [STEP END] ${name} completed in ${Date.now() - startTime}ms`);
        return result;
      } catch (error: any) {
        console.error(`✖ [STEP FAILED] ${name}: ${error?.message}`);
        throw error;
      }
    };

    return descriptor;
  };
}

/**
 * Method decorator to auto-retry an async operation upon failure.
 */
export function Retry(maxAttempts: number = 3, delayMs: number = 200) {
  return function (
    _target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let lastError: any;
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          lastError = error;
          console.warn(
            `⚠ [RETRY] ${propertyKey} attempt ${attempt}/${maxAttempts} failed. Waiting ${delayMs}ms...`
          );
          if (attempt < maxAttempts) {
            await new Promise((res) => setTimeout(res, delayMs));
          }
        }
      }
      throw lastError;
    };

    return descriptor;
  };
}

/**
 * Method decorator to enforce maximum timeout on a test action.
 */
export function Timeout(timeoutMs: number) {
  return function (
    _target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const timer = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Method '${propertyKey}' exceeded timeout of ${timeoutMs}ms`));
        }, timeoutMs);
      });

      return Promise.race([originalMethod.apply(this, args), timer]);
    };

    return descriptor;
  };
}
