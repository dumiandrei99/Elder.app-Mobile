import { HOST } from '../../assets/hosts/hosts';
import RestApiClient from '../../assets/rest-client/rest-client'
import axios from 'axios';

const endpoint = {
    addProfilePicture: '/add-profile-picture',
}

function addProfilePicture(formData, callback) {
    axios({
        method: "post",
        url: HOST.backend_api + endpoint.addProfilePicture,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
    .then(callback)
    .catch(function (response) {
        //handle error
        console.log(response);
    });
}



export {
    addProfilePicture,
}