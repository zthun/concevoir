import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { createMemoryHistory, MemoryHistory } from "history";
import React from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { ZTestRouter } from "../router/router-dom.mjs";
import { ZNotFound } from "./not-found";
import { ZNotFoundComponentModel } from "./not-found.cm.mjs";

describe("ZNotFound", () => {
  let home: string | undefined;
  let history: MemoryHistory;

  async function createTestTarget() {
    const element = (
      <ZTestRouter location={history.location} navigator={history}>
        <ZNotFound home={home} />
      </ZTestRouter>
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZNotFoundComponentModel);
  }

  beforeEach(() => {
    history = createMemoryHistory();
    home = undefined;
  });

  it("should route to the root path", async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    await target.returnHome();
    // Assert.
    expect(history.location.pathname).toEqual("/");
  });

  it("should route to the specified path", async () => {
    // Arrange.
    home = "/path/to/home";
    const target = await createTestTarget();
    // Act.
    await target.returnHome();
    // Assert.
    expect(history.location.pathname).toEqual(home);
  });
});
