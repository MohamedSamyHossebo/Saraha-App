export const successResponse = ({ res, message = "Success", data = {}, statusCode = 200 }) => {
    return res.status(statusCode).json({
        message,
        data,
    });
}
export default successResponse;