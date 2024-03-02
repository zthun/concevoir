/**
 * Removes all children from a shadow root.
 *
 * @param shadow -
 *        The shadow root to clear.
 */
export function clearShadow(shadow: ShadowRoot) {
  while (shadow.firstChild) {
    shadow.firstChild.remove();
  }
}

/**
 * Paints css styles and html to a shadow root.
 *
 * @param css -
 *        The css styles to apply.
 * @param html -
 *        The html template to paint.
 */
export function paintShadow(shadow: ShadowRoot, css: string, html: string) {
  const style = document.createElement('style');
  style.textContent = css;

  const template = document.createElement('template');
  template.innerHTML = html;

  clearShadow(shadow);
  shadow.appendChild(style);
  shadow.appendChild(template.content.cloneNode(true));
}
