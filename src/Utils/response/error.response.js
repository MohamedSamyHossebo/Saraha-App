export const errorResponse = ({ message = "error", status = 400, extra = undefined }) => {
    const error = new Error(typeof message === "string" ? message : message?.message || "Error");
    error.status = status;
    error.extra = extra;
    throw error;
}

export const badRequest = ({ message = "Bad Request", extra = undefined }) => errorResponse({ message, status: 400, extra });
export const unauthorized = ({ message = "Unauthorized", extra = undefined }) => errorResponse({ message, status: 401, extra });
export const forbidden = ({ message = "Forbidden", extra = undefined }) => errorResponse({ message, status: 403, extra });
export const notFound = ({ message = "Not Found", extra = undefined }) => errorResponse({ message, status: 404, extra });
export const conflict = ({ message = "Conflict", extra = undefined }) => errorResponse({ message, status: 409, extra });
export const internalServerError = ({ message = "Internal Server Error", extra = undefined }) => errorResponse({ message, status: 500, extra });
export const serviceUnavailable = ({ message = "Service Unavailable", extra = undefined }) => errorResponse({ message, status: 503, extra });

export const globalErrorHandler = (err, req, res, next) => {
    const status = err.status ?? 500;
    return res.status(status).json({ message: err.message, stack: err.stack, status: status })
}