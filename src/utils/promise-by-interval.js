export const promiseByInterval = async (callback, timeout) =>
  new Promise((resolve) => {
    const interval = setInterval(() => callback(interval, resolve), timeout);
  });
