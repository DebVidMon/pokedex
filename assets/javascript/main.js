const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 0;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return ` <div class="col">
    <div class="card poke ${pokemon.type}">
    <div class="row g-0">
        <div class="col-md-6 p-1">
            <img id="pokemonImg" src="${pokemon.photo}" class="img-fluid rounded-start" alt="${pokemon.name}">
        </div>
        <div class="col-md-6 p-2">
            <class="card-body">
                <h5>#${pokemon.number} - ${pokemon.name}</h5>
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                </ol>
            </div>
        </div>
        
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