import assert from 'tjs:assert'
import path from 'tjs:path'

const { TEST_EXIT_OK } = await import(path.join(import.meta.dirname, '../../../../scripts/lib/harness-codes.js'))
const { createEchoServer } = await import(path.join(import.meta.dirname, '../../../../scripts/lib/echo-server.js'))

const { server, baseUrl } = createEchoServer()
const BINARY_SIZE = 90

async function basicFetch() {
    const r = await fetch(`${baseUrl}/get`);
    assert.eq(r.status, 200, 'status is 200');
};

async function abortFetch() {
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => {
        controller.abort();
    }, 500);
    try {
        await fetch(`${baseUrl}/delay/3`, { signal });
    } catch (e) {
        assert.eq(e.name, 'AbortError', 'fetch was aborted');
    }
};

async function fetchWithPostAndBody() {
    const data = JSON.stringify({ foo: 'bar', bar: 'baz' });
    const r = await fetch(`${baseUrl}/post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    assert.eq(r.status, 200, 'status is 200');
    const json = await r.json();
    assert.eq(JSON.stringify(json.data), data, 'sent and received data match');
};

async function fetchBinaryWithArrayBuffer() {
    const url = `${baseUrl}/bytes/${BINARY_SIZE}`;
    const resp = await fetch(url, {
        headers: {
            'Content-Type': 'application/octet-stream',
        },
    });
    assert.eq(resp.status, 200, 'status is 200');
    const imageBuffer = await resp.arrayBuffer();
    assert.eq(imageBuffer.byteLength, BINARY_SIZE, 'arrayBuffer has expected length');
};

async function runTests() {
    await basicFetch();
    await abortFetch();
    await fetchWithPostAndBody();
    await fetchBinaryWithArrayBuffer();
}

(async () => {
    let exitCode = TEST_EXIT_OK;
    try {
        await runTests();
    } catch (e) {
        console.error(e && e.stack ? e.stack : e);
        exitCode = 1;
    }
    try {
        await server.close();
    } catch {
        // ignore
    }
    tjs.exit(exitCode);
})();
