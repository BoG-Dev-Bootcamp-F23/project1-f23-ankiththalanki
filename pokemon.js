//Only 1017 pokemon, use mod operator on index to make everything work. so index % 1018
/**
 * Questions / Revelations:
 * Always put # before hex color
 * Case matters its document not Document, also difference between front-image and front_image, 
 * Why do we need a main function in this situation?
 */
//Storage of all hex values, for when a set a pokemon
let text_to_hex = {
    normal: "#A8A77A",
    fire:"#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
};
let current_pokemon = 0;
//Below var can equal either moves or info
let current_info = "info";
//Ensures that if you go left it will wrap around
function betterMod(a,b) {
    if (a < 0) {
        return (b + a) % b;
    }
    return a % b;
}


//Image: JSON_OBJECT.sprites.front_default
//Name: JSON_OBJECT.name

//Created an ASYNC function to fetch data
async function fetchData() {
    const URL = `https://pokeapi.co/api/v2/pokemon/${betterMod(current_pokemon,1017) + 1}/`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

//HTML Elements that are often used
const content_title = document.getElementById("content-name");
const image = document.getElementById("pokemon-img");
const pokemon_name = document.getElementById("name");
const types_container = document.getElementById("inner-types-container");
const content = document.getElementById("content");
const info_button = document.getElementsByClassName("info")[0];
const moves_button = document.getElementsByClassName("moves")[0];
const left = document.getElementById("left");
const right = document.getElementById("right");
//Create html info for info and moves content
const info_content = document.createElement("span");
const moves_content = document.createElement("span");


function switchContent(content_type) {
    if (content_type === "moves") {
        content.innerHTML = "";
        content.appendChild(moves_content);
        current_info = "moves";
        content_title.innerText = "Moves";
    }else if (content_type === "info") {
        content.innerHTML = "";
        content.appendChild(info_content);
        current_info = "info";
        content_title.innerText = "Info";
    }
}

 function updateData(data) {
    //Data is a json object
    
    //Update Image
    image.setAttribute("src",data.sprites.front_default);
    image.setAttribute("alt",data.name);
    //Update Name
    pokemon_name.textContent = data.name;
    // Update Types
    //Clear previous Types container
    types_container.innerHTML = "";
    //Create a list that contains all the types
    const listOfTypes = data.types;
    let element;
    listOfTypes.forEach((type) => {
        element = document.createElement("div");
        element.classList.add('type');
        element.textContent = type.type.name;
        //Set color
        element.style.backgroundColor = text_to_hex[type.type.name];
        //Add to Type container
        types_container.appendChild(element);
    });
    //Clear prior moves content
    moves_content.innerHTML = '';
    //Update Moves with first 10 moves, or however many there are
    const moves = data.moves;
    for (let i = 0; i < Math.min(data.moves.length,14); i++) {
        moves_content.innerHTML += (data.moves[i].move.name + "<br>");
    }
    //Clear prior Info content and give height
    info_content.innerHTML = "height: " + (Math.round(data.height * 10 + Number.EPSILON) / 100).toString() + "m <br>";
    info_content.innerHTML += "weight: " + (Math.round(data.weight * 10 + Number.EPSILON) / 100).toString() + "kg <br>";
    const stats = data.stats;
    stats.forEach((stat) => {
        info_content.innerHTML +=(stat.stat.name + ": "+ stat.base_stat.toString() + "<br>" );
    });
    //Sets content to either info or move content
    switchContent(current_info);
}
async function main() {


    let data =  await fetchData();
    console.log(data);
    updateData(data);
}

main();

//Event listening stuff
//Info Button
info_button.addEventListener("click", (event) => {
    if (current_info === "moves") {
        info_button.setAttribute("id","selected-button");
        moves_button.removeAttribute("id");
        switchContent("info");
    }
});
//Moves Button
moves_button.addEventListener("click", (event) => {
    if (current_info === "info") {
        moves_button.setAttribute("id","selected-button");
        info_button.removeAttribute("id");
        switchContent("moves");
    }
});

//Update Pokemon Chosen
left.addEventListener("click",(event) => {
    current_pokemon-=1;
     main();
});

right.addEventListener("click",(event) => {
    current_pokemon+=1;
     main();
});