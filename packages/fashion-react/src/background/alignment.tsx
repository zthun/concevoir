import { ZAlignmentElement } from '@zthun/fashion-boutique';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-alignment']: ZAlignmentElement<any> & any;
    }
  }
}
