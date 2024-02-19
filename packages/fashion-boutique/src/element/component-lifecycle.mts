export interface IZComponentConnected {
  connectedCallback(): void;
}

export interface IZComponentDisconnected {
  disconnectedCallback(): void;
}

export interface IZComponentAttributeChanged {
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}

export interface IZComponentAdopted {
  adoptedCallback(): void;
}
