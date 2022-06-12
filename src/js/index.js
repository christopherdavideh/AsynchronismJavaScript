let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = "https://rickandmortyapi.com/api/character/";

/* Callbacks */
function fetchData(url_api, callback){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", url_api, true);
    xhttp.onreadystatechange = function (event){
        if (xhttp.readyState === 4 ) {
            if (xhttp.status === 200) {
                callback(null, JSON.parse(xhttp.responseText));
            } else {
                const error = new Error("Error " + url_api);
                return callback(error, null);
            }
        }
    }
    xhttp.send();
}

fetchData(API, function( error1, all_data){
    if (error1) return console.error(error1);
    fetchData(API + all_data.results[0].id, function(error2, charter_data){
        if (error2) return console.error(error2);
        fetchData(charter_data.origin.url, function(error3, location_data){
            if (error3) return console.error(error3);
            console.log(all_data.info.count);
            console.log(charter_data)
            console.log(location_data);
        });
    });
});


const https = require("https");
const API_BASE = 'https://rickandmortyapi.com/api/';

const APIRequest = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            res.setEncoding('utf8');
            if(res.statusCode === 200) {
                let body = '';
                res.on('data', (data) => {
                    body += data;
                });
                res.on('end', () => { 
                    resolve(JSON.parse(body));
                });
            } else reject(new Error(`REQUEST ERROR ON ${url}. Status ${res.statusCode}`));
        });
    });
}


/* Promise */
APIRequest(API_BASE + 'character/')
    .then((response) => {
        console.log(response.info.count)
        return APIRequest(API_BASE + 'character/' + response.results[0].id);
    })
    .then((response) => {
        console.log(response.name)
        return APIRequest(response.origin.url);
    })
    .then((response) => {
        console.log(response.dimension)
    })
    .catch((error) => console.error(error));

/* Asyn await*/
const anotherFunction = async (url_api) => {
    try {
        const data = await APIRequest(url_api);
        const character = await APIRequest(`${url_api}${data.result[0].id}`);
        const origin = await APIRequest(character.origin.url);
        console.log(data.info.count);
        console.log(character.name);
        console.log(origin.dimension);
    } catch (error) {
        console.error(error)
    }
}