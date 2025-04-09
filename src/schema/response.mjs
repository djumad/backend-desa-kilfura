export class ResponseException extends Error {
    constructor(status, detail) {
        super(detail);
        this.status = status;
        this.detail = detail;
        this.name = 'ResponseException';
    }
}