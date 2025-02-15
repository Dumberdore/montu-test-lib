# QuickRoute's Address Suggestion API 

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
