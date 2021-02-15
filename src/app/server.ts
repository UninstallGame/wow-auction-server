const http = require('http');

export class Server {

    private tmp = {};

    private hostname = '127.0.0.1';
    private port = 3000;

    public create(): void {
        const server = http.createServer((req: any, res: any) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(this.tmp);
        });

        server.listen(this.port, this.hostname, () => {
            console.log(`Server running at http://${this.hostname}:${this.port}/`);
        });
    }
}
