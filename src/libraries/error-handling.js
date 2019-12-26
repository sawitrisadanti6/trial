class ErrorHandling {

    static checkErrorTokenExpired = (data) => {

        return data.statusCode === 400;

    };

}

export default ErrorHandling;