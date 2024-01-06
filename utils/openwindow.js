export const openWindow = function(url,name,target) {
  const width = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;
  const height = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height;

  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const newWindow = window.open(
    url,
    "_blank",
    `width=${500},height=${700},left=${left},top=${top}`
  );
  
  newWindow?.focus();
  return newWindow;
};

