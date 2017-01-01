# rxsc-redux-compat

This RxSC addon creates a Redux store that mirrors the RxSC container, allowing
you to use many of the available dev tools made for redux, perhaps most notably
the Redux devtools.

## Installation

With npm

```sh
$ npm install --save rxsc-redux-compat
```

With yarn

```sh
$ yarn add rxsc-redux-compat
```

## Usage

```javascript
import { createMirroredReduxStore } from 'rxsc-redux-compat';
import devToolsEnhancer from 'remote-redux-devtools';
import container from './container';


createMirroredReduxStore(container, devToolsEnhancer());
```

