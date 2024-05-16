export type ZPropertyLazyElementRequirements<T extends HTMLElement> = T;

export interface IZPropertyLazyElementOptions {
  selector?: string;
}

export function ZPropertyLazyElement<T extends HTMLElement, C extends ZPropertyLazyElementRequirements<T>>(
  name: string,
  options?: IZPropertyLazyElementOptions
): PropertyDecorator {
  return (target: C, propertyKey: string | symbol): void => {
    const { selector = name } = options || {};

    function get(this: HTMLElement) {
      const target = this.shadowRoot || this;

      let node = target.querySelector<T>(selector);

      if (node == null) {
        node = document.createElement(name) as T;
        target.appendChild(node);
      }

      return node;
    }

    Object.defineProperty(target, propertyKey, { get });
  };
}
