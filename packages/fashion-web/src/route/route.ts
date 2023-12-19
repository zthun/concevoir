/**
 * Represents a potential api option path or a ui routed path.
 */
export interface IZRoute {
  /**
   * The full path.
   */
  path: string;

  /**
   * The display name of the route.
   */
  name?: string;

  /**
   * General description of the route content.
   */
  description?: string;

  /**
   * An avatar representation of the route.
   *
   * This can be anything you want and it's
   * meaning is based on the context of where it
   * is consumed.
   */
  avatar?: any;

  /**
   * Font family if the avatar represents a known font.
   */
  family?: 'brands' | 'classic' | 'sharp';
}

/**
 * Represents a builder for an api option.
 */
export class ZRouteBuilder {
  private _route: IZRoute;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._route = {
      path: ''
    };
  }

  /**
   * Specifies the route path.
   *
   * @param path -
   *        The route path.
   *
   * @returns
   *        This object.
   */
  public path(path: string): this {
    this._route.path = path;
    return this;
  }

  /**
   * Sets the display name of the route.
   *
   * @param name -
   *        The name.
   *
   * @returns
   *        This object.
   */
  public name(name: string): this {
    this._route.name = name;
    return this;
  }

  /**
   * Sets the description of the route.
   *
   * @param description -
   *        The route description.
   *
   * @returns
   *        This object.
   */
  public description(description: string): this {
    this._route.description = description;
    return this;
  }

  /**
   * Sets the avatar of the route.
   *
   * @param avatar -
   *        The avatar.
   *
   * @returns
   *        This object.
   */
  public avatar(avatar: any): this {
    this._route.avatar = avatar;
    return this;
  }

  /**
   * Sets the font family.
   *
   * @param family -
   *        The font family
   *
   * @returns
   *        This object.
   */
  public family(family: 'brands' | 'classic' | 'sharp'): this {
    this._route.family = family;
    return this;
  }

  /**
   * Copies another route option to this object.
   *
   * @param other -
   *        The route option to copy.
   *
   * @returns
   *        This object.
   */
  public copy(other: IZRoute): this {
    this._route = { ...other };
    return this;
  }

  /**
   * Returns the route option.
   *
   * @returns
   *      A shallow copy of the built route object.
   */
  public build(): IZRoute {
    return { ...this._route };
  }
}
