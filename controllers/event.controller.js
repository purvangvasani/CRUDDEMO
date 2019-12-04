const EventService = require("../services/event.service");
const helper = require("../data/constants");

module.exports = {
    getBy: getBy,
    add: add,
    edit: edit,
    remove: remove
};

async function getBy(req, res, next) {
    try {
        let result = await EventService.getBy(JSON.parse(req.params.criterion));
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}

async function add(req, res, next) {
    try {
        if (req.body) {
            let result = await EventService.add(req.body);
            res.json(result);
        } else {
            res.json({ success: false, status: helper.error.status.InternalServerError, message: helper.error.message.InternalServerError, error: null });
        }
    } catch (e) {
        res.json(e);
    }
}

async function edit(req, res, next) {
    try {
        if (req.body) {
            let result = await EventService.edit(req.body);
            res.json(result);
        } else {
            res.json({ success: false, status: helper.error.status.InternalServerError, message: helper.error.message.InternalServerError, error: null });
        }
    } catch (e) {
        res.json(e);
    }
}

async function remove(req, res, next) {
    try {
        if (req.body) {
            let result = await EventService.remove(req.body);
            res.json(result);
        } else {
            res.json({ success: false, status: helper.error.status.InternalServerError, message: helper.error.message.InternalServerError, error: null });
        }
    } catch (e) {
        res.json(e);
    }
}