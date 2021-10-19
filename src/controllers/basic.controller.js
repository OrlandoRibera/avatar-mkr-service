/**
 * Common response function to standardize the API responses
 * @param req
 * @param res
 * @param status Value from response status of the request
 * @param message The message for the user
 * @param data
 * @returns {*}
 */
exports.commonResponse = (req, res, status = 200, message, data = {}) => {
    const response = {
        message,
        data
    };
    return res.status(status).send(response);
};