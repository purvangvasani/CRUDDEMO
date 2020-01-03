var PokemonController = require('../../controllers/pokemon.controller');

module.exports = function (apiRoutes) {
    apiRoutes.get('/pokemon/getBy/:criterion', PokemonController.getBy);
    apiRoutes.post('/pokemon/add', PokemonController.add);
    apiRoutes.post('/pokemon/edit', PokemonController.edit);
    apiRoutes.post('/pokemon/remove', PokemonController.remove);
}