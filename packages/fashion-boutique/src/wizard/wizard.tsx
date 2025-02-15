import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { ZOrientation, cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { useAmbassadorState } from "@zthun/helpful-react";
import { castArray } from "lodash-es";
import { ReactElement, ReactNode } from "react";
import { IZButton, ZButton } from "../button/button";
import { IZCard, ZCard } from "../card/card";
import { IZComponentName } from "../component/component-name.mjs";
import { IZComponentStyle } from "../component/component-style.mjs";
import { IZComponentValue } from "../component/component-value.mjs";
import { ZGrid } from "../grid/grid";
import { ZIconFontAwesome } from "../icon/icon-font-awesome";
import { ZStack } from "../stack/stack";
import { useFashionTheme } from "../theme/fashion.mjs";
import { ZH4 } from "../typography/typography";

export interface IZWizardPage {
  name?: string;
  description?: string;
  "data-name"?: string;
  "data-description"?: string;
  "data-next-disabled": boolean;
}

export interface IZWizard
  extends IZComponentStyle,
    IZComponentName,
    IZComponentValue<number> {
  children: ReactElement<IZWizardPage> | ReactElement<IZWizardPage>[];

  CardProps?: Omit<IZCard, "name" | "children" | "footer">;
  NextButtonProps?: Omit<IZButton, "name">;
  PrevButtonProps?: Omit<IZButton, "name">;
  FinishButtonProps?: Omit<IZButton, "name">;
}

export function ZWizard(props: IZWizard) {
  const {
    className,
    name,
    children,
    value,
    onValueChange,
    CardProps,
    NextButtonProps,
    PrevButtonProps,
    FinishButtonProps,
  } = props;

  const { primary, secondary, success } = useFashionTheme();
  const _children = castArray(children);
  const [page, setPage] = useAmbassadorState(value, onValueChange, 0);
  const _page = Math.min(_children.length - 1, Math.max(0, page));
  const _current = _children[_page];
  const _name = firstDefined(
    undefined,
    CardProps?.TitleProps?.heading,
    _current?.props.name,
    _current?.props["data-name"],
  );
  const _description = firstDefined(
    undefined,
    CardProps?.TitleProps?.subHeading,
    _current?.props.description,
    _current?.props["data-description"],
  );
  const _disabled = !!_current?.props["data-next-disabled"];

  const renderFooter = () => {
    const renderPrevious = () => {
      const _previous = _children[_page - 1];

      const defaultLabel = (
        <ZStack gap={ZSizeFixed.ExtraSmall}>
          <ZStack
            orientation={ZOrientation.Horizontal}
            gap={ZSizeFixed.Small}
            align={{ items: "center" }}
          >
            <ZIconFontAwesome name="left-long" />
            <ZH4 compact>
              {firstDefined(
                undefined,
                _previous?.props["name"],
                _previous?.props["data-name"],
              )}
            </ZH4>
          </ZStack>
        </ZStack>
      );

      const handlePrevious = () => {
        setPage(() => _page - 1);
      };

      return (
        <ZButton
          {...PrevButtonProps}
          label={firstDefined<ReactNode>(defaultLabel, PrevButtonProps?.label)}
          disabled={_page === 0 || PrevButtonProps?.disabled}
          onClick={PrevButtonProps?.onClick || handlePrevious}
          name="previous"
          fashion={secondary}
        />
      );
    };

    const renderNext = () => {
      const _next = _children[_page + 1];

      const defaultLabel = (
        <ZStack
          orientation={ZOrientation.Horizontal}
          gap={ZSizeFixed.Small}
          align={{ items: "center" }}
        >
          <ZH4 compact>
            {firstDefined(
              undefined,
              _next?.props["name"],
              _next?.props["data-name"],
            )}
          </ZH4>
          <ZIconFontAwesome name="right-long" />
        </ZStack>
      );

      const handleNext = () => {
        setPage((page) => page + 1);
      };

      return (
        <ZButton
          {...NextButtonProps}
          label={firstDefined<ReactNode>(defaultLabel, NextButtonProps?.label)}
          onClick={NextButtonProps?.onClick || handleNext}
          name="next"
          width={ZSizeVaried.Full}
          fashion={primary}
          disabled={_disabled}
        />
      );
    };

    const renderFinish = () => {
      return (
        <ZButton
          {...FinishButtonProps}
          label={firstDefined<ReactNode>(
            <ZIconFontAwesome name="circle-check" />,
            FinishButtonProps?.label,
          )}
          name="finish"
          width={ZSizeVaried.Full}
          fashion={success}
          disabled={_disabled}
        />
      );
    };

    const renderNextOrFinish = () => {
      const lastPage = _page === _children.length - 1;
      return lastPage ? renderFinish() : renderNext();
    };

    return (
      <ZGrid columns="1fr 1fr" gap={ZSizeFixed.Small} width={ZSizeVaried.Full}>
        {renderPrevious()}
        {renderNextOrFinish()}
      </ZGrid>
    );
  };

  return (
    <ZCard
      {...CardProps}
      className={cssJoinDefined(
        "ZWizard-root",
        CardProps?.className,
        className,
      )}
      TitleProps={{
        heading: _name,
        subHeading: _description,
      }}
      name={name}
      footer={renderFooter()}
      data-page={_page}
    >
      {_current}
    </ZCard>
  );
}
