export interface IZComponentOpen<TPayload = never> {
  open(payload?: TPayload): Promise<void>;
}
