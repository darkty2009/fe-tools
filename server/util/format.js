module.exports = function(success, data, message) {
    return {
        success: success ? true : false,
        data:data,
        message: message || ""
    };
}