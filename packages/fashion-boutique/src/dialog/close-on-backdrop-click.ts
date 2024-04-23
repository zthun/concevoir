/* istanbul ignore file -- @preserve */

// Command line DOMs tend to not really handle the bounding client rect very well.
// So this is a manual test.  Just exclude from code coverage - we know this works.
export function closeOnBackdropClick(e: MouseEvent) {
  const r = this.getBoundingClientRect();

  const inside =
    r.top <= e.clientY && e.clientY <= r.top + r.height && r.left <= e.clientX && e.clientX <= r.left + r.width;

  if (!inside) {
    this?.close();
  }
}
