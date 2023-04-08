const port = 8081;

import Proxy from "../";
const proxy = new Proxy();

proxy.onError((ctx, err, errorKind) => {
  // ctx may be null
  const url = ctx?.clientToProxyRequest?.url || "";

  console.error(`${errorKind} on ${url}:`, err);
});

proxy.onRequest((ctx, callbackOnRequest) => {
  let requestBodyBuffer: Buffer[] = [];

  proxy.onRequestData(function (ctx, chunk, callback) {
    requestBodyBuffer.push(chunk);
    callback(null, chunk);
  });

  proxy.onRequestEnd(function (ctx, callback) {
    const rawBody = Buffer.concat(requestBodyBuffer);

    console.log("Request body before event onRequest has triggered: ", rawBody);

    callbackOnRequest();
  });
});

proxy.listen({ port });
console.log(`listening on ${port}`);
