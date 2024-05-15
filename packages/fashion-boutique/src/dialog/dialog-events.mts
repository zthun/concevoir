/* istanbul ignore file -- @preserve */

import { ZCircusKeyboardQwerty } from '@zthun/cirque';

export function dispatchCloseEvent() {
  this?.dispatchEvent?.call(this, new Event('close'));
}

// Command line DOMs tend to not really handle the bounding client rect very well.
// So this is a manual test.  Just exclude from code coverage - we know this works.
export function closeOnBackdropClick(e: MouseEvent) {
  if (!(e.target instanceof HTMLDialogElement)) {
    return;
  }

  const r = this.getBoundingClientRect();

  const inside = r.top <= e.clientY && e.clientY <= r.bottom && r.left <= e.clientX && e.clientX <= r.right;

  if (!inside && !this.persistent) {
    this?.close?.call(this);
    dispatchCloseEvent.call(this);
  }
}

export function closeOnEscapeKey(e: KeyboardEvent) {
  if (e.code !== ZCircusKeyboardQwerty.escape.code) {
    return;
  }

  e.preventDefault();

  if (this.persistent) {
    return;
  }

  this?.close?.call(this);
  dispatchCloseEvent.call(this);
}
