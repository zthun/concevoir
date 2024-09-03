import { IZCircusDriver } from "@zthun/cirque";
import { ZSuspenseComponentModel } from "@zthun/fashion-circus";
import { ZSuspenseRotate } from "./suspense-rotate";

import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import React from "react";
import { describe, expect, it } from "vitest";
import { ZSuspenseProgress } from "./suspense-progress";

describe("ZSuspense", () => {
  async function shouldDisplayWhenThereIsSuspense(
    createTestTarget: () => Promise<IZCircusDriver>,
  ) {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await ZSuspenseComponentModel.loading(target);
    // Assert.
    expect(actual).toBeTruthy();
  }

  async function shouldHideWhenThereIsNoSuspense(
    createTestTarget: (loading: boolean) => Promise<IZCircusDriver>,
  ) {
    // Arrange.
    const target = await createTestTarget(false);
    // Act.
    const actual = await ZSuspenseComponentModel.loading(target);
    // Assert.
    expect(actual).toBeFalsy();
  }

  async function shouldWaitToLoad(
    createTestTarget: (
      loading: boolean,
      name: string,
    ) => Promise<IZCircusDriver>,
  ) {
    // Arrange.
    const name = "test-suspense";
    const target = await createTestTarget(false, name);
    // Act.
    await ZSuspenseComponentModel.load(target, name);
    const actual = await ZSuspenseComponentModel.loading(target, name);
    // Assert.
    expect(actual).toBeFalsy();
  }

  describe("Rotate", () => {
    function createTestTarget(loading?: boolean) {
      const element = <ZSuspenseRotate loading={loading} />;
      return new ZCircusSetupRenderer(element).setup();
    }

    function createNamedTargets(loading?: boolean, name?: string) {
      const element = (
        <>
          <ZSuspenseRotate />
          <ZSuspenseRotate loading={loading} name={name} />
          <ZSuspenseRotate />
        </>
      );

      return new ZCircusSetupRenderer(element).setup();
    }

    it("should display when the suspense is loading", async () => {
      await shouldDisplayWhenThereIsSuspense(createTestTarget);
    });

    it("should hide when the suspense is not loading", async () => {
      await shouldHideWhenThereIsNoSuspense(createTestTarget);
    });

    it("should wait for load", async () => {
      await shouldWaitToLoad(createNamedTargets);
    });
  });

  describe("Progress", () => {
    function createTestTarget(loading?: boolean) {
      const element = <ZSuspenseProgress loading={loading} />;
      return new ZCircusSetupRenderer(element).setup();
    }

    function createNamedTargets(loading?: boolean, name?: string) {
      const element = (
        <>
          <ZSuspenseProgress />
          <ZSuspenseProgress loading={loading} name={name} />
          <ZSuspenseProgress />
        </>
      );

      return new ZCircusSetupRenderer(element).setup();
    }

    it("should display when the suspense is loading", async () => {
      await shouldDisplayWhenThereIsSuspense(createTestTarget);
    });

    it("should hide when the suspense is not loading", async () => {
      await shouldHideWhenThereIsNoSuspense(createTestTarget);
    });

    it("should wait for load", async () => {
      await shouldWaitToLoad(createNamedTargets);
    });
  });
});
