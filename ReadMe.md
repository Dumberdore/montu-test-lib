# QuickRoute's Address Suggestion API 

[![version](https://img.shields.io/npm/v/montu-test-lib.svg?style=flat-square)](https://npmjs.org/montu-test-lib)
[![min size](https://img.shields.io/bundlephobia/min/montu-test-lib?style=flat-square)](https://bundlephobia.com/result?p=montu-test-lib)
[![mingzip size](https://img.shields.io/bundlephobia/minzip/montu-test-lib)](https://bundlephobia.com/result?p=montu-test-lib)
[![license](https://img.shields.io/npm/l/montu-test-lib?color=%23007a1f&style=flat-square)](https://github.com//Dumberdore/blob/master/LICENSE)

[![dependancies](https://img.shields.io/librariesio/release/npm/montu-test-lib?color=%23007a1f&style=flat-square)](https://libraries.io/npm/montu-test-lib)
[![downloads](https://img.shields.io/npm/dm/montu-test-lib?style=flat-square&color=%23007a1f)](https://npmcharts.com/compare/montu-test-lib)

![NPM Publish](https://github.com/Dumberdore/montu-test-lib/actions/workflows/publish.yaml/badge.svg)

###### :clap: & :heart: to [auto badger](https://github.com/technikhil314/auto-badger) for making badging simple

[//]: <> (end placeholder for auto-badger)


## Usage
```js
const tomTomProvider = new TomTomProvider({ apiKey: 'your_api_key_here' });
const addressService = new AddressService(tomTomProvider);
addressService.getSuggestions('1600 Amphitheatre', { limit: 5, countryCode: 'AU' })
  .then((suggestions) => console.log(suggestions))
  .catch((error) => console.error(error));

```

## prerequisites 🛠️
- Install NodeJs / NPM
```shell
# On MacOS, using Homebrew
brew install node@20
brew install npm
```
- Install Axios - https://www.npmjs.com/package/axios
```shell
npm install --save-dev typescript @types/node tsup vitest axios axios-mock-adapter
```

## Usage
- Build 🧱
```shell
npm run build
```

- Test 🧪
```shell
npm test
```

# Publish to NPM repository 📦
- Update the lib version in [package.json](package.json)
- Tag and commit
```shell
git tag <version>
git push origin --tags
```
- Create a release on the repo, [github-action](.github/workflows/publish.yaml) should build, test and publish to npm.

## References
1. How to Write a TypeScript Library  https://simonboisset.com/blog/create-typescript-library-tsup
