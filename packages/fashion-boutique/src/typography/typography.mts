import { IZComponentRender, ZAttribute, ZComponentShadow, nodePaint } from '@zthun/helpful-dom';
import { html } from '@zthun/helpful-fn';
import { IZComponentFont, ZUnit } from '../component/component-font.mjs';

@ZComponentShadow({ name: 'ZTypography' })
export class ZTypographyElement extends HTMLElement implements IZComponentFont, IZComponentRender {
  public static readonly observedAttributes = ['size', 'unit', 'family', 'number'];

  public static readonly PropertyFontSize = '--typography-font-size';
  public static readonly PropertyFontFamily = '--typography-font-family';

  public static readonly VariableFontSize = `var(${ZTypographyElement.PropertyFontSize}, 1em)`;
  public static readonly VariableFontFamily = `var(${ZTypographyElement.PropertyFontFamily}, Roboto, Arial, sans-serif)`;

  @ZAttribute({ type: 'number', fallback: 1 })
  public size: number;

  @ZAttribute({ fallback: 'em' })
  public unit: ZUnit;

  @ZAttribute({ fallback: 'Roboto,Arial,sans-serif' })
  public family: string;

  public render(node: Node) {
    const { style, size, unit, family } = this;
    const fontSize = `${size}${unit}`;

    style.setProperty(ZTypographyElement.PropertyFontSize, fontSize);
    style.setProperty(ZTypographyElement.PropertyFontFamily, family);

    nodePaint(node);
    nodePaint(node, { html: html`<slot></slot>` });
  }
}
