const input = document.getElementById("inp");

const pokemonName = document.getElementById("name");
const pokemonNumber = document.getElementById("number");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonType = document.getElementById("type");
const pokemonSprite = document.getElementById("sprite");
const pokemonAbilities = document.getElementById("Abilities");


const fetchPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(response.status == 200) {
        const data = await response.json();
        console.log(data);
        return data
    }
}

const render = async (pokemon) => {
    pokemonName.innerHTML = "Loading";
    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = `N° ${("000" + data.id).slice(-4)}`;
        pokemonWeight.innerHTML = `${data.weight/10}kg`;
        pokemonHeight.innerHTML = `${data.height/10}m`;
        pokemonSprite.src = data['sprites']['other']['official-artwork']['front_default'];
        pokemonAbilities.innerHTML = "<span>Abilities: </span>";
        data.abilities.forEach(ability => {
            let abName = ability.ability.name;
            pokemonAbilities.innerHTML += abName.charAt(0).toUpperCase() + abName.slice(1) + " ";
        });
        if(data.types.length == 1) {
            let type = data.types[0].type.name;
            pokemonType.innerHTML = type.charAt(0).toUpperCase() + type.slice(1);
        } else {
            let type1 = data.types[0].type.name;
            let type2 = data.types[1].type.name;
            pokemonType.innerHTML = `${type1.charAt(0).toUpperCase() + type1.slice(1)}/${type2.charAt(0).toUpperCase() + type2.slice(1)}`;
        }
    } else {
        pokemonName.innerHTML = "Could not find";
    }

    renderWeakAndAdv(data);
}

const renderWeakAndAdv = async (pokemon) => {
    const weaknessContainer = document.querySelector("#dis");
    const advantagesContainer = document.querySelector("#adv");
   
    weaknessContainer.innerHTML = '';
    advantagesContainer.innerHTML = '';
   

    const typ = await getType(pokemon);
    setTimeout( () => {
       
        getDamage(typ)
       
        danoRecebido.forEach( (tipo, i) => {
           
            if(tipo >= 1.5){
               
                const div = document.createElement("div");

                div.classList.add("FloatingButton");

               
                div.innerHTML = danoRecebido[i - 1];

                weaknessContainer.appendChild(div);

            }
        })
        console.log(danoCausado);
        danoCausado.forEach( (tipo, i) => {
            if(tipo >= 1.5){

                const div = document.createElement("div");

                div.classList.add("FloatingButton");

                div.innerHTML = danoCausado[i - 1];

                advantagesContainer.appendChild(div);

               
            }
        })




    }, 10);
}


input.addEventListener("change", async () => {
    await render(input.value);
})
