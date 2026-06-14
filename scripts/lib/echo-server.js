// Local httpbin-compatible echo server for offline fetch tests.

export function createEchoServer() {
    const server = tjs.serve({
        port: 0,
        fetch: async (req) => {
            const url = new URL(req.url);
            const pathname = url.pathname;

            const delayMatch = pathname.match(/^\/delay\/(\d+)$/);

            if (delayMatch) {
                const seconds = parseInt(delayMatch[1], 10);

                await new Promise((r) => setTimeout(r, seconds * 1000));

                return Response.json({ delay: seconds });
            }

            const bytesMatch = pathname.match(/^\/bytes\/(\d+)$/);

            if (bytesMatch) {
                const count = parseInt(bytesMatch[1], 10);
                const data = new Uint8Array(count);

                for (let i = 0; i < count; i++) {
                    data[i] = i & 0xff;
                }

                return new Response(data, {
                    headers: { 'Content-Type': 'application/octet-stream' },
                });
            }

            if (pathname === '/get' && req.method === 'GET') {
                return Response.json({ url: req.url });
            }

            if (pathname === '/post' && req.method === 'POST') {
                const contentType = req.headers.get('content-type') || '';
                const body = await req.text();
                let data;

                if (contentType.includes('application/json')) {
                    try {
                        data = JSON.parse(body);
                    } catch {
                        data = body;
                    }
                } else {
                    data = body;
                }

                return Response.json({ data, url: req.url });
            }

            return new Response('Not Found', { status: 404 });
        },
    });

    const baseUrl = `http://127.0.0.1:${server.port}`;

    return { server, baseUrl };
}
