module.exports = {
    success: {
        status: {
            OK: 200
        },
        message: {
            OK: 'The request was successful, and results may be obtained in the response body'
        }
    },
    error: {
        status: {
            NoContent: 204,
            BadRequest: 400,
            NotFound: 404,
            InternalServerError: 500
        },
        message: {
            NoContent: 'The request was successful, but the response body is empty as nothing deemed important should be returned.',
            BadRequest: 'The server wasn not able to understand the request. It is possibly missing required parameters or has parameters with values of an invalid type. The response should include an error object with more information.',
            NotFound: 'The endpoint is not valid, or a resource represented by the request does not exist.',
            InternalServerError: 'Some unhandled server error has been occurred'
        },
    }
};