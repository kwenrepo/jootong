export const debounce = (callback, delay) => {
  if (timer.current) clearTimeout(timer.current);
  timer.current = setTimeout(() => {
    callback();
    timer.current = null;
  }, delay || 500);
};