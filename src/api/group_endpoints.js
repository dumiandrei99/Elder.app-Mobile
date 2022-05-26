import { HOST } from '../../assets/hosts/hosts';
import RestApiClient from '../../assets/rest-client/rest-client'

const endpoint = {
    recommendGroups: '/recommend-groups',
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

export{
    recommendGroups
}