import { hex } from '../color/hex';
import { black, white } from '../color/rgb';
import { ZFashionBuilder } from '../fashion/fashion';
import { ZFashionThemeBuilder } from './fashion-theme';

function createPrimary() {
  return new ZFashionBuilder()
    .name('Primary')
    .light(hex(0xe3f2fd))
    .main(hex(0x90caf9))
    .dark(hex(0x42a5f5))
    .contrast(black())
    .build();
}

function createSecondary() {
  return new ZFashionBuilder()
    .name('Secondary')
    .light(hex(0xf3eff5))
    .main(hex(0xce93d8))
    .dark(hex(0xab47bc))
    .contrast(black())
    .build();
}

function createSuccess() {
  return new ZFashionBuilder()
    .name('Success')
    .light(hex(0x81c784))
    .main(hex(0x66bb6a))
    .dark(hex(0x388e3c))
    .contrast(black())
    .build();
}

function createWarning() {
  return new ZFashionBuilder()
    .name('Warning')
    .light(hex(0x0ffb74d))
    .main(hex(0xffa726))
    .dark(hex(0xf57c00))
    .contrast(black())
    .build();
}

function createError() {
  return new ZFashionBuilder()
    .name('Error')
    .light(hex(0xe57373))
    .main(hex(0xf44336))
    .dark(hex(0xd32f2f))
    .contrast(white())
    .build();
}

function createInfo() {
  return new ZFashionBuilder()
    .name('Info')
    .light(hex(0x4fc3f7))
    .main(hex(0x29b6f6))
    .dark(hex(0x0288d1))
    .contrast(black())
    .build();
}

function createDark() {
  return new ZFashionBuilder()
    .name('Dark')
    .light(hex(0x424242))
    .main(hex(0x212121))
    .dark(black())
    .contrast(white())
    .build();
}

function createLight() {
  return new ZFashionBuilder()
    .name('Light')
    .main(hex(0xfafafa))
    .light(white())
    .dark(hex(0xf5f5f5))
    .contrast(black())
    .build();
}

function createBody() {
  return new ZFashionBuilder()
    .name('Body')
    .light(hex(0x424242))
    .main(hex(0x212121))
    .dark(black())
    .contrast(white())
    .build();
}

function createSurface() {
  return new ZFashionBuilder()
    .name('Surface')
    .light(hex(0x757575))
    .main(hex(0x515151))
    .dark(hex(0x212121))
    .contrast(white())
    .build();
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
    .body(createBody())
    .surface(createSurface())
    .build();
}
