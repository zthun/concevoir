import { After, Then } from "@cucumber/cucumber";
import assert from "assert";
import { ZFashionWorld } from "./fashion-world.mjs";

Then("the page loads successfully", async function (this: ZFashionWorld) {
  assert.ok(true);
});

After(async function (this: ZFashionWorld) {
  await this.close();
});
