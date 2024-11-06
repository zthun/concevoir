# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [8.0.4](https://github.com/zthun/fashion/compare/v8.0.3...v8.0.4) (2024-11-06)

**Note:** Version bump only for package @zthun/fashion





## [8.0.3](https://github.com/zthun/fashion/compare/v8.0.2...v8.0.3) (2024-11-03)

**Note:** Version bump only for package @zthun/fashion





## [8.0.2](https://github.com/zthun/fashion/compare/v8.0.1...v8.0.2) (2024-11-03)


### Bug Fixes

* styled will now properly revert the global styles when switching themes ([c52a24c](https://github.com/zthun/fashion/commit/c52a24cc9d29bb66b76f0aa8a32d94fa798a5921))



## [8.0.1](https://github.com/zthun/fashion/compare/v8.0.0...v8.0.1) (2024-11-02)

**Note:** Version bump only for package @zthun/fashion





## [8.0.0](https://github.com/zthun/fashion/compare/v7.2.0...v8.0.0) (2024-11-02)


### ⚠ BREAKING CHANGES

* choice component model select no longer auto closes the popup
* useChoice cast is no longer exported
* choice drop down and choice auto complete have been merged to choice select
* choice value is now null for no selection

### Features

* chip displays things in a colorful blob ([f591b32](https://github.com/zthun/fashion/commit/f591b32b52da5ad838d3c9f2d4c664baf23bbeaf))
* choice select combines choice autocomplete and choice drop down ([a62525d](https://github.com/zthun/fashion/commit/a62525dbeb7026e0e34fa95accd4b365f4d1dc60))
* dialog components can now be marked compact to reduce padding ([37b9b63](https://github.com/zthun/fashion/commit/37b9b63bf8a26e71820c35907ea14d6f9b6551ed))
* text input can now forward a ref ([b471a1a](https://github.com/zthun/fashion/commit/b471a1ab4453f4f5679284379afb69dd29c4d411))
* useDialog can now raise an even after the dialog is opened ([bfccf74](https://github.com/zthun/fashion/commit/bfccf74771314c10a52c6a38c7f89bd129988758))
* you can now constrain the height of a popup ([700bb3e](https://github.com/zthun/fashion/commit/700bb3ea978551331cf7b1edd3724c4045a13ee8))
* you can now create a compact list where the padding is removed ([5752a0b](https://github.com/zthun/fashion/commit/5752a0b6b60b90e8e4690a0228d579ebfb3e7867))
* you can now highlight list items ([17ced63](https://github.com/zthun/fashion/commit/17ced630284005fdf20cab68f7137aacf277a2be))


### Bug Fixes

* boolean states now default to false ([22b2e4d](https://github.com/zthun/fashion/commit/22b2e4d245a8f3e02319099785212206f03150a7))
* choice component model select no longer auto closes the popup ([7222b2c](https://github.com/zthun/fashion/commit/7222b2cc012aca6c2e016e65d421468c6da2fd08))
* popup name is now correctly set ([1d101c9](https://github.com/zthun/fashion/commit/1d101c9ea7ed4162f2474785f4d259f6023d245e))
* popup now adjusts its position to always fit into the client area ([9425204](https://github.com/zthun/fashion/commit/94252043015fe9479d4ec9acc35ba9c2c90fce83))
* popup now retains its position on scroll and resize ([d2c89e0](https://github.com/zthun/fashion/commit/d2c89e034e6e3ebc9d5b27b81f3cbcb6d601b18e))


### Code Refactoring

* choice drop down and choice auto complete have been merged to choice select ([7581ff2](https://github.com/zthun/fashion/commit/7581ff2ccb9bdf332db5224b25baa6c8e41074df))
* choice value is now null for no selection ([f21c8ed](https://github.com/zthun/fashion/commit/f21c8ed7ea646b6578d4dbe1b3855708c28a2260))
* useChoice cast is no longer exported ([a9f49ff](https://github.com/zthun/fashion/commit/a9f49ff4c16983949cb6dc57e0517f12b7540342))



## [7.2.0](https://github.com/zthun/fashion/compare/v7.1.0...v7.2.0) (2024-10-16)


### Features

* extract typography css into a hook for consumption on other components ([2ae70d8](https://github.com/zthun/fashion/commit/2ae70d8e44f629090a127c5810f80bbd1825a131))


### Bug Fixes

* checkbox should not start as indeterminate if value is undefined ([c2f9adc](https://github.com/zthun/fashion/commit/c2f9adc499281d9b6f14779e51d3e94a972862c5))
* label alignment should be centered ([788f740](https://github.com/zthun/fashion/commit/788f740570923fd956f0fe952c6b8744d73ed85c))
* label typography should now be consistent with other typography ([b3bc2d1](https://github.com/zthun/fashion/commit/b3bc2d1222db7568f70dc25427b351d407c6fd6f))



## [7.1.0](https://github.com/zthun/fashion/compare/v7.0.0...v7.1.0) (2024-10-15)


### Features

* you can now pass dom elements to label, labeled, and stack ([5b970ae](https://github.com/zthun/fashion/commit/5b970ae16106705ca5b4b4726a429f01dab37a4c))
* you can now render the position of a label as a prefix or suffix ([5f95823](https://github.com/zthun/fashion/commit/5f95823c694bf62a2d597cb42af5cc4b26ddb40f))


### Bug Fixes

* clicking on label now focuses the text inputs ([99e6989](https://github.com/zthun/fashion/commit/99e69893858b3030637739aae517921bb290a9b9))
* label now passes through the data attributes ([8576629](https://github.com/zthun/fashion/commit/85766290c87019b3a6e1384efc2f25de7a8e6dd6))



## [7.0.0](https://github.com/zthun/fashion/compare/v6.0.2...v7.0.0) (2024-09-27)


### ⚠ BREAKING CHANGES

* text-input-reveal is no longer supported

### Features

* add fashion to number ([653a72f](https://github.com/zthun/fashion/commit/653a72fb0a158e5f22465c49d024d6ab7e934abe))
* you can now set most attributes for textarea and input ([dcb5f10](https://github.com/zthun/fashion/commit/dcb5f1059e705f2179091d1ba3caa8df51dfe7d4))


### Bug Fixes

* labeled as props renamed properly to IZLabeled ([59fb7e1](https://github.com/zthun/fashion/commit/59fb7e1f4ec118b5305de620126b6af306b3db2a))
* number layout ([08607bb](https://github.com/zthun/fashion/commit/08607bb5f4fdbe1d335b3f7e80f89cd4bd301ce8))


### Code Refactoring

* text-input-reveal is no longer supported ([5a1c3af](https://github.com/zthun/fashion/commit/5a1c3af4c41ce4f8eaa76c67d28bf7c4fbbfc4bd))



## [6.0.2](https://github.com/zthun/fashion/compare/v6.0.1...v6.0.2) (2024-09-16)


### Bug Fixes

* list and list item now have correct roles ([cb59947](https://github.com/zthun/fashion/commit/cb599473d79f152b496e19d9cadb9d76f872f422))



## [6.0.1](https://github.com/zthun/fashion/compare/v6.0.0...v6.0.1) (2024-09-15)


### Bug Fixes

* bubble page title is now correct ([2405df1](https://github.com/zthun/fashion/commit/2405df179e679ef4eb92911bab395e416ed25cde))
* remove avatars on list cause they do not line up properly ([bebb0fc](https://github.com/zthun/fashion/commit/bebb0fcfdaf14a59b5ad852074dba6b7dbd20777))


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
* card demo no longer needs image
* text color has been removed
* card page no longer has support for internal loading
* button no longer supports an internal loading state
* card no longer supports an internal loading state
* button no longer supports an internal loading state
* suspense component model no longer supports width or height
* suspense progress no longer uses mui
* suspense loading has been renamed to disabled

### Features

* card demo no longer needs image ([dd30a0d](https://github.com/zthun/fashion/commit/dd30a0ddcb5e6cdf79ea9485a212a9505eea5acb))
* component footer adds footer support to a component ([2025daa](https://github.com/zthun/fashion/commit/2025daabb8af34b6b774d8d622b61156868e0e00))
* content title adds a standard for how to display horizontal title content ([8b3889f](https://github.com/zthun/fashion/commit/8b3889f8f65983b8c49b5d31740d22b3d7177ecd))
* fashion intrinsic names have been added ([8282092](https://github.com/zthun/fashion/commit/8282092b3c7943067136923ec07f0b52db4c56ab))
* flex allows for grow and shrink in a flex supported container ([aac7009](https://github.com/zthun/fashion/commit/aac70091c63d900a14dc30f5058ed7ec9b66aaa2))
* font awesome can now have animations ([c4f9473](https://github.com/zthun/fashion/commit/c4f9473404642d9a9788f2b3a31e18bdc630b68b))
* stack now supports passing data attributes ([e777d3a](https://github.com/zthun/fashion/commit/e777d3acd52bd0b18de882c847b72b78b7fc70ed))
* stack now supports wrap ([30b0d76](https://github.com/zthun/fashion/commit/30b0d76dec06e13a2fab3fa0ac848f0e2222fd16))
* suspense component model no longer supports width or height ([0515063](https://github.com/zthun/fashion/commit/05150639191ac67404c11ec5076cb52f7fa03ce3))
* text color has been removed ([30ec464](https://github.com/zthun/fashion/commit/30ec4646c9f3b3acc0e354c5f2d1fec530d5beef))


### Bug Fixes

* auto box now properly scales to the content ([9f77734](https://github.com/zthun/fashion/commit/9f77734837e294b685d39646ca69ef4a353a7523))
* box now defaults to full width to support old bug ([e1494ba](https://github.com/zthun/fashion/commit/e1494bab8da07c38d299a01376a6cbdf6e5837d7))
* box sizing for boutique page is now correct ([48c0f29](https://github.com/zthun/fashion/commit/48c0f293df2564a2cd9ec279f00e79faaf2ad1a4))
* icon sizes ([c3707cc](https://github.com/zthun/fashion/commit/c3707ccc2acdf4484841df0babf9e6bb988791d2))


### Code Refactoring

* banner main avatar, prefix, and suffix have been collapsed into TitleProps ([6b8be3b](https://github.com/zthun/fashion/commit/6b8be3b60c2ba01e6e74ba4eb1923111ed38e392))
* button no longer supports an internal loading state ([05781d9](https://github.com/zthun/fashion/commit/05781d957fa408cd12b08d9c25cc3240f3b9317a))
* button no longer supports an internal loading state ([7875e64](https://github.com/zthun/fashion/commit/7875e64f64820ee64bf415e26e0ac88eaab9f66a))
* card heading, subHeading, and avatar have been extracted into TitleProps ([0357f54](https://github.com/zthun/fashion/commit/0357f542a95a6886ccdbf81a86e8840b5d5499c0))
* card no longer supports an internal loading state ([be65ca1](https://github.com/zthun/fashion/commit/be65ca11faffd15a7f5d3498644531d0496fe741))
* card page no longer has support for internal loading ([e08e796](https://github.com/zthun/fashion/commit/e08e79640215ab7b0a5089072c253b693c097758))
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

**Note:** Version bump only for package @zthun/fashion





## [3.2.2](https://github.com/zthun/fashion/compare/v3.2.1...v3.2.2) (2024-09-10)

**Note:** Version bump only for package @zthun/fashion





## [3.2.1](https://github.com/zthun/fashion/compare/v3.2.0...v3.2.1) (2024-09-10)


### Bug Fixes

* paragraph spacing ([2168d4c](https://github.com/zthun/fashion/commit/2168d4c67986c248a3d2fdad236bf99f3c1ec616))



## [3.2.0](https://github.com/zthun/fashion/compare/v3.1.3...v3.2.0) (2024-09-10)


### Features

* text color is now deprecated in favor of individual typography fashion ([d26f946](https://github.com/zthun/fashion/commit/d26f9461908dab24de7862bad3449f0e204ee480))
* typography can now have individual fashion ([a92f435](https://github.com/zthun/fashion/commit/a92f4356bce5cb8f43ccd0d9f843e44072552226))



## [3.1.3](https://github.com/zthun/fashion/compare/v3.1.2...v3.1.3) (2024-09-09)

**Note:** Version bump only for package @zthun/fashion





## [3.1.2](https://github.com/zthun/fashion/compare/v3.1.1...v3.1.2) (2024-09-09)


### Bug Fixes

* default border style is now solid ([e09cfe4](https://github.com/zthun/fashion/commit/e09cfe4743aeeafde23d15e05eb3e46963ed3d73))
* update boutique page boxes to be interactive ([91677de](https://github.com/zthun/fashion/commit/91677dea8b4d84102d85e89a4bae9cf1271ff922))



## [3.1.1](https://github.com/zthun/fashion/compare/v3.1.0...v3.1.1) (2024-09-09)


### Bug Fixes

* role on alert should now be properly set ([a56f817](https://github.com/zthun/fashion/commit/a56f817db60f9b1134616c65af92f7d8075f4e1c))
* role on banner should now be properly set ([5e602b1](https://github.com/zthun/fashion/commit/5e602b19a19bb83cb98187a53cfe47f970cdaf2b))



## [3.1.0](https://github.com/zthun/fashion/compare/v3.0.0...v3.1.0) (2024-09-09)


### Features

* box now supports border radius ([5840338](https://github.com/zthun/fashion/commit/5840338231594dca468410d9ab4078d83114f253))
* component dom events adds the synthetic event system to a component ([f7d33a4](https://github.com/zthun/fashion/commit/f7d33a413ccde73d470c150077f57abbddc3462a))
* size margin is just a gap size with support for auto ([e2594ad](https://github.com/zthun/fashion/commit/e2594ad00b6df19ba08e6052bac31dbaaa183a45))
* tailor can now construct a gap of auto ([26b2511](https://github.com/zthun/fashion/commit/26b2511c7a8e4fbd1218c26d1b9ace624260a407))
* tailor now supports standard border radius values ([fd31f67](https://github.com/zthun/fashion/commit/fd31f679389d8d52c5c256928bf2de0382faa836))
* theme color boxes now have a small border radius ([eb9fa6d](https://github.com/zthun/fashion/commit/eb9fa6d225af9cd8b72e8a306670b722a31f5d2c))


### Bug Fixes

* box border size should now properly be reflected ([d3fad54](https://github.com/zthun/fashion/commit/d3fad545f94faf75a817541771662b01baef6646))



## [3.0.0](https://github.com/zthun/fashion/compare/v2.7.1...v3.0.0) (2024-09-08)


### ⚠ BREAKING CHANGES

* grid span and newspaper now use device value for properties
* component width now uses DeviceValue
* component height now has one property of ZDeviceValue
* fashion labs is no longer supported
* the main, contrast and border for the fashion is now housed in the idle state

### Features

* added size alias's for gap, thickness and rounding ([e94fa48](https://github.com/zthun/fashion/commit/e94fa48e88d054e321168c0f2efa86e16b5ad89c))
* color picker picks color states with fallback support ([2ae67e1](https://github.com/zthun/fashion/commit/2ae67e139123d22871bc902d9d08d1b70ca79d44))
* component height now has one property of ZDeviceValue ([ba2caa0](https://github.com/zthun/fashion/commit/ba2caa00a3e0c1706e05da066a4317564d6c8609))
* component width now uses DeviceValue ([484be6b](https://github.com/zthun/fashion/commit/484be6bcfebf6bdff305805beae83c22ed3926be))
* device value supports fallback values ([cc7e780](https://github.com/zthun/fashion/commit/cc7e7801719e3208c896ffff40537576cd86e797))
* device-value allows you to set a value or device based values ([565f689](https://github.com/zthun/fashion/commit/565f689cd7c70a999bb569fbd77e4fd01f56ff67))
* fashion labs is no longer supported ([2444ced](https://github.com/zthun/fashion/commit/2444ced77ca028d16c9e70a4aacc26893266dc95))
* the main, contrast and border for the fashion is now housed in the idle state ([e669af6](https://github.com/zthun/fashion/commit/e669af6432752a7fedee39d4966bd14309aa9ee8))


### Code Refactoring

* grid span and newspaper now use device value for properties ([7f1aada](https://github.com/zthun/fashion/commit/7f1aadaa094a28d2d987cda808e22e418750ae83))



## [2.7.1](https://github.com/zthun/fashion/compare/v2.7.0...v2.7.1) (2024-09-03)

**Note:** Version bump only for package @zthun/fashion





## [2.7.0](https://github.com/zthun/fashion/compare/v2.6.0...v2.7.0) (2024-02-06)


### Features

* fashion theme now defaults to a esm module ([4425e5e](https://github.com/zthun/fashion/commit/4425e5e5f66cfa30f4b55cbbbfc4620f2bd4e596))
* fashion-boutique now defaults to an esm module ([c5f724a](https://github.com/zthun/fashion/commit/c5f724a8684ca58f76ef690e1835286b8d13b258))
* fashion-labs now defaults to an esm module ([e24bb43](https://github.com/zthun/fashion/commit/e24bb43067f202c55b5b8e021afa037dbdb8dafc))
* fashion-tailor now defaults to an esm module ([8971068](https://github.com/zthun/fashion/commit/897106879f151053f300ace21ac76e2093f6a8c0))
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
* the wizard demo page shows how the wizard navigates through content ([335ea9e](https://github.com/zthun/fashion/commit/335ea9ef5c018fd0dfda5a4ed72078b8cf1fac67))
* the wizard page demos the wizard component ([bd95d33](https://github.com/zthun/fashion/commit/bd95d332f7bf18408401dff4d7e0b08ae45ec422))
* wizard supports conditional navigation to force correct input before moving forward ([4b9f102](https://github.com/zthun/fashion/commit/4b9f102ba57d8e0aa040f778db531ad633dd767e))


### Bug Fixes

* disabled button now shows text in dark theme ([2811958](https://github.com/zthun/fashion/commit/28119581e6cec958c712b35b3b49e36b26f62005))
* the YouTube demo now centers the video and is responsive to width ([38d6020](https://github.com/zthun/fashion/commit/38d6020046d5f8c489901ac0aa9e980f3d96af62))



## [2.5.0](https://github.com/zthun/fashion/compare/v2.4.2...v2.5.0) (2023-12-19)


### Features

* added the YouTube video component ([ba8ef90](https://github.com/zthun/fashion/commit/ba8ef90400f71db3e14354d0f0bb40553d486892))
* the YouTube page shows a demo of an embedded YT video ([9927457](https://github.com/zthun/fashion/commit/99274579bd88a58940afee714f667e7f40531c9b))



## [2.4.2](https://github.com/zthun/fashion/compare/v2.4.1...v2.4.2) (2023-12-16)

**Note:** Version bump only for package @zthun/fashion





## [2.4.1](https://github.com/zthun/fashion/compare/v2.4.0...v2.4.1) (2023-12-16)

**Note:** Version bump only for package @zthun/fashion





## [2.4.0](https://github.com/zthun/fashion/compare/v2.3.0...v2.4.0) (2023-12-16)


### Features

* upgrade font awesome to 6.5.1 ([c84771b](https://github.com/zthun/fashion/commit/c84771ba4fd397ba12fcbd7bbadbd3948707b924))
* upgrade material to 5.15 ([1502128](https://github.com/zthun/fashion/commit/1502128fe52b0a1cdad7d7f1e160b8f89d11c5f0))
* upgrade webigail to 1.2.0 ([b91a926](https://github.com/zthun/fashion/commit/b91a926451095088ec7dfada97e2f2dfa42cdf8b))



## [2.3.0](https://github.com/zthun/fashion/compare/v2.2.0...v2.3.0) (2023-11-24)


### Features

* upgrade to react-router-dom 6.20.x ([c192041](https://github.com/zthun/fashion/commit/c192041558f1465921d96b5652281fe74fa2163e))



## [2.2.0](https://github.com/zthun/fashion/compare/v2.1.1...v2.2.0) (2023-11-21)


### Features

* card page now shows more cards in a grid ([e301c9f](https://github.com/zthun/fashion/commit/e301c9f1e35fb349f146b3c93fd217326f7a363d))


### Bug Fixes

* card content should now scale with the height ([d1c7197](https://github.com/zthun/fashion/commit/d1c719764226d7d69f1bd9614fb5c44da0ea963a))



## [2.1.1](https://github.com/zthun/fashion/compare/v2.1.0...v2.1.1) (2023-11-21)


### Bug Fixes

* xl width on grid is now respected ([0eb61a6](https://github.com/zthun/fashion/commit/0eb61a6ae1f3394f8191dde44019ed39670d8d2f))



## [2.1.0](https://github.com/zthun/fashion/compare/v2.0.0...v2.1.0) (2023-11-21)


### Features

* adding favicon ([dab6d6a](https://github.com/zthun/fashion/commit/dab6d6a106f17267f7f66f6ae4496bbf51c8e7d0))
* grid components can now specify width in addition to height ([060461c](https://github.com/zthun/fashion/commit/060461c63f7d59b972e1ae3af492afc9db07db9e))
* the default theme is now the dark theme ([042d548](https://github.com/zthun/fashion/commit/042d548597e253cce9d6b87d1dfbd114fac60490))


### Bug Fixes

* not found should now scale to its content ([1347e4e](https://github.com/zthun/fashion/commit/1347e4e15c0f664af41a9f4e46d09e077ae76719))



## [2.0.0](https://github.com/zthun/fashion/compare/v0.12.0...v2.0.0) (2023-11-21)


### ⚠ BREAKING CHANGES

* update to release
* commit to release

### Features

* commit to release ([9b644f5](https://github.com/zthun/fashion/commit/9b644f5a26d17525f335984adf1e685208f48992))
* update to release ([248cf83](https://github.com/zthun/fashion/commit/248cf834b17fe6b3c727bb9eac320fd89bf269a2))



## [0.12.0](https://github.com/zthun/fashion/compare/v0.11.1...v0.12.0) (2023-11-21)


### Features

* box can now have justification ([309112b](https://github.com/zthun/fashion/commit/309112b2a7fe827b91b320a15329414fca573ced))
* image page displays a demo of image functionality ([6e893a0](https://github.com/zthun/fashion/commit/6e893a0ff909bfc32d501e4e7b26d505ce8a7bb6))



## [0.11.1](https://github.com/zthun/fashion/compare/v0.11.0...v0.11.1) (2023-08-17)

**Note:** Version bump only for package @zthun/fashion





## [0.11.0](https://github.com/zthun/fashion/compare/v0.10.2...v0.11.0) (2023-08-16)


### Features

* update webigail ([18a37e9](https://github.com/zthun/fashion/commit/18a37e988cfacafe0453c6d73979fda1cfd23dc2))



## [0.10.2](https://github.com/zthun/fashion/compare/v0.10.1...v0.10.2) (2023-08-16)


### Bug Fixes

* helpful no longer bundles uuid ([a498685](https://github.com/zthun/fashion/commit/a498685f08e0d5d723b38b4127aea219abd81c4d))



## [0.10.1](https://github.com/zthun/fashion/compare/v0.10.0...v0.10.1) (2023-08-12)

**Note:** Version bump only for package @zthun/fashion





## [0.10.0](https://github.com/zthun/fashion/compare/v0.9.1...v0.10.0) (2023-08-12)


### Features

* popup component displays content in a pop bubble ([e1a9a3b](https://github.com/zthun/fashion/commit/e1a9a3bc95802f17b5f112201646240e0532668f))
* popup page demos the popup button and popup component ([f70b8fd](https://github.com/zthun/fashion/commit/f70b8fda6ba1285b68b79eadbc81851956f55f01))



## [0.9.1](https://github.com/zthun/fashion/compare/v0.9.0...v0.9.1) (2023-08-07)


### Bug Fixes

* grid view rogue div element ([9df5d54](https://github.com/zthun/fashion/commit/9df5d5439d4bcdf23a28f8d5f80a16b72fd05f9a))
* list item dividers live in an li tag ([0fdd6f7](https://github.com/zthun/fashion/commit/0fdd6f79ed023efce2d1bf7d3da00203e83cb712))
* list item elements in dark mode show up with correct colors ([c18d90c](https://github.com/zthun/fashion/commit/c18d90c33bdf6f884562040b5e607d27eb90735c))



## [0.9.0](https://github.com/zthun/fashion/compare/v0.8.0...v0.9.0) (2023-07-26)


### Features

* grid view now uses a more button for pagination ([dd58c33](https://github.com/zthun/fashion/commit/dd58c330b982490683def92377aad14bc70376e7))
* table is no longer supported by labs ([bf251c0](https://github.com/zthun/fashion/commit/bf251c0d5e07eb74fd749434af87f780c88cf4de))
* usePageView has been moved to helpful-react ([70e21b1](https://github.com/zthun/fashion/commit/70e21b1d92b14037f7b5f28efb491ac6cc212bb8))



## [0.8.0](https://github.com/zthun/fashion/compare/v0.7.0...v0.8.0) (2023-07-22)


### Features

* bubble can now be focused and clicked ([f86baf0](https://github.com/zthun/fashion/commit/f86baf0465cf958b46f85036a100ea908b036579))
* bubble page demos the bubble component ([3381002](https://github.com/zthun/fashion/commit/33810021c529b5416bf79f634824b80ce46ba720))
* fashion can now have hover and focus overrides ([f0bd9a0](https://github.com/zthun/fashion/commit/f0bd9a02680f1eb2843d1df0997d2a432c9f2ae5))
* fashion theme now has an inherit utility ([e239642](https://github.com/zthun/fashion/commit/e23964216fc84a0abbee43934c119d7d2fc50df6))



## [0.7.0](https://github.com/zthun/fashion/compare/v0.6.2...v0.7.0) (2023-07-22)


### Features

* add support for border colors and auto colors based on main color ([5884457](https://github.com/zthun/fashion/commit/58844571297fa57efd971b3e41c31fc7d6caf31e))
* fromRgb, toRgb, brighten, luminance, and contrast ([723002a](https://github.com/zthun/fashion/commit/723002af33225db53886d4016ace4ba9d80cfc0f))
* grids can now justify items ([570c5de](https://github.com/zthun/fashion/commit/570c5defe43f623e88b7d8f1fc02bb9cb77ccb9d))
* stacks can now be inline flex as well as flex ([21cc6b5](https://github.com/zthun/fashion/commit/21cc6b5eec6d193c7ca3fcbffbda4690c5f92d0a))


### Bug Fixes

* boutique page now renders all components equally ([fdcbbd1](https://github.com/zthun/fashion/commit/fdcbbd11de6cd5d07d00813f309658d5c283cd48))



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
* carousel page demos the carousel component ([5e66ab5](https://github.com/zthun/fashion/commit/5e66ab5374c0d29cce7a1773b817827ecfea1069))
* compact demo ([6cf9840](https://github.com/zthun/fashion/commit/6cf984009789d6a615ef13d2d3feb18271f7c043))
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

* chart page demos the chart components ([84bb9ab](https://github.com/zthun/fashion/commit/84bb9abf3ee8891136d97d25837630bf8750d4cc))
* charts allow for easy data visualizations ([7772c4c](https://github.com/zthun/fashion/commit/7772c4c1e96d414e816b9dfc32993ef48b778bb8))



## [0.3.1](https://github.com/zthun/fashion/compare/v0.3.0...v0.3.1) (2023-07-08)


### Bug Fixes

* loosen the constraints on the custom theme ([db54398](https://github.com/zthun/fashion/commit/db54398b4c2b6689f2ea4f6ea0936ac3208e8d0e))



## [0.3.0](https://github.com/zthun/fashion/compare/v0.2.0...v0.3.0) (2023-07-08)


### Features

* custom can now be set ([9981142](https://github.com/zthun/fashion/commit/998114220955c556df378279769cf4d3464434d1))
* you can now specify a custom fashion extension on the createStyleHook ([5de273f](https://github.com/zthun/fashion/commit/5de273f08bb0409eef1cdc2c2ca40bb9d90cf5fc))
* you can now specify the custom style when retrieving the fashion theme ([4559905](https://github.com/zthun/fashion/commit/45599050c66b1c48635f3da3f989e86e385a9b90))


### Bug Fixes

* dark mode no longer blends cards into parent on grid view page ([b10c03d](https://github.com/zthun/fashion/commit/b10c03d98502989a573ec098d11d6cd5f62e11f9))



## [0.2.0](https://github.com/zthun/fashion/compare/v0.1.2...v0.2.0) (2023-06-23)


### Features

* modal allows for isolated work ([a07b25d](https://github.com/zthun/fashion/commit/a07b25ddef6fa33299d7e81f179a66c615a3c645))
* modal can support fashion ([1742904](https://github.com/zthun/fashion/commit/1742904ed784df624ce79ad1fc3b0680b7fd7037))
* modal page demos the modal component ([703039f](https://github.com/zthun/fashion/commit/703039f72e675b8b698b7756c74f3bb4cd1f12e9))
* you can change the fashion of modals ([75afc6f](https://github.com/zthun/fashion/commit/75afc6f96f9b2f80e928dcbeef2ab1d7226bcb27))


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

* a line item layout gives a 0-1-0 flex layout with a prefix-body-suffix form ([fd3386c](https://github.com/zthun/fashion/commit/fd3386c323a0292d2b88facd57625c99eb670e27))
* a styled layout component enables child components to have the context theme ([4f63966](https://github.com/zthun/fashion/commit/4f6396622d67601186b9c952e852d84687d37370))
* added base component patterns ([808663c](https://github.com/zthun/fashion/commit/808663c153e2d819fc507037487c6c817560908b))
* added card component ([7523b5f](https://github.com/zthun/fashion/commit/7523b5fcd6ee16d6be16967f0949936b7b9170dd))
* added e2e tests ([4d13562](https://github.com/zthun/fashion/commit/4d13562548d4f657cad5d3f4a118a9f0f3ab6bb0))
* alert page demos alerts ([e44c681](https://github.com/zthun/fashion/commit/e44c681b2d59aedb20378f9cdfe1bd7c4b398445))
* alerts show fashionable blocks ([7b5493b](https://github.com/zthun/fashion/commit/7b5493ba5e040d40cbd13d2ea122f5a266590404))
* blueberry theme ([93bf606](https://github.com/zthun/fashion/commit/93bf6065d724e1f119d494798ff87a492b592807))
* boolean component handles check states ([679ac05](https://github.com/zthun/fashion/commit/679ac0563a4d092bbe8b2ca71c226cea5ab421ee))
* boolean components can be fashionable ([e8152fe](https://github.com/zthun/fashion/commit/e8152fe4d9c5bad3d6a2d3030131c34692661440))
* booleans can be required in a form ([14d903d](https://github.com/zthun/fashion/commit/14d903d5e3082ffc04896e0f9d797c7556b1b384))
* border layout supports a bordered block of content ([20b0a4b](https://github.com/zthun/fashion/commit/20b0a4bb18468fc71d4407157b592ffac05977dd))
* box allows for easy margins and padding between sections ([f125aeb](https://github.com/zthun/fashion/commit/f125aeb1b05aa84cc20daed7cb79366f38891fe5))
* breadcrumbs location allows home navigation ([5b3740f](https://github.com/zthun/fashion/commit/5b3740ff277731a3eed9900431f939b57482eaf3))
* breadcrumbs support names ([4ffaff2](https://github.com/zthun/fashion/commit/4ffaff26a6093e6ae3ccc9472451c99dc1c309ba))
* build descriptive named routes ([583f6bc](https://github.com/zthun/fashion/commit/583f6bcfc3e9684ed857148a1c511967f2340676))
* buttons can be compact ([3652302](https://github.com/zthun/fashion/commit/3652302699d4c7c93d2dd59daf0d876571a81cc5))
* card allows you to place elements in a card layout ([55a90b8](https://github.com/zthun/fashion/commit/55a90b867d9feb1467a213032f784fc91eea6a37))
* cards can be in a loading state ([cad62e5](https://github.com/zthun/fashion/commit/cad62e54750e01984310822bc88124dc7ff830d8))
* cards can be loading ([e76bc16](https://github.com/zthun/fashion/commit/e76bc162f284691be7cb4cc7fd1fb9473126c61a))
* cards can have fashion ([0a5853c](https://github.com/zthun/fashion/commit/0a5853ca51ed18121280c2a9654529de37de98fb))
* change theme ([5cdc987](https://github.com/zthun/fashion/commit/5cdc987a02d5c52eb115fd6992e379422b7b30b7))
* choice component can have orientation ([5c9de66](https://github.com/zthun/fashion/commit/5c9de662f7d67f2b5eb1a3378e40be4478913840))
* choice components can be required in a form ([839735a](https://github.com/zthun/fashion/commit/839735a4978e207d17c0430f025ccf84c93ce5ea))
* choice toggle supports choices with toggle buttons ([a460f00](https://github.com/zthun/fashion/commit/a460f00c5e85cfce05810eac2fb1ef514a28d1cd))
* component fashion ([4a92ae7](https://github.com/zthun/fashion/commit/4a92ae7214a80685e6cc21e86d52e93e3c9604e7))
* components can require interaction to move forward ([36d0d08](https://github.com/zthun/fashion/commit/36d0d0838ff63e4d4f6251de372ab52dc48f3ccf))
* dark theme package ([6a659bf](https://github.com/zthun/fashion/commit/6a659bf32800d12b6e2d63eb417497ffdc53877d))
* data source components ask how to retrieve data ([476b80a](https://github.com/zthun/fashion/commit/476b80a32e56c59cff2d304cf75c611fef53957c))
* designer has objects for positioning ([33bd0fe](https://github.com/zthun/fashion/commit/33bd0fee8a7c48697ba6910b7b1e3cb9895a2f69))
* drawer allows for pop out content ([79cec51](https://github.com/zthun/fashion/commit/79cec51f7a3253a0bfcffcad51f95871f4d4cf61))
* edit a request with the request editor ([0dc3790](https://github.com/zthun/fashion/commit/0dc3790ea4158e694d8dc768d26e15293f6c1773))
* experimental warning ([af6fd44](https://github.com/zthun/fashion/commit/af6fd4422966e1adf43b06ffa081c23a83eabca5))
* fashion app routes to designer, venue, and runway ([77cbfa3](https://github.com/zthun/fashion/commit/77cbfa3329fe7d231d35b7e8a5f1f8f14fcb7ce2))
* fashion grid showcases the current color scheme ([85fcff8](https://github.com/zthun/fashion/commit/85fcff8435e381572ba45a65f63efd229c311b04))
* fashion runway constructs page layouts based on components in the venue ([d79ec9c](https://github.com/zthun/fashion/commit/d79ec9c7280651cb8bf873af7ec355d344739e0d))
* fashion tailor constructs size charts for common sizes ([1d90ee7](https://github.com/zthun/fashion/commit/1d90ee74cc94148f6876fe5fdb36192c4ff03867))
* fashion-react comes with a default palette and scheme ([6000009](https://github.com/zthun/fashion/commit/6000009497f77379b50fe064c5a44cb2004d57f0))
* font awesome table icons have support for families ([08a65df](https://github.com/zthun/fashion/commit/08a65df622a89b348585bd15401b6b66bad6d1e9))
* font based icons load quickly ([790cd2e](https://github.com/zthun/fashion/commit/790cd2e18c641943c6e8d8e79149090df048f3ad))
* grid demo can show an error state ([4c179bc](https://github.com/zthun/fashion/commit/4c179bcaad5a52452e2eaeeb0763a14e2be30717))
* grid layout allows you to align items in a 2d grid ([7663bdd](https://github.com/zthun/fashion/commit/7663bddd62e493c631294a4435306ee975156747))
* grid view demo now shows in a card ([5e8d6e7](https://github.com/zthun/fashion/commit/5e8d6e7762f63aa6cf8f3210772211aeae61bead))
* grid view is a data source based grid ([3559e2f](https://github.com/zthun/fashion/commit/3559e2ff9e300eb9e0087fd635a83b1422b5eca4))
* grid view page demos the grid view ([de86e92](https://github.com/zthun/fashion/commit/de86e92cbebcec9a65d1cd86a2cd7593f862c8d0))
* icons can be clickable ([e149791](https://github.com/zthun/fashion/commit/e149791def157bb5d208a24b8f4f3af83c061d17))
* icons can be clicked and have tab navigation ([e12e08e](https://github.com/zthun/fashion/commit/e12e08e69f94d40d9630eb54920264d41cf8489f))
* label component allows to display emphasized content ([174f20a](https://github.com/zthun/fashion/commit/174f20a0b31d0be8f4947c4e28dc49322e1ffc31))
* labeled components can be oriented horizontally or vertically ([041925b](https://github.com/zthun/fashion/commit/041925ba325af2c3e4c3177430f6d9d50e2464a1))
* labels can display a required flag ([375689a](https://github.com/zthun/fashion/commit/375689adf6d2e64ddc7098dc92fca986352cc88d))
* labels for form inputs ([d688255](https://github.com/zthun/fashion/commit/d688255f42a6b9eca6a12a1e16fe6a7d6a2021b9))
* list lays out items vertically based on inner layouts ([4cabe0e](https://github.com/zthun/fashion/commit/4cabe0e52e6b84f289ffeeb606abd2c9b095cc03))
* not found is an easy reusable 404 page ([493ad86](https://github.com/zthun/fashion/commit/493ad86d998da02222522caa27566a65aea2e73b))
* number components can be required ([67382b8](https://github.com/zthun/fashion/commit/67382b8367d0846cfac7f26ff986639fe5032683))
* opposite colors contrast the core theme ([c50717b](https://github.com/zthun/fashion/commit/c50717b9d31cb274123e0ea906614278dffc237d))
* orientation allows for components to have different layouts but keep the same logic ([37e5dd9](https://github.com/zthun/fashion/commit/37e5dd9006d9a7f4b5bd9e5bd65de9ab78556903))
* pagination can be displayed vertically ([b3a2107](https://github.com/zthun/fashion/commit/b3a2107dac433e00f2fac79b867605f10e161fec))
* pagination component allows for paged content ([dac022f](https://github.com/zthun/fashion/commit/dac022f6a6f2573edbe83c1fcbd4fc3f080cb7c7))
* paginator can be disabled ([d7f4d66](https://github.com/zthun/fashion/commit/d7f4d66f2b3bc87742b3aa718d166d102430d0b2))
* push buttons let the user invoke actions ([45cf16a](https://github.com/zthun/fashion/commit/45cf16a2a11d8a71ff0b597a273fa3f70241724a))
* rendering centered fullscreen content is possible with Grid ([6f4ca4a](https://github.com/zthun/fashion/commit/6f4ca4a028094f92e1aa12578f61b67dc9cab08f))
* route map app defines routing with common pages ([eef4119](https://github.com/zthun/fashion/commit/eef411994f31b30d0359da7f619c53e04497f82a))
* router supports declarative routing ([7eb74be](https://github.com/zthun/fashion/commit/7eb74bef8cf0aaa4c131ec2fc1bbd7b05069dc4b))
* select fashion on the typography page ([8dec3c7](https://github.com/zthun/fashion/commit/8dec3c7ab486a738b197316577ef89726a1c237c))
* stacks utilize elements on a 1 dimensional line ([a245a23](https://github.com/zthun/fashion/commit/a245a23707a3f46319439576f26e5b13c1fb6e1b))
* status code page allows you to display errors from http services ([7b013c4](https://github.com/zthun/fashion/commit/7b013c4b2db38d45b63538b16b3a3fd15f8a8d9e))
* support name and orientation ([318c985](https://github.com/zthun/fashion/commit/318c98534b49bcd9861d17881f13cddd6e66d1d1))
* suspense allows for a way to notify users that something is happening in the background ([9296719](https://github.com/zthun/fashion/commit/9296719e8de23d8a44ae7cdb0bc4d71a17221439))
* suspense can have fashion ([eac1a52](https://github.com/zthun/fashion/commit/eac1a5246a64a4bfb572d2a87beb33d84190260c))
* suspense progress uses animated progress bars ([1eef95c](https://github.com/zthun/fashion/commit/1eef95cebc0342a02ca3ece44c12fe87f1efd6ac))
* swap main and contrast in a fashion configuration ([b0960cc](https://github.com/zthun/fashion/commit/b0960cc9699dd1e04b0e4010b429cec719fb444b))
* table allows for tabular data ([fe130ff](https://github.com/zthun/fashion/commit/fe130ff12911e18a4bcec61acf05f4d3aa9aa0ea))
* table page allows for table options ([d933c04](https://github.com/zthun/fashion/commit/d933c047974b14289b5a0d99da248a0e987c1148))
* table shows page size and loaded through footer ([3a10e4b](https://github.com/zthun/fashion/commit/3a10e4b097e9aac626df82b1a04c0048b96d4b22))
* table supports infinite scroll ([313123f](https://github.com/zthun/fashion/commit/313123f0b259feb22ada20871747c5a083238dc4))
* table supports virtualized scroll ([9e9c963](https://github.com/zthun/fashion/commit/9e9c9636ac44f6639e91db0d258f20b4b2c3d715))
* tailor and device help with margins, paddings, borders, and breakpoints ([a3ea2d6](https://github.com/zthun/fashion/commit/a3ea2d68688321139223bdcca099a5788314279b))
* the boolean page demos checkboxes and switches ([b0252ab](https://github.com/zthun/fashion/commit/b0252abdd32d2f9cf07ad739f4d1ee583702d696))
* the boolean page demos the required option ([3e26b4e](https://github.com/zthun/fashion/commit/3e26b4e4273f39efe50bb8e685637c9ee331c234))
* the button page demos the button component ([bbbca52](https://github.com/zthun/fashion/commit/bbbca520e2b3d03539e426e20a8e16c86b45651e))
* the choice component lets you select from a list of options ([28281d7](https://github.com/zthun/fashion/commit/28281d795c538eeead91e81a000910b4a7f064b2))
* the choice page demos the choice component ([932c18c](https://github.com/zthun/fashion/commit/932c18c142170be47df141dfcaddd03cf5f3c86f))
* the drawer page demos the drawer component ([5ff5224](https://github.com/zthun/fashion/commit/5ff5224b548d49c459efce14bbb7821ecf256698))
* the image source displays images depending on the source data ([d7c802a](https://github.com/zthun/fashion/commit/d7c802aee4665600ad6fe5bd790c9880cdd93cb2))
* the list page demos the list component ([b01a96e](https://github.com/zthun/fashion/commit/b01a96e6a6f4a6a3e8b7d26fda524c6196ab35d8))
* the number component adds spinner support ([52b8e91](https://github.com/zthun/fashion/commit/52b8e914b226488b188c87eaa458eec24dee84e7))
* the number page demos the number components ([d1e80c9](https://github.com/zthun/fashion/commit/d1e80c9aacef42f8a81fa46790b353a74f941b57))
* the suspense page demos the suspense component ([a372fe9](https://github.com/zthun/fashion/commit/a372fe97d8fba2267cb53c230416c301d2fdbb68))
* the table has a built in toolbar for search ([c1a70d6](https://github.com/zthun/fashion/commit/c1a70d65906fbddaa08f31a29b48098c9be56f5e))
* the table scrolls horizontally ([a1fb1be](https://github.com/zthun/fashion/commit/a1fb1be98ae3d20e36f280fccea434c205048b64))
* the text color component can change the underlying text color ([54cc8f7](https://github.com/zthun/fashion/commit/54cc8f7ca2607c43ce3393dfa9f44d965087dd22))
* the text component allows simple string inputs ([bd0579c](https://github.com/zthun/fashion/commit/bd0579ceb87e99f197025dfc6df26852d6d1a379))
* the text page demos the text components ([bb9d6ae](https://github.com/zthun/fashion/commit/bb9d6aec9ed88a6e03620fc89df71b48ee67da86))
* the theme can be overridden ([2c24810](https://github.com/zthun/fashion/commit/2c2481065aa824bbe8983d9e839f950d8b2da6cb))
* the web application demos all components found in the fashion project ([cd4c639](https://github.com/zthun/fashion/commit/cd4c639f91ac9e06eb55795715e065ae91b1884d))
* theme page allows for demoing different out-of-box themes ([c59bc0d](https://github.com/zthun/fashion/commit/c59bc0dd07242ac19e5c6f24b002f69b6b4e7397))
* toggle supports clear ([14ffdf0](https://github.com/zthun/fashion/commit/14ffdf006d0962be700a43d2f42dd8bd3d15462f))
* toggle the required flag on the label for choice components ([938fedb](https://github.com/zthun/fashion/commit/938fedb6a2260aa6b8f43b92dd83cdffee3be075))
* typography demo page shows the semantic views of each element ([c2196d4](https://github.com/zthun/fashion/commit/c2196d42ebe756c8fada399e853bcfb27847a339))
* typography describes semantics of page articles ([5933dd7](https://github.com/zthun/fashion/commit/5933dd705c5fd82108342c0c2f478fb52ddb0a54))
* useFashion retrieves a named fashion ([7dc2c72](https://github.com/zthun/fashion/commit/7dc2c72d02716ac9f9270eaddc1866a15ce8e645))
* venue page describes the components available ([c2e6209](https://github.com/zthun/fashion/commit/c2e6209ac3a6917742863c589ae32322218025ca))
* width and height can vary on different devices ([8293234](https://github.com/zthun/fashion/commit/8293234bb7a472372cab6e33df776f624e24e8f2))


### Bug Fixes

* choice now supports dark mode ([cb5d646](https://github.com/zthun/fashion/commit/cb5d6469eb2944c0f5e404f20f07852064c558e9))
* font size for icons has to be important ([a8ec222](https://github.com/zthun/fashion/commit/a8ec222651772a8a7575b42b7dc382f1369870be))
* text should no longer commit when the value remains the same ([5ec5072](https://github.com/zthun/fashion/commit/5ec50722ade0ea3bfe215df55b3750225b7b2e50))
