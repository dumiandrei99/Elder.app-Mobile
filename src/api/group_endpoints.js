import { HOST } from '../../assets/hosts/hosts';
import RestApiClient from '../../assets/rest-client/rest-client'

const endpoint = {
    recommendGroups: '/recommend-groups',
    addUserToGroup: '/add-user-to-group',
    savePrefferences: '/save-prefferences',
    groupsAlreadyIn: '/groups-a-user-is-in',
    getAllGroups: '/get-all-groups'
}

function recommendGroups(prefferences, callback) {
    let request = new Request(HOST.backend_api + endpoint.recommendGroups , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(prefferences)
    });

    RestApiClient.performRequest(request, callback);
}

function addUserToGroup(user, callback) {
    let request = new Request(HOST.backend_api + endpoint.addUserToGroup , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    RestApiClient.performRequest(request, callback);
}

function savePrefferences(userAndPrefferences, callback) {
    let request = new Request(HOST.backend_api + endpoint.savePrefferences , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userAndPrefferences)
    });

    RestApiClient.performRequest(request, callback);
}

function groupsAlreadyIn(user, callback) {
    let request = new Request(HOST.backend_api + endpoint.groupsAlreadyIn , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    RestApiClient.performRequest(request, callback);
}

function getAllGroups(callback) {
    let request = new Request(HOST.backend_api + endpoint.getAllGroups , {
        method: 'GET',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    RestApiClient.performRequest(request, callback);
}

export{
    recommendGroups,
    addUserToGroup,
    savePrefferences,
    groupsAlreadyIn,
    getAllGroups
}