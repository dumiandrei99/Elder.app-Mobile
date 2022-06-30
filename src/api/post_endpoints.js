import { HOST } from '../../assets/hosts/hosts';
import RestApiClient from '../../assets/rest-client/rest-client'
import axios from 'axios';

const endpoint = {
    addPost: '/add-post',
    getPostsForUser: '/get-posts-for-user',
    like: '/like',
    comment: '/comment',
    getComments: '/get-comments'
}

function addPost(formData, callback) {
    axios({
        method: "post",
        url: HOST.backend_api + endpoint.addPost,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
    .then(callback)
    .catch(function (response) {
        //handle error
        console.log(response);
    });
}

function getPostsForUser(user, callback) { 
    let request = new Request(HOST.backend_api + endpoint.getPostsForUser , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    RestApiClient.performRequest(request, callback);
}

function like(user_and_post, callback) { 
    let request = new Request(HOST.backend_api + endpoint.like , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user_and_post)
    });

    RestApiClient.performRequest(request, callback);
}

function comment(comment, callback) { 
    let request = new Request(HOST.backend_api + endpoint.comment , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment)
    });

    RestApiClient.performRequest(request, callback);
}

function getComments(post, callback) { 
    let request = new Request(HOST.backend_api + endpoint.getComments , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    });

    RestApiClient.performRequest(request, callback);
}


export {
    addPost,
    getPostsForUser,
    like,
    comment,
    getComments
}