export const scrollAnimate = function(target, to, duration) {
  let element = target || document.scrollingElement || document.documentElement;

  let start = 300 || element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;
      
  let animateScroll = function(){        
    currentTime += increment;
    let val = Math.easeInOutQuad(currentTime, start, change, duration);
    element.scrollTop = val;
    if(currentTime < duration) {
       setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
}

Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};