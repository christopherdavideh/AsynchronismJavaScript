const BASE_API = "https://rickandmortyapi.com/api/";
const character = `${BASE_API}character/`;
const title = document.getElementById("title");
const image = document.getElementById("image");
const detail = document.getElementById("detail");
const detail_p = document.getElementById("details_p");

let count=1;

const fetchData = (API) => {
    if(API !== ""){
        return fetch(API)
            .then(res => res.json())
            .then(data => data);
    } else {
        return "Origin unknown";
    }
}


const printData = async (character_id) => {
    try {
        const count_character = await fetchData(character);
        const data_character = await fetchData(`${character}${character_id}`);
        const location_character = await fetchData(data_character.origin.url);
        const episode_character = await fetchData(data_character.episode[0]);
        title.textContent = data_character.name;
        image.src = data_character.image;
        const species = data_character.species;
        const gender = data_character.gender;
        const status = data_character.status;
        console.log(episode_character)
        detail_p.innerHTML = ` <p>
            <b>Species: </b>${species}<br>
            <b>Gender: </b>${gender}<br>
            <b>Status: </b>${status}<br>
            <b>Type: </b>${data_character.type}<br>
            <b>Origin: </b>${location_character.name ? location_character.name : "Unknown"}<br>
            <b>Origin Type: </b>${location_character.type ? location_character.type : "Unknown"}<br>
            <b>Dimension: </b>${location_character.dimension ? location_character.dimension : "Unknown"}<br>
            <b>First Appear: </b>${episode_character.episode ? episode_character.episode : "Unknown"} - ${episode_character.name ? episode_character.name : "Unknown"} <br>
            <b>Air Date: </b>${episode_character.air_date ? episode_character.air_date : "Unknown"}<br>
            <b>Episodes on Appears: </b>${data_character.episode.length} episodes<br><br>
            <left><b>${data_character.id} / ${count_character.info.count}</b></left>
        </p>`;
        detail.appendChild(detail_p);
        console.log(data_character);
    } catch (error) {
        console.error(error);
    }
}

printData(1);

function loadNext(){
    count += 1;
    if (count > 826){
        count = 1;
    }
    printData(count);
}

function loadPrev(){
    count -= 1;
    if (count < 1){
        count = 826;
    }
    printData(count);
}
