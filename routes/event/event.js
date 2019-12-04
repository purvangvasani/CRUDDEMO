var EventController = require('../../controllers/event.controller');

module.exports = function (apiRoutes) {
    apiRoutes.get('/posts/getBy/:criterion', EventController.getBy);
    apiRoutes.post('/posts/add', EventController.add);
    apiRoutes.post('/posts/edit', EventController.edit);
    apiRoutes.post('/posts/remove', EventController.remove);
}