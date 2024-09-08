import { IZCircusKey, ZCircusBy, ZCircusKeyboardQwerty } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ReactNode } from "react";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { ZTextArea } from "./text-area";
import { ZTextInput, ZTextType } from "./text-input";
import { ZTextInputReveal } from "./text-input-reveal";
import { ZTextComponentModel } from "./text.cm.mjs";

// cspell: disable-next-line
const LOREM = "Purus gravida quis blandit turpis cursus in hac habitasse.";

describe("ZText", () => {
  let prefix: ReactNode | undefined;
  let suffix: ReactNode | undefined;
  let disabled: boolean | undefined;
  let readOnly: boolean | undefined;
  let required: boolean | undefined;
  let value: string | undefined;
  let label: ReactNode | undefined;
  let onValueChange: Mock | undefined;

  beforeEach(() => {
    value = undefined;
    onValueChange = undefined;

    disabled = undefined;
    readOnly = undefined;
    required = undefined;

    prefix = undefined;
    suffix = undefined;

    label = undefined;
  });

  const shouldRenderTextValue = async (
    createTestTarget: () => Promise<ZTextComponentModel>,
  ) => {
    // Arrange
    value = "My Value";
    const target = await createTestTarget();
    // Act
    const actual = await target.value();
    // Assert
    expect(actual).toEqual(value);
  };

  const shouldUpdateTextValue = async (
    createTestTarget: () => Promise<ZTextComponentModel>,
  ) => {
    // Arrange
    const target = await createTestTarget();
    // Act
    await target.keyboard(LOREM);
    await target.clear();
    await target.keyboard(LOREM);
    await target.clear(ZCircusKeyboardQwerty.enter);
    await target.keyboard(LOREM);
    const actual = await target.value();
    // Assert
    expect(actual).toEqual(LOREM);
  };

  const shouldRaiseOnValueChange = async (
    createTestTarget: () => Promise<ZTextComponentModel>,
    commit?: IZCircusKey,
  ) => {
    // Arrange
    onValueChange = vi.fn();
    const target = await createTestTarget();
    // Act
    await target.keyboard(LOREM, commit);
    // Assert
    expect(onValueChange).toHaveBeenCalledWith(LOREM);
  };

  const shouldNotRaiseOnValueChange = async (
    createTestTarget: () => Promise<ZTextComponentModel>,
    commit = ZCircusKeyboardQwerty.altLeft,
  ) => {
    // Arrange
    onValueChange = vi.fn();
    const target = await createTestTarget();
    // Act
    await target.keyboard("No commit", commit);
    // Assert
    expect(onValueChange).not.toHaveBeenCalled();
  };

  const shouldNotRaiseOnValueChangeIfActualValueIsTheSame = async (
    createTestTarget: () => Promise<ZTextComponentModel>,
  ) => {
    // Arrange
    onValueChange = vi.fn();
    const target = await createTestTarget();
    // Act
    await target.clear();
    await target.clear();
    // Assert.
    expect(onValueChange).not.toHaveBeenCalled();
  };

  const shouldBeDisabled = async (
    createTestTarget: () => Promise<ZTextComponentModel>,
  ) => {
    // Arrange
    disabled = true;
    const target = await createTestTarget();
    // Act
    const actual = await target.disabled();
    // Assert
    expect(actual).toBeTruthy();
  };

  const shouldBeReadOnly = async (
    createTestTarget: () => Promise<ZTextComponentModel>,
  ) => {
    // Arrange
    readOnly = true;
    const target = await createTestTarget();
    // Act
    const actual = await target.readOnly();
    // Assert
    expect(actual).toBeTruthy();
  };

  const shouldBeMasked = async (
    expected: boolean,
    createTestTarget: () => Promise<ZTextComponentModel>,
  ) => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = await target.masked();
    // Assert
    expect(actual).toEqual(expected);
  };

  const shouldBeRequired = async (
    createTestTarget: () => Promise<ZTextComponentModel>,
  ) => {
    // Arrange
    label = "Required Text Component";
    required = true;
    const target = await createTestTarget();
    // Act
    const actual = await (await target.label())?.required();
    // Assert
    expect(actual).toBeTruthy();
  };

  const shouldRenderPrefix = async (
    createTestTarget: () => Promise<ZTextComponentModel>,
  ) => {
    // Arrange
    const expected = "ZText-prefix-content";
    prefix = <div className={expected}>Prefix</div>;
    const target = await createTestTarget();
    // Act
    const actual = await (await target.prefix())?.select(`.${expected}`);
    // Assert
    expect(actual).toBeTruthy();
  };

  const shouldRenderSuffix = async (
    createTestTarget: () => Promise<ZTextComponentModel>,
  ) => {
    // Arrange
    const expected = "ZText-suffix-content";
    suffix = <div className={expected}>Suffix</div>;
    const target = await createTestTarget();
    // Act
    const actual = await (await target.suffix())?.select(`.${expected}`);
    // Assert
    expect(actual).toBeTruthy();
  };

  const shouldRenderNoAdornments = async (
    createTestTarget: () => Promise<ZTextComponentModel>,
  ) => {
    // Arrange
    prefix = null;
    suffix = null;
    const target = await createTestTarget();
    // Act
    const _prefix = await target.prefix();
    const _suffix = await target.suffix();
    // Assert
    expect(_prefix || _suffix).toBeFalsy();
  };

  describe("Input", () => {
    async function createTestTarget(type?: ZTextType) {
      const element = (
        <ZTextInput
          label={label}
          type={type}
          value={value}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          prefix={prefix}
          suffix={suffix}
          onValueChange={onValueChange}
        />
      );
      const driver = await new ZCircusSetupRenderer(element).setup();
      return ZCircusBy.first(driver, ZTextComponentModel);
    }

    it("should render the text value", async () => {
      await shouldRenderTextValue(createTestTarget);
    });

    it("should update the value when the user types", async () => {
      await shouldUpdateTextValue(createTestTarget);
    });

    it("should raise the onValueChange event when the user types a value and commits with tab", async () => {
      await shouldRaiseOnValueChange(createTestTarget);
    });

    it("should raise the onValueChange event when the user types a value and commits with enter", async () => {
      await shouldRaiseOnValueChange(
        createTestTarget,
        ZCircusKeyboardQwerty.enter,
      );
    });

    it("should not raise the onValueChange until the user commits the value", async () => {
      await shouldNotRaiseOnValueChange(createTestTarget);
    });

    it("should not raise the onValueChange if the user commits when the value is the same", async () => {
      await shouldNotRaiseOnValueChangeIfActualValueIsTheSame(createTestTarget);
    });

    it("should be disabled", async () => {
      await shouldBeDisabled(createTestTarget);
    });

    it("should be readOnly", async () => {
      await shouldBeReadOnly(createTestTarget);
    });

    it("should be required", async () => {
      await shouldBeRequired(createTestTarget);
    });

    it("should render the prefix adornment", async () => {
      await shouldRenderPrefix(createTestTarget);
    });

    it("should render the suffix adornment", async () => {
      await shouldRenderSuffix(createTestTarget);
    });

    it("should render no adornments when not specified", async () => {
      await shouldRenderNoAdornments(createTestTarget);
    });

    it("should have revealed text for a text type", async () => {
      await shouldBeMasked(false, createTestTarget.bind(null, ZTextType.Text));
    });

    it("should have masked text for a password type", async () => {
      await shouldBeMasked(
        true,
        createTestTarget.bind(null, ZTextType.Password),
      );
    });

    it("should not be able to toggle revealed text", async () => {
      // Arrange.
      const target = await createTestTarget(ZTextType.Text);
      await target.reveal();
      // Act.
      const actual = await target.mask();
      // Assert.
      expect(actual).toBeFalsy();
    });

    it("should not be able to toggle masked text", async () => {
      // Arrange.
      const target = await createTestTarget(ZTextType.Password);
      await target.mask();
      // Act.
      const actual = await target.reveal();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe("Reveal", () => {
    async function createTestTarget() {
      const element = (
        <ZTextInputReveal
          value={value}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          prefix={prefix}
          suffix={suffix}
          label={label}
          onValueChange={onValueChange}
        />
      );
      const driver = await new ZCircusSetupRenderer(element).setup();
      return ZCircusBy.first(driver, ZTextComponentModel);
    }

    it("should render the text value", async () => {
      await shouldRenderTextValue(createTestTarget);
    });

    it("should update the value as the user types", async () => {
      await shouldUpdateTextValue(createTestTarget);
    });

    it("should raise the onValueChange event when the user types a value and commits with tab", async () => {
      await shouldRaiseOnValueChange(createTestTarget);
    });

    it("should raise the onValueChange event when the user types a value and commits with enter", async () => {
      await shouldRaiseOnValueChange(
        createTestTarget,
        ZCircusKeyboardQwerty.enter,
      );
    });

    it("should not raise the onValueChange until the user commits the value", async () => {
      await shouldNotRaiseOnValueChange(createTestTarget);
    });

    it("should not raise the onValueChange if the user commits when the value is the same", async () => {
      await shouldNotRaiseOnValueChangeIfActualValueIsTheSame(createTestTarget);
    });

    it("should be disabled", async () => {
      await shouldBeDisabled(createTestTarget);
    });

    it("should be readOnly", async () => {
      await shouldBeReadOnly(createTestTarget);
    });

    it("should be required", async () => {
      await shouldBeRequired(createTestTarget);
    });

    it("should start as masked", async () => {
      await shouldBeMasked(true, createTestTarget);
    });

    it("should render the prefix adornment", async () => {
      await shouldRenderPrefix(createTestTarget);
    });

    it("should render the suffix adornment", async () => {
      await shouldRenderSuffix(createTestTarget);
    });

    it("should toggle the text from masked to revealed", async () => {
      // Arrange
      const target = await createTestTarget();
      await target.mask();
      // Act
      const actual = await target.reveal();
      // Assert
      expect(actual).toBeTruthy();
    });

    it("should toggle the text from revealed to masked", async () => {
      // Arrange
      const target = await createTestTarget();
      await target.reveal();
      // Act
      const actual = await target.mask();
      // Assert
      expect(actual).toBeTruthy();
    });
  });

  describe("Area", () => {
    async function createTestTarget() {
      const element = (
        <ZTextArea
          value={value}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          label={label}
          prefix={prefix}
          suffix={suffix}
          onValueChange={onValueChange}
        />
      );

      const driver = await new ZCircusSetupRenderer(element).setup();
      return ZCircusBy.first(driver, ZTextComponentModel);
    }

    it("should render the text value", async () => {
      await shouldRenderTextValue(createTestTarget);
    });

    it("should render a multi line text value", async () => {
      // Arrange
      const target = await createTestTarget();
      const paragraphs = [LOREM, LOREM, LOREM];
      const expected = paragraphs.join("\n\n").concat("\n\n");
      // Act
      const actual = await target.essay(paragraphs);
      // Assert
      expect(actual).toEqual(expected);
    });

    it("should raise the onValueChange event when the user types a value and commits with tab", async () => {
      await shouldRaiseOnValueChange(createTestTarget);
    });

    it("should not raise the onValueChange event when the user types a value and commits with enter", async () => {
      await shouldNotRaiseOnValueChange(
        createTestTarget,
        ZCircusKeyboardQwerty.enter,
      );
    });

    it("should not raise the onValueChange until the user commits the value", async () => {
      await shouldNotRaiseOnValueChange(createTestTarget);
    });

    it("should raise the onValueChange event when the user types a value", async () => {
      await shouldRaiseOnValueChange(createTestTarget);
    });

    it("should not raise the onValueChange if the user commits when the value is the same", async () => {
      await shouldNotRaiseOnValueChangeIfActualValueIsTheSame(createTestTarget);
    });

    it("should be disabled", async () => {
      await shouldBeDisabled(createTestTarget);
    });

    it("should be readOnly", async () => {
      await shouldBeReadOnly(createTestTarget);
    });

    it("should be required", async () => {
      await shouldBeRequired(createTestTarget);
    });

    it("should render the prefix adornment", async () => {
      await shouldRenderPrefix(createTestTarget);
    });

    it("should render the suffix adornment", async () => {
      await shouldRenderSuffix(createTestTarget);
    });

    it("should render no adornments when not specified", async () => {
      await shouldRenderNoAdornments(createTestTarget);
    });

    it("should not have masked text", async () => {
      await shouldBeMasked(false, createTestTarget);
    });
  });
});
