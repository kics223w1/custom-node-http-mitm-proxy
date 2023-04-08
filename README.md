# Description

- Special thanks to Joeferner for creating the great [node-http-mitm-proxy](https://github.com/joeferner/node-http-mitm-proxy) library
- This rewrite library allows you can get the full request body before the `onRequest` event is triggered
- I.e. If the request body doesn't meet your condition, you can prevent it to proceed to the real server.
- If you want to see what I have changed please check out [this pull request](https://github.com/kics223w1/custom-node-http-mitm-proxy/commit/12d8d94a127ac06182d8dcbcafbaa224a82df7de)

# Install

[![NPM version](https://img.shields.io/npm/v/custom-node-http-mitm-proxy.svg)](https://www.npmjs.com/package/custom-node-http-mitm-proxy)
[![](https://david-dm.org/joeferner/node-http-mitm-proxy.svg)](https://www.npmjs.com/package/custom-node-http-mitm-proxy)

`npm i custom-node-http-mitm-proxy`

# Example

```ts
proxy.onRequest(function (ctx, callbackOnRequest) {
  let requestBody: Buffer[] = [];

  ctx.onRequestData(function (ctx, chunk, callback) {
    requestBody.push(chunk);
    callback(null, chunk);
  });

  ctx.onRequestEnd(function (ctx, callback) {
    const rawBody = Buffer.concat(requestBodyBuffer);

    console.log("Request body before event onRequest has triggered: ", rawBody);

    // If the body doesn't meet your condition, just stop the process
    // ctx.proxyToClientResponse.end("Stop the request");

    callbackOnRequest();
  });
});
```


# License

```
Copyright (c) 2015 Joe Ferner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:



The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.



THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
