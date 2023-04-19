export function chunk<T>(
  totalSize: number,
  chunkSize: number,
  fn: (a: T, chunkStart: number, chunkEnd: number) => T | true,
  initialAcc: T
) {
  /* Create a promise chain starting with our initial accumulator */
  let promise = Promise.resolve(initialAcc)

  let chunkHead = 0
  let isContinue = true

  while (chunkHead < totalSize && isContinue) {
    const chunkStart = chunkHead
    const chunkEnd = chunkStart + chunkSize

    /* Chain the chunk's promise on setTimeout */
    promise = promise.then(
      (resultAcc) =>
        new Promise((resolve) => {
          window.setTimeout(() => {
            /* Wrap the result in a promise so that we can safely receive a promise or a value */
            Promise.resolve(fn(resultAcc, chunkStart, chunkEnd)).then((ret) => {
              if (ret === true) {
                isContinue = false
                resolve(resultAcc)
              } else {
                resolve(ret)
              }
            })
          })
        })
    )

    chunkHead = chunkEnd
  }

  return promise
}
