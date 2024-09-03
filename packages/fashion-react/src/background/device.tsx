import { ZDeviceElement } from "@zthun/fashion-boutique";

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ["z-device"]: ZDeviceElement<any> & any;
    }
  }
}
