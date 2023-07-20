import { ZFashionBuilder } from '../fashion/fashion';
import { ZFashionThemeBuilder } from './fashion-theme';

function createPrimary() {
  return new ZFashionBuilder().name('Primary').spectrum(0x90caf9).build();
}

function createSecondary() {
  return new ZFashionBuilder().name('Secondary').spectrum(0xce93d8).build();
}

function createSuccess() {
  return new ZFashionBuilder().name('Success').spectrum(0x66bb6a).build();
}

function createWarning() {
  return new ZFashionBuilder().name('Warning').spectrum(0xffa726).build();
}

function createError() {
  return new ZFashionBuilder().name('Error').spectrum(0xb40300).build();
}

function createInfo() {
  return new ZFashionBuilder().name('Info').spectrum(0x29b6f6).build();
}

function createDark() {
  return new ZFashionBuilder().name('Dark').spectrum(0x212121).build();
}

function createLight() {
  return new ZFashionBuilder().name('Light').spectrum(0xfafafa).build();
}

function createBody() {
  return new ZFashionBuilder().name('Body').spectrum(0x212121).build();
}

function createSurface() {
  return new ZFashionBuilder().name('Surface').spectrum(0x333333).build();
}

function createComponent() {
  return new ZFashionBuilder().name('Component').spectrum(0x5a5a5a).build();
}

function createOpposite() {
  return new ZFashionBuilder().copy(createLight()).name('Opposite').build();
}

export function createDarkTheme() {
  return new ZFashionThemeBuilder()
    .name('Dark')
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
