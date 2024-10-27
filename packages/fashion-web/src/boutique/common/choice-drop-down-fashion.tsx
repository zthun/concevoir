import {
  IZComponentName,
  IZComponentValue,
  ZChoiceSelect,
} from "@zthun/fashion-boutique";
import {
  ZFashionArea,
  ZFashionContrast,
  ZFashionName,
  ZFashionPriority,
  ZFashionSeverity,
} from "@zthun/fashion-theme";
import { identity, startCase } from "lodash-es";

export interface IZChoiceDropDownFashion
  extends IZComponentValue<ZFashionName>,
    IZComponentName {}

/**
 * A drop down that allows the user to select a fashion from the theme.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns
 *        The jsx to render the component.
 */
export function ZChoiceDropDownFashion(props: IZChoiceDropDownFashion) {
  const { value, onValueChange, name } = props;
  const designs = [
    ...Object.values(ZFashionPriority),
    ...Object.values(ZFashionSeverity),
    ...Object.values(ZFashionArea),
    ...Object.values(ZFashionContrast),
  ];

  return (
    <ZChoiceSelect
      label="Fashion"
      value={value}
      onValueChange={onValueChange}
      options={designs}
      renderOption={startCase}
      identifier={identity}
      name={name}
    />
  );
}
