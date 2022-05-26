import { HOST } from '../../assets/hosts/hosts';
import RestApiClient from '../../assets/rest-client/rest-client'

const endpoint = {
    login: '/log-in',
    register: '/register',
    getAuthenticatedUser: '/user',
    generateVerificationCode:'/generate-verification-code',
    checkVerificationCode:'/check-verification-code',
    logout: 'log-out'
}

function logIn(usernameAndPassword, callback) {
    let request = new Request(HOST.backend_api + endpoint.login , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usernameAndPassword)
    });

    RestApiClient.performRequest(request, callback);
}

function register(user, callback) { 
    let request = new Request(HOST.backend_api + endpoint.register , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    RestApiClient.performRequest(request, callback);
}

function generateVerificationCode(email, callback) { 
    let request = new Request(HOST.backend_api + endpoint.generateVerificationCode , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(email)
    });

    RestApiClient.performRequest(request, callback);
}

function checkVerificationCode(emailAndVerificationCode, callback) { 
    let request = new Request(HOST.backend_api + endpoint.checkVerificationCode , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailAndVerificationCode)
    });

    RestApiClient.performRequest(request, callback);
}

export{
    logIn,
    register,
    generateVerificationCode,
    checkVerificationCode
}