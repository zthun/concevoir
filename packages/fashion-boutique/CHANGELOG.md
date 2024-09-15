# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.0.1](https://github.com/zthun/fashion/compare/v6.0.0...v6.0.1) (2024-09-15)


### Reverts

* min-width for icon ([2bcc14c](https://github.com/zthun/fashion/commit/2bcc14cfea22ea023b1d75d2dd3a661261431fc9))



## [6.0.0](https://github.com/zthun/fashion/compare/v5.0.0...v6.0.0) (2024-09-15)


### ⚠ BREAKING CHANGES

* list line item has been consolidated into list item
* list group has been consolidated into list item
* list divider is now simply divider

### Features

* list group has been consolidated into list item ([f036e1e](https://github.com/zthun/fashion/commit/f036e1e535d5d1548f76ce50d99988e895936786))
* list item is now the sole child of a list component ([471c55e](https://github.com/zthun/fashion/commit/471c55e265ead1730150797bad7fac2b7e41dbe6))
* list line item has been consolidated into list item ([a67885a](https://github.com/zthun/fashion/commit/a67885afe2f3ec8f136a6cdfe64e8d57227b1cba))


### Bug Fixes

* icon now has a min width that matches the icon font size ([fd7cffe](https://github.com/zthun/fashion/commit/fd7cffe96752edb9c5f47592cb18130be83a1c64))


### Code Refactoring

* list divider is now simply divider ([8ba8fa7](https://github.com/zthun/fashion/commit/8ba8fa723e31098b91a1f90e2daeb265cc810cc3))



## [5.0.0](https://github.com/zthun/fashion/compare/v4.0.0...v5.0.0) (2024-09-14)


### ⚠ BREAKING CHANGES

* overline is now button text
* banner main avatar, prefix, and suffix have been collapsed into TitleProps
* card heading, subHeading, and avatar have been extracted into TitleProps
* text color has been removed
* card no longer supports an internal loading state
* button no longer supports an internal loading state
* suspense component model no longer supports width or height
* suspense progress no longer uses mui
* suspense loading has been renamed to disabled

### Features

* component footer adds footer support to a component ([2025daa](https://github.com/zthun/fashion/commit/2025daabb8af34b6b774d8d622b61156868e0e00))
* content title adds a standard for how to display horizontal title content ([8b3889f](https://github.com/zthun/fashion/commit/8b3889f8f65983b8c49b5d31740d22b3d7177ecd))
* flex allows for grow and shrink in a flex supported container ([aac7009](https://github.com/zthun/fashion/commit/aac70091c63d900a14dc30f5058ed7ec9b66aaa2))
* font awesome can now have animations ([c4f9473](https://github.com/zthun/fashion/commit/c4f9473404642d9a9788f2b3a31e18bdc630b68b))
* stack now supports passing data attributes ([e777d3a](https://github.com/zthun/fashion/commit/e777d3acd52bd0b18de882c847b72b78b7fc70ed))
* stack now supports wrap ([30b0d76](https://github.com/zthun/fashion/commit/30b0d76dec06e13a2fab3fa0ac848f0e2222fd16))
* suspense component model no longer supports width or height ([0515063](https://github.com/zthun/fashion/commit/05150639191ac67404c11ec5076cb52f7fa03ce3))
* text color has been removed ([30ec464](https://github.com/zthun/fashion/commit/30ec4646c9f3b3acc0e354c5f2d1fec530d5beef))


### Bug Fixes

* auto box now properly scales to the content ([9f77734](https://github.com/zthun/fashion/commit/9f77734837e294b685d39646ca69ef4a353a7523))
* box now defaults to full width to support old bug ([e1494ba](https://github.com/zthun/fashion/commit/e1494bab8da07c38d299a01376a6cbdf6e5837d7))
* icon sizes ([c3707cc](https://github.com/zthun/fashion/commit/c3707ccc2acdf4484841df0babf9e6bb988791d2))


### Code Refactoring

* banner main avatar, prefix, and suffix have been collapsed into TitleProps ([6b8be3b](https://github.com/zthun/fashion/commit/6b8be3b60c2ba01e6e74ba4eb1923111ed38e392))
* button no longer supports an internal loading state ([7875e64](https://github.com/zthun/fashion/commit/7875e64f64820ee64bf415e26e0ac88eaab9f66a))
* card heading, subHeading, and avatar have been extracted into TitleProps ([0357f54](https://github.com/zthun/fashion/commit/0357f542a95a6886ccdbf81a86e8840b5d5499c0))
* card no longer supports an internal loading state ([be65ca1](https://github.com/zthun/fashion/commit/be65ca11faffd15a7f5d3498644531d0496fe741))
* overline is now button text ([a218611](https://github.com/zthun/fashion/commit/a218611fc0b0828b9630ea3e4d10a247fe019dfa))
* suspense loading has been renamed to disabled ([3522105](https://github.com/zthun/fashion/commit/3522105ab290a12d1247f8eebbfbafda9f25cf1b))
* suspense progress no longer uses mui ([40da57a](https://github.com/zthun/fashion/commit/40da57ad3f21ec23287a211b49616ae8e73a77d3))



## [4.0.0](https://github.com/zthun/fashion/compare/v3.2.3...v4.0.0) (2024-09-12)


### ⚠ BREAKING CHANGES

* breadcrumbs onClick is not onPathSelected
* line item is no longer supported
* stack align and justify now support align-content and justify-items
* pagination component is no longer supported
* popup now uses an html dialog element instead of mui
* popup component model has been replaced by dialog component model
* drawer now uses an html dialog instead of mui
* modal has been converted to use an html dialog instead of a mui modal

### Features

* breadcrumbs onClick is not onPathSelected ([166973d](https://github.com/zthun/fashion/commit/166973d2c751c995c518667d86dd7bd51af12693))
* line item is no longer supported ([83b609c](https://github.com/zthun/fashion/commit/83b609c1d29f34f9225c79211a84fb69aaad7e69))
* modal has been converted to use an html dialog instead of a mui modal ([2509355](https://github.com/zthun/fashion/commit/25093554f5dd1e40c0ef97b72442ab25eaf1f179))
* pagination component is no longer supported ([1e2529c](https://github.com/zthun/fashion/commit/1e2529c6d95cf20b78a55edb963a909eb0fb14e8))


### Code Refactoring

* drawer now uses an html dialog instead of mui ([8ecfa0c](https://github.com/zthun/fashion/commit/8ecfa0c0d8cc7144127a7fdafbff98a7c6d838ec))
* popup component model has been replaced by dialog component model ([da6da5f](https://github.com/zthun/fashion/commit/da6da5fb7a2200e29e490ba9145e4a8c93f84c7c))
* popup now uses an html dialog element instead of mui ([c99a30b](https://github.com/zthun/fashion/commit/c99a30bf36367b4b6bb703295bc450c6ecb6f038))
* stack align and justify now support align-content and justify-items ([de3cc99](https://github.com/zthun/fashion/commit/de3cc994d613e56a648a6bd72b161d46c04e7ca5))



## [3.2.3](https://github.com/zthun/fashion/compare/v3.2.2...v3.2.3) (2024-09-10)

**Note:** Version bump only for package @zthun/fashion-boutique





## [3.2.2](https://github.com/zthun/fashion/compare/v3.2.1...v3.2.2) (2024-09-10)

**Note:** Version bump only for package @zthun/fashion-boutique





## [3.2.1](https://github.com/zthun/fashion/compare/v3.2.0...v3.2.1) (2024-09-10)


### Bug Fixes

* paragraph spacing ([2168d4c](https://github.com/zthun/fashion/commit/2168d4c67986c248a3d2fdad236bf99f3c1ec616))



## [3.2.0](https://github.com/zthun/fashion/compare/v3.1.3...v3.2.0) (2024-09-10)


### Features

* text color is now deprecated in favor of individual typography fashion ([d26f946](https://github.com/zthun/fashion/commit/d26f9461908dab24de7862bad3449f0e204ee480))
* typography can now have individual fashion ([a92f435](https://github.com/zthun/fashion/commit/a92f4356bce5cb8f43ccd0d9f843e44072552226))



## [3.1.3](https://github.com/zthun/fashion/compare/v3.1.2...v3.1.3) (2024-09-09)

**Note:** Version bump only for package @zthun/fashion-boutique





## [3.1.2](https://github.com/zthun/fashion/compare/v3.1.1...v3.1.2) (2024-09-09)


### Bug Fixes

* default border style is now solid ([e09cfe4](https://github.com/zthun/fashion/commit/e09cfe4743aeeafde23d15e05eb3e46963ed3d73))



## [3.1.1](https://github.com/zthun/fashion/compare/v3.1.0...v3.1.1) (2024-09-09)


### Bug Fixes

* role on alert should now be properly set ([a56f817](https://github.com/zthun/fashion/commit/a56f817db60f9b1134616c65af92f7d8075f4e1c))
* role on banner should now be properly set ([5e602b1](https://github.com/zthun/fashion/commit/5e602b19a19bb83cb98187a53cfe47f970cdaf2b))



## [3.1.0](https://github.com/zthun/fashion/compare/v3.0.0...v3.1.0) (2024-09-09)


### Features

* box now supports border radius ([5840338](https://github.com/zthun/fashion/commit/5840338231594dca468410d9ab4078d83114f253))
* component dom events adds the synthetic event system to a component ([f7d33a4](https://github.com/zthun/fashion/commit/f7d33a413ccde73d470c150077f57abbddc3462a))


### Bug Fixes

* box border size should now properly be reflected ([d3fad54](https://github.com/zthun/fashion/commit/d3fad545f94faf75a817541771662b01baef6646))



## [3.0.0](https://github.com/zthun/fashion/compare/v2.7.1...v3.0.0) (2024-09-08)


### ⚠ BREAKING CHANGES

* grid span and newspaper now use device value for properties
* component width now uses DeviceValue
* component height now has one property of ZDeviceValue

### Features

* component height now has one property of ZDeviceValue ([ba2caa0](https://github.com/zthun/fashion/commit/ba2caa00a3e0c1706e05da066a4317564d6c8609))
* component width now uses DeviceValue ([484be6b](https://github.com/zthun/fashion/commit/484be6bcfebf6bdff305805beae83c22ed3926be))


### Code Refactoring

* grid span and newspaper now use device value for properties ([7f1aada](https://github.com/zthun/fashion/commit/7f1aadaa094a28d2d987cda808e22e418750ae83))



## [2.7.1](https://github.com/zthun/fashion/compare/v2.7.0...v2.7.1) (2024-09-03)

**Note:** Version bump only for package @zthun/fashion-boutique





## [2.7.0](https://github.com/zthun/fashion/compare/v2.6.0...v2.7.0) (2024-02-06)


### Features

* fashion-boutique now defaults to an esm module ([c5f724a](https://github.com/zthun/fashion/commit/c5f724a8684ca58f76ef690e1835286b8d13b258))
* upgrade emotion ([80efa22](https://github.com/zthun/fashion/commit/80efa22d57b5a936cf564321743ccf1d0694e298))
* upgrade react-router-dom ([6f6d2de](https://github.com/zthun/fashion/commit/6f6d2de2101c6a2e08c297996c50076a28e45564))
* upgrade webigail ([16dc235](https://github.com/zthun/fashion/commit/16dc235d766ff86a39768492ab06c4c1cece6872))



## [2.6.0](https://github.com/zthun/fashion/compare/v2.5.0...v2.6.0) (2023-12-21)


### Features

* a newspaper component is a special 12 column grid that spans a single content child ([59befe8](https://github.com/zthun/fashion/commit/59befe82ac9bb0b2f0865618a4b12acace49108b))
* card can includes the data attributes from the props ([b77ddaf](https://github.com/zthun/fashion/commit/b77ddafb5d9b711b96c01188bceb71fd9132e0ea))
* cards can now have minimum heights ([0d8a95b](https://github.com/zthun/fashion/commit/0d8a95bba3848edb94bb800c9ca667c157a0f4b2))
* the global body element is now relative at 100vh for height bound layouts ([996d25b](https://github.com/zthun/fashion/commit/996d25b36aba7824b2e10a5dff602982c4077c9a))
* the wizard component uses steps to move you through content ([94a98ef](https://github.com/zthun/fashion/commit/94a98efc4bad940bcbbb9bd4a295ac34c293c8cd))
* wizard supports conditional navigation to force correct input before moving forward ([4b9f102](https://github.com/zthun/fashion/commit/4b9f102ba57d8e0aa040f778db531ad633dd767e))


### Bug Fixes

* disabled button now shows text in dark theme ([2811958](https://github.com/zthun/fashion/commit/28119581e6cec958c712b35b3b49e36b26f62005))



## [2.5.0](https://github.com/zthun/fashion/compare/v2.4.2...v2.5.0) (2023-12-19)


### Features

* added the YouTube video component ([ba8ef90](https://github.com/zthun/fashion/commit/ba8ef90400f71db3e14354d0f0bb40553d486892))



## [2.4.2](https://github.com/zthun/fashion/compare/v2.4.1...v2.4.2) (2023-12-16)

**Note:** Version bump only for package @zthun/fashion-boutique





## [2.4.1](https://github.com/zthun/fashion/compare/v2.4.0...v2.4.1) (2023-12-16)

**Note:** Version bump only for package @zthun/fashion-boutique





## [2.4.0](https://github.com/zthun/fashion/compare/v2.3.0...v2.4.0) (2023-12-16)


### Features

* upgrade font awesome to 6.5.1 ([c84771b](https://github.com/zthun/fashion/commit/c84771ba4fd397ba12fcbd7bbadbd3948707b924))
* upgrade material to 5.15 ([1502128](https://github.com/zthun/fashion/commit/1502128fe52b0a1cdad7d7f1e160b8f89d11c5f0))
* upgrade webigail to 1.2.0 ([b91a926](https://github.com/zthun/fashion/commit/b91a926451095088ec7dfada97e2f2dfa42cdf8b))



## [2.3.0](https://github.com/zthun/fashion/compare/v2.2.0...v2.3.0) (2023-11-24)


### Features

* upgrade to react-router-dom 6.20.x ([c192041](https://github.com/zthun/fashion/commit/c192041558f1465921d96b5652281fe74fa2163e))



## [2.2.0](https://github.com/zthun/fashion/compare/v2.1.1...v2.2.0) (2023-11-21)


### Bug Fixes

* card content should now scale with the height ([d1c7197](https://github.com/zthun/fashion/commit/d1c719764226d7d69f1bd9614fb5c44da0ea963a))



## [2.1.1](https://github.com/zthun/fashion/compare/v2.1.0...v2.1.1) (2023-11-21)


### Bug Fixes

* xl width on grid is now respected ([0eb61a6](https://github.com/zthun/fashion/commit/0eb61a6ae1f3394f8191dde44019ed39670d8d2f))



## [2.1.0](https://github.com/zthun/fashion/compare/v2.0.0...v2.1.0) (2023-11-21)


### Features

* grid components can now specify width in addition to height ([060461c](https://github.com/zthun/fashion/commit/060461c63f7d59b972e1ae3af492afc9db07db9e))


### Bug Fixes

* not found should now scale to its content ([1347e4e](https://github.com/zthun/fashion/commit/1347e4e15c0f664af41a9f4e46d09e077ae76719))



## [2.0.0](https://github.com/zthun/fashion/compare/v0.12.0...v2.0.0) (2023-11-21)


### ⚠ BREAKING CHANGES

* update to release

### Features

* update to release ([248cf83](https://github.com/zthun/fashion/commit/248cf834b17fe6b3c727bb9eac320fd89bf269a2))



## [0.12.0](https://github.com/zthun/fashion/compare/v0.11.1...v0.12.0) (2023-11-21)


### Features

* box can now have justification ([309112b](https://github.com/zthun/fashion/commit/309112b2a7fe827b91b320a15329414fca573ced))



## [0.11.1](https://github.com/zthun/fashion/compare/v0.11.0...v0.11.1) (2023-08-17)

**Note:** Version bump only for package @zthun/fashion-boutique





## [0.11.0](https://github.com/zthun/fashion/compare/v0.10.2...v0.11.0) (2023-08-16)


### Features

* update webigail ([18a37e9](https://github.com/zthun/fashion/commit/18a37e988cfacafe0453c6d73979fda1cfd23dc2))



## [0.10.2](https://github.com/zthun/fashion/compare/v0.10.1...v0.10.2) (2023-08-16)


### Bug Fixes

* helpful no longer bundles uuid ([a498685](https://github.com/zthun/fashion/commit/a498685f08e0d5d723b38b4127aea219abd81c4d))



## [0.10.1](https://github.com/zthun/fashion/compare/v0.10.0...v0.10.1) (2023-08-12)

**Note:** Version bump only for package @zthun/fashion-boutique





## [0.10.0](https://github.com/zthun/fashion/compare/v0.9.1...v0.10.0) (2023-08-12)


### Features

* popup component displays content in a pop bubble ([e1a9a3b](https://github.com/zthun/fashion/commit/e1a9a3bc95802f17b5f112201646240e0532668f))



## [0.9.1](https://github.com/zthun/fashion/compare/v0.9.0...v0.9.1) (2023-08-07)


### Bug Fixes

* grid view rogue div element ([9df5d54](https://github.com/zthun/fashion/commit/9df5d5439d4bcdf23a28f8d5f80a16b72fd05f9a))
* list item dividers live in an li tag ([0fdd6f7](https://github.com/zthun/fashion/commit/0fdd6f79ed023efce2d1bf7d3da00203e83cb712))
* list item elements in dark mode show up with correct colors ([c18d90c](https://github.com/zthun/fashion/commit/c18d90c33bdf6f884562040b5e607d27eb90735c))



## [0.9.0](https://github.com/zthun/fashion/compare/v0.8.0...v0.9.0) (2023-07-26)


### Features

* grid view now uses a more button for pagination ([dd58c33](https://github.com/zthun/fashion/commit/dd58c330b982490683def92377aad14bc70376e7))
* usePageView has been moved to helpful-react ([70e21b1](https://github.com/zthun/fashion/commit/70e21b1d92b14037f7b5f28efb491ac6cc212bb8))



## [0.8.0](https://github.com/zthun/fashion/compare/v0.7.0...v0.8.0) (2023-07-22)


### Features

* bubble can now be focused and clicked ([f86baf0](https://github.com/zthun/fashion/commit/f86baf0465cf958b46f85036a100ea908b036579))



## [0.7.0](https://github.com/zthun/fashion/compare/v0.6.2...v0.7.0) (2023-07-22)


### Features

* grids can now justify items ([570c5de](https://github.com/zthun/fashion/commit/570c5defe43f623e88b7d8f1fc02bb9cb77ccb9d))
* stacks can now be inline flex as well as flex ([21cc6b5](https://github.com/zthun/fashion/commit/21cc6b5eec6d193c7ca3fcbffbda4690c5f92d0a))



## [0.6.2](https://github.com/zthun/fashion/compare/v0.6.1...v0.6.2) (2023-07-17)


### Bug Fixes

* grid span now properly reacts to sizing ([1a658e4](https://github.com/zthun/fashion/commit/1a658e43c0e0b60a7768b34ac7a26df784da4d1d))



## [0.6.1](https://github.com/zthun/fashion/compare/v0.6.0...v0.6.1) (2023-07-17)


### Bug Fixes

* export grid span ([197ddac](https://github.com/zthun/fashion/commit/197ddacc079ea819051a9c100d8f935e3f842894))



## [0.6.0](https://github.com/zthun/fashion/compare/v0.5.0...v0.6.0) (2023-07-16)


### Features

* grid span allows for spanning columns and rows ([1e354d1](https://github.com/zthun/fashion/commit/1e354d1eec48e2b08acc540cdc841cccb2d724fd))


### Bug Fixes

* carousel count of 1 or less now renders properly ([068fb28](https://github.com/zthun/fashion/commit/068fb28bd806d31a948268caf0279938e75e635a))



## [0.5.0](https://github.com/zthun/fashion/compare/v0.4.3...v0.5.0) (2023-07-16)


### Features

* bubble component for avatar like layouts with clipping ([6c7d739](https://github.com/zthun/fashion/commit/6c7d739640091dc559fda15494755c1b658c6b62))
* carousel buttons fade in and out ([6233254](https://github.com/zthun/fashion/commit/6233254c9c65d00775d723ea996f717d4f2c3520))
* carousel component provides rotating selectable content ([e754b03](https://github.com/zthun/fashion/commit/e754b03c8f33ca8b916c64da9e335c67ea73ab14))
* orientation components can now change based on screen size ([d3ce0ad](https://github.com/zthun/fashion/commit/d3ce0ad024767e9e3f569cbf0b4acfd5916905fa))


### Bug Fixes

* button no longer force renders the end adornment ([f319d96](https://github.com/zthun/fashion/commit/f319d968aa6121c021633b27c9ae3a62194b6638))
* buttons should now respect the compact flag ([8bd33ae](https://github.com/zthun/fashion/commit/8bd33ae1fde6512ff7fd31bc91ff1408dfa2a8fc))


### Reverts

* responsive orientation ([0fce8e0](https://github.com/zthun/fashion/commit/0fce8e09af6b802c95e3fdd79a422c2f7cfc2592))



## [0.4.3](https://github.com/zthun/fashion/compare/v0.4.2...v0.4.3) (2023-07-09)


### Bug Fixes

* icons now display tooltips properly ([16e252d](https://github.com/zthun/fashion/commit/16e252db1752ea0c3d1bf2eb3a9cdd25ed926572))



## [0.4.2](https://github.com/zthun/fashion/compare/v0.4.1...v0.4.2) (2023-07-09)


### Bug Fixes

* labeled no longer renders duplicate ids ([a7deca4](https://github.com/zthun/fashion/commit/a7deca4c45cb031a1710bbaae48c617b83272495))



## [0.4.1](https://github.com/zthun/fashion/compare/v0.4.0...v0.4.1) (2023-07-08)


### Bug Fixes

* chart border should now be darker ([f442372](https://github.com/zthun/fashion/commit/f442372e138a6f3f62264c00fffac7d4851412ae))



## [0.4.0](https://github.com/zthun/fashion/compare/v0.3.1...v0.4.0) (2023-07-08)


### Features

* charts allow for easy data visualizations ([7772c4c](https://github.com/zthun/fashion/commit/7772c4c1e96d414e816b9dfc32993ef48b778bb8))



## [0.3.1](https://github.com/zthun/fashion/compare/v0.3.0...v0.3.1) (2023-07-08)


### Bug Fixes

* loosen the constraints on the custom theme ([db54398](https://github.com/zthun/fashion/commit/db54398b4c2b6689f2ea4f6ea0936ac3208e8d0e))



## [0.3.0](https://github.com/zthun/fashion/compare/v0.2.0...v0.3.0) (2023-07-08)


### Features

* you can now specify a custom fashion extension on the createStyleHook ([5de273f](https://github.com/zthun/fashion/commit/5de273f08bb0409eef1cdc2c2ca40bb9d90cf5fc))
* you can now specify the custom style when retrieving the fashion theme ([4559905](https://github.com/zthun/fashion/commit/45599050c66b1c48635f3da3f989e86e385a9b90))



## [0.2.0](https://github.com/zthun/fashion/compare/v0.1.2...v0.2.0) (2023-06-23)


### Features

* modal allows for isolated work ([a07b25d](https://github.com/zthun/fashion/commit/a07b25ddef6fa33299d7e81f179a66c615a3c645))
* modal can support fashion ([1742904](https://github.com/zthun/fashion/commit/1742904ed784df624ce79ad1fc3b0680b7fd7037))


### Bug Fixes

* ellipsis in pagination should now have the correct color ([136b4ee](https://github.com/zthun/fashion/commit/136b4eea4ab3c7e7b14f4cec73dcb530f4c99271))



## [0.1.2](https://github.com/zthun/fashion/compare/v0.1.1...v0.1.2) (2023-06-21)


### Bug Fixes

* proper react paths ([942b29d](https://github.com/zthun/fashion/commit/942b29db4d8530d52eca952a266efa371a973e5a))



## [0.1.1](https://github.com/zthun/fashion/compare/v0.1.0...v0.1.1) (2023-06-21)


### Bug Fixes

* export grid view ([752f90c](https://github.com/zthun/fashion/commit/752f90c5f4559c5669e63ec507451b9304bf3df0))



## 0.1.0 (2023-06-20)


### Features

* alerts show fashionable blocks ([7b5493b](https://github.com/zthun/fashion/commit/7b5493ba5e040d40cbd13d2ea122f5a266590404))
* boolean components can be fashionable ([e8152fe](https://github.com/zthun/fashion/commit/e8152fe4d9c5bad3d6a2d3030131c34692661440))
* booleans can be required in a form ([14d903d](https://github.com/zthun/fashion/commit/14d903d5e3082ffc04896e0f9d797c7556b1b384))
* breadcrumbs location allows home navigation ([5b3740f](https://github.com/zthun/fashion/commit/5b3740ff277731a3eed9900431f939b57482eaf3))
* buttons can be compact ([3652302](https://github.com/zthun/fashion/commit/3652302699d4c7c93d2dd59daf0d876571a81cc5))
* cards can be in a loading state ([cad62e5](https://github.com/zthun/fashion/commit/cad62e54750e01984310822bc88124dc7ff830d8))
* cards can be loading ([e76bc16](https://github.com/zthun/fashion/commit/e76bc162f284691be7cb4cc7fd1fb9473126c61a))
* cards can have fashion ([0a5853c](https://github.com/zthun/fashion/commit/0a5853ca51ed18121280c2a9654529de37de98fb))
* choice component can have orientation ([5c9de66](https://github.com/zthun/fashion/commit/5c9de662f7d67f2b5eb1a3378e40be4478913840))
* choice components can be required in a form ([839735a](https://github.com/zthun/fashion/commit/839735a4978e207d17c0430f025ccf84c93ce5ea))
* choice toggle supports choices with toggle buttons ([a460f00](https://github.com/zthun/fashion/commit/a460f00c5e85cfce05810eac2fb1ef514a28d1cd))
* components can require interaction to move forward ([36d0d08](https://github.com/zthun/fashion/commit/36d0d0838ff63e4d4f6251de372ab52dc48f3ccf))
* data source components ask how to retrieve data ([476b80a](https://github.com/zthun/fashion/commit/476b80a32e56c59cff2d304cf75c611fef53957c))
* edit a request with the request editor ([0dc3790](https://github.com/zthun/fashion/commit/0dc3790ea4158e694d8dc768d26e15293f6c1773))
* font awesome table icons have support for families ([08a65df](https://github.com/zthun/fashion/commit/08a65df622a89b348585bd15401b6b66bad6d1e9))
* font based icons load quickly ([790cd2e](https://github.com/zthun/fashion/commit/790cd2e18c641943c6e8d8e79149090df048f3ad))
* grid view is a data source based grid ([3559e2f](https://github.com/zthun/fashion/commit/3559e2ff9e300eb9e0087fd635a83b1422b5eca4))
* icons can be clickable ([e149791](https://github.com/zthun/fashion/commit/e149791def157bb5d208a24b8f4f3af83c061d17))
* icons can be clicked and have tab navigation ([e12e08e](https://github.com/zthun/fashion/commit/e12e08e69f94d40d9630eb54920264d41cf8489f))
* label component allows to display emphasized content ([174f20a](https://github.com/zthun/fashion/commit/174f20a0b31d0be8f4947c4e28dc49322e1ffc31))
* labeled components can be oriented horizontally or vertically ([041925b](https://github.com/zthun/fashion/commit/041925ba325af2c3e4c3177430f6d9d50e2464a1))
* labels can display a required flag ([375689a](https://github.com/zthun/fashion/commit/375689adf6d2e64ddc7098dc92fca986352cc88d))
* labels for form inputs ([d688255](https://github.com/zthun/fashion/commit/d688255f42a6b9eca6a12a1e16fe6a7d6a2021b9))
* number components can be required ([67382b8](https://github.com/zthun/fashion/commit/67382b8367d0846cfac7f26ff986639fe5032683))
* orientation allows for components to have different layouts but keep the same logic ([37e5dd9](https://github.com/zthun/fashion/commit/37e5dd9006d9a7f4b5bd9e5bd65de9ab78556903))
* pagination can be displayed vertically ([b3a2107](https://github.com/zthun/fashion/commit/b3a2107dac433e00f2fac79b867605f10e161fec))
* pagination component allows for paged content ([dac022f](https://github.com/zthun/fashion/commit/dac022f6a6f2573edbe83c1fcbd4fc3f080cb7c7))
* paginator can be disabled ([d7f4d66](https://github.com/zthun/fashion/commit/d7f4d66f2b3bc87742b3aa718d166d102430d0b2))
* support name and orientation ([318c985](https://github.com/zthun/fashion/commit/318c98534b49bcd9861d17881f13cddd6e66d1d1))
* suspense can have fashion ([eac1a52](https://github.com/zthun/fashion/commit/eac1a5246a64a4bfb572d2a87beb33d84190260c))
* suspense progress uses animated progress bars ([1eef95c](https://github.com/zthun/fashion/commit/1eef95cebc0342a02ca3ece44c12fe87f1efd6ac))
* table allows for tabular data ([fe130ff](https://github.com/zthun/fashion/commit/fe130ff12911e18a4bcec61acf05f4d3aa9aa0ea))
* table shows page size and loaded through footer ([3a10e4b](https://github.com/zthun/fashion/commit/3a10e4b097e9aac626df82b1a04c0048b96d4b22))
* table supports infinite scroll ([313123f](https://github.com/zthun/fashion/commit/313123f0b259feb22ada20871747c5a083238dc4))
* table supports virtualized scroll ([9e9c963](https://github.com/zthun/fashion/commit/9e9c9636ac44f6639e91db0d258f20b4b2c3d715))
* the table has a built in toolbar for search ([c1a70d6](https://github.com/zthun/fashion/commit/c1a70d65906fbddaa08f31a29b48098c9be56f5e))
* the table scrolls horizontally ([a1fb1be](https://github.com/zthun/fashion/commit/a1fb1be98ae3d20e36f280fccea434c205048b64))
* the text color component can change the underlying text color ([54cc8f7](https://github.com/zthun/fashion/commit/54cc8f7ca2607c43ce3393dfa9f44d965087dd22))
* toggle supports clear ([14ffdf0](https://github.com/zthun/fashion/commit/14ffdf006d0962be700a43d2f42dd8bd3d15462f))
* useFashion retrieves a named fashion ([7dc2c72](https://github.com/zthun/fashion/commit/7dc2c72d02716ac9f9270eaddc1866a15ce8e645))
* width and height can vary on different devices ([8293234](https://github.com/zthun/fashion/commit/8293234bb7a472372cab6e33df776f624e24e8f2))


### Bug Fixes

* choice now supports dark mode ([cb5d646](https://github.com/zthun/fashion/commit/cb5d6469eb2944c0f5e404f20f07852064c558e9))
* font size for icons has to be important ([a8ec222](https://github.com/zthun/fashion/commit/a8ec222651772a8a7575b42b7dc382f1369870be))
* text should no longer commit when the value remains the same ([5ec5072](https://github.com/zthun/fashion/commit/5ec50722ade0ea3bfe215df55b3750225b7b2e50))
