export interface IZComponentConnected {
  connectedCallback(): void;
}

export interface IZComponentDisconnected {
  disconnectedCallback(): void;
}

export interface IZComponentAttributeChanged {
  attributeChangedCallback(name, oldValue, newValue): void;
}

export interface IZComponentAdopted {
  adoptedCallback(): void;
}
