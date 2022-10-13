const pokemonCount = 649;
let pokedex = {}; // {494: {"name" : "Victini", "img" : url, "type" : ["Psychic", "Fire"], "desc" : "...."}}


window.onload = async function() {
    // getPokemon(494);
    for(let i = 494; i <= pokemonCount; i++) {
        await getPokemon(i);
        // <div id="1" class="pokemon-name">VICTINI<div>
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", (element) => {setPokemon(element.target.id)});
        document.getElementById("pokemon-list").append(pokemon);
    }
    document.getElementById("pokemon-description").innerText = pokedex[494]["description"];

    // console.log(pokedex);
}

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
    
    let response = await fetch(url);
    let pokemon = await response.json();
    // console.log(pokemon);

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonGif = pokemon["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];

    response = await fetch(pokemon["species"]["url"]);
    let pokemonDescription = await response.json();

    pokemonDescription = pokemonDescription["flavor_text_entries"][5]["flavor_text"];


    pokedex[num] = {"name" : pokemonName, "img" : pokemonGif, "types" : pokemonType, "description" : pokemonDescription};
}

// function updatePokemon() {
//     document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

//     // Clear pokemon type
//     let typesDiv = document.getElementById("pokemon-types");
//     while(typesDiv.firstChild) {
//         typesDiv.firstChild.remove();
//     }
//     // Update types
//     let types = pokedex[this.id]['types'];
//     for (let i = 0; i < types.length; i++) {
//         let type = document.createElement("span");
//         type.innerText = types[i]["type"]["name"].toUpperCase();
//         type.classList.add("type-box");
//         type.classList.add(types[i]["type"]["name"]); //Adds background-color and font-color
//         typesDiv.append(type)
//     }
//     //Update description
//     document.getElementById("pokemon-description").innerText = pokedex[this.id]["description"];
// }

function setPokemon(id) {
    document.getElementById("pokemon-img").src = pokedex[id]["img"];

    // Clear pokemon type
    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }
    // Update types
    let types = pokedex[id]['types'];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); //Adds background-color and font-color
        typesDiv.append(type)
    }
    //Update description
    document.getElementById("pokemon-description").innerText = pokedex[id]["description"];
}

function randomPokemon(min, max) {
    min = Math.ceil(494);
    max = Math.floor(649);
    return Math.floor(Math.random() * (max - min) + min);
}

const button = document.getElementById("random");
button.addEventListener("click", () => setPokemon(randomPokemon()));




