# SamiDB API
An [NPM](https://npmjs.org) Module for [SamiDB's image API](https://api.samidb.xyz/)

# Installation
```sh
npm install samidbapi
#or
yarn add samidbapi
```

# Usage

```js
const SamiDBApi = require("samidbapi");

const apiClient = new SamiDBApi();

// Gets data from the corn endpoint and logs it to the console.
apiClient.corn.then(console.log);
```