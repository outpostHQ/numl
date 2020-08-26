const isSafari =  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export function fixSafariInvisibleContents(el) {
  if (isSafari) {
    requestAnimationFrame(() => {
      el.style.display = 'block';
      requestAnimationFrame(() => {el.style.display = ''});
    });
  }
}
