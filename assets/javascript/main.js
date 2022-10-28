const pokemonList = document.getElementsByClassName("pokemons");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 0;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return ` <div class="card poke mb-3 ${pokemon.type}">
    <div class="row g-0">
        <div class="col-md-7">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3"><img id="pokebola" src="../favicon-16x16.png" class="img-fluid rounded-start"alt="pokebola"></div>
                    <div class="col-md-9"><h5>#${pokemon.number} - ${pokemon.name}</h5></div>
                </div>
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                </ol>
            </div>
        </div>
        <div class="col-md-5">
            <img id="pokemonImg" src="${pokemon.photo}" class="img-fluid rounded-start"
                alt="${pokemon.name}">
        </div>
    </div>
</div>`;
}

function loadPokemonItens(limit, offset) {
    pokeApi.getPokemons(limit, offset).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(limit, offset)

loadMoreButton.addEventListener('click', () => {
    offset += 20;
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(newLimit, offset)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(limit, offset)
    }
})
