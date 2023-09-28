//Only 1017 pokemon, use mod operator on index to make everything work. so index % 1018

//Storage of all hex values, for when a set a pokemon
let text_to_hex = {
    normal: "#A8A77A",
    fire:"#EE8130",
    water: "#6390F0",
    electric: "F7D02C",
    grass: "7AC74C",
    ice: "96D9D6",
    fighting: 'C22E28',
    poison: 'A33EA1',
    ground: 'E2BF65',
    flying: 'A98FF3',
    psychic: 'F95587',
    bug: 'A6B91A',
    rock: 'B6A136',
    ghost: '735797',
    dragon: '6F35FC',
    dark: '705746',
    steel: 'B7B7CE',
    fairy: 'D685AD'
};
let current_pokemon = 1;
//Below var can equal either moves or info
let current_info = "info";
//Ensures that if you go left it will wrap around
function betterMod(a,b) {
    if (a < 0) {
        return (b + a) % b;
    }
    return a % b;
}

const URL = `https://pokeapi.co/api/v2/pokemon/${betterMod(current_pokemon,1018)}/`;
//Image: JSON_OBJECT.sprites.front_default
//Name: JSON_OBJECT.name

//Created an ASYNC function to fetch data
async function fetchData() {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
}

//HTML Elements that are often used
let image = Document.getElementById("img");
let name = Document.getElementById("name");
let types_container = Document.getElementById("inner-types-container");

function updateData(data) {
    //Data is a json object

}

