import successResponse from "../../Utils/response/success.response.js";


export const profile = async (req, res) => {
    return successResponse({
        res, statusCode: 200,
        message: "User profile fetched successfully",
        data: req.user
    });
}