export class NotFoundException extends Error {
	constructor(message = "Resource not found") {
		super(message);
		this.name = "NotFoundException";
		Object.setPrototypeOf(this, NotFoundException.prototype);
	}
}

export class BadRequestException extends Error {
	constructor(message = "Bad request") {
		super(message);
		this.name = "BadRequestException";
		Object.setPrototypeOf(this, BadRequestException.prototype);
	}
}