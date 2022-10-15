
## fetch
The Fetch API provides an interface for fetching resources (including across the network). It will seem familiar to anyone who has used XMLHttpRequest, but the new API provides a more powerful and flexible feature set. It hosts the [http-fetch-standard](https://fetch.spec.whatwg.org/#http-fetch)

### Usage

```js
const r = await fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: data
});
const json = await r.json();
```

### Demo
test/jsruntime/network