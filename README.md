Demo of [Next.js](https://github.com/zeit/next.js) and TypeScript

## What doesn't work :(

[![Greenkeeper badge](https://badges.greenkeeper.io/jagreehal/next-typescript.svg)](https://greenkeeper.io/)

Can't pass additional setting to [ignore tsx files](https://github.com/zeit/next.js/blob/master/server/hot-reloader.js#L138) so app is updated twice    

## My approach

* Watch and compile tsx to js (ES6) for Next to process
* VSCode workspace setting to hide js files

