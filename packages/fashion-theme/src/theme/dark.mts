import { ZFashionBuilder } from '../fashion/fashion.mjs';
import { ZFashionThemeBuilder } from './fashion-theme.mjs';

function createPrimary() {
  return new ZFashionBuilder().namedPrimary().spectrum(0x90caf9).build();
}

function createSecondary() {
  return new ZFashionBuilder().namedSecondary().spectrum(0xce93d8).build();
}

function createSuccess() {
  return new ZFashionBuilder().namedSuccess().spectrum(0x66bb6a).build();
}

function createWarning() {
  return new ZFashionBuilder().namedWarning().spectrum(0xffa726).build();
}

function createError() {
  return new ZFashionBuilder().namedError().spectrum(0xb40300).build();
}

function createInfo() {
  return new ZFashionBuilder().namedInfo().spectrum(0x29b6f6).build();
}

function createDark() {
  return new ZFashionBuilder().namedDark().spectrum(0x212121).build();
}

function createLight() {
  return new ZFashionBuilder().namedLight().spectrum(0xfafafa).build();
}

function createBody() {
  return new ZFashionBuilder().namedBody().spectrum(0x212121).build();
}

function createSurface() {
  return new ZFashionBuilder().namedSurface().spectrum(0x333333).build();
}

function createComponent() {
  return new ZFashionBuilder().namedComponent().spectrum(0x5a5a5a).build();
}

function createOpposite() {
  return new ZFashionBuilder().copy(createLight()).namedOpposite().build();
}

export function createDarkTheme() {
  return new ZFashionThemeBuilder()
    .name('dark')
    .primary(createPrimary())
    .secondary(createSecondary())
    .success(createSuccess())
    .warning(createWarning())
    .error(createError())
    .info(createInfo())
    .dark(createDark())
    .light(createLight())
    .opposite(createOpposite())
    .body(createBody())
    .surface(createSurface())
    .component(createComponent())
    .build();
}
