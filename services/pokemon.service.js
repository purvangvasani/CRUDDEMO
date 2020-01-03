const helper = require("../data/constants");
const PokemonCollection = require("../models/pokemon.model");
const UploadPokemonImageService = require("./upload-pokemon-image.service");
const mongoose = require('mongoose');

var _ = require('lodash');

module.exports = {
    getBy: getBy,
    add: add,
    edit: edit,
    remove: remove
};

function getBy(criteria) {
    let promiseFunction = async (resolve, reject) => {
        try {
            let cr = null;
            let condition = [];
            if (criteria) {

                if (criteria && criteria.refId) {
                    condition.push({ $match: { _id: mongoose.Types.ObjectId(criteria.refId) } });
                };

                if (criteria && criteria._id) {
                    condition.push({ $match: { _id: mongoose.Types.ObjectId(criteria._id) } });
                };

                if (criteria && criteria.name) {
                    condition.push({ $match: { name: criteria.name } });
                };

                if (criteria && criteria.description) {
                    condition.push({ $match: { description: criteria.description } });
                };

                if (criteria && criteria.height) {
                    condition.push({ $match: { height: criteria.height } });
                };

                if (criteria && criteria.weight) {
                    condition.push({ $match: { weight: criteria.weight } });
                };

                if (criteria && criteria.sort) {
                    condition.push({ $sort: criteria.sort });
                } else {
                    condition.push({ $sort: { updatedAt: 1 } });
                }

            } else {
                condition.push({ $sort: { updatedAt: 1 } });
            }

            cr = await PokemonCollection.aggregate(condition).allowDiskUse(true).exec();

            if (criteria && (criteria.refId || criteria._id)) {
                cr = cr && cr.length ? cr[0] : {};
            }
            resolve({ success: true, status: helper.success.status.OK, message: 'Success!', data: cr });
        } catch (e) {
            reject({ success: false, status: helper.error.status.InternalServerError, message: helper.error.message.InternalServerError, error: e });
        }
    };
    return new Promise(promiseFunction);
}

function add(req, res) {
    let promiseFunction = async (resolve, reject) => {
        try {

            let imageFileDetails;
            try {
                imageFileDetails = await UploadPokemonImageService.readFileFromRequest(req);

                if (
                    !imageFileDetails ||
                    !imageFileDetails.data ||
                    !imageFileDetails.data.body ||
                    !imageFileDetails.data.fileDetails ||
                    !Object.keys(imageFileDetails.data.body) ||
                    !Object.keys(imageFileDetails.data.fileDetails) ||
                    !Object.keys(imageFileDetails.data.body).length ||
                    !Object.keys(imageFileDetails.data.fileDetails).length ||

                    !imageFileDetails.data.body.description ||
                    !imageFileDetails.data.body.height ||
                    !imageFileDetails.data.body.imageName ||
                    !imageFileDetails.data.body.imagePath ||
                    !imageFileDetails.data.body.name ||
                    !imageFileDetails.data.body.reqType ||
                    !imageFileDetails.data.body.weight ||

                    !imageFileDetails.data.fileDetails.destination ||
                    !imageFileDetails.data.fileDetails.encoding ||
                    !imageFileDetails.data.fileDetails.fieldname ||
                    !imageFileDetails.data.fileDetails.filename ||
                    !imageFileDetails.data.fileDetails.mimetype ||
                    !imageFileDetails.data.fileDetails.originalname ||
                    !imageFileDetails.data.fileDetails.path ||
                    !imageFileDetails.data.fileDetails.size
                ) {
                    reject({ success: false, message: 'Error in saving data', error: null });
                    return;
                }

                let data = imageFileDetails.data.body;

                let existing = await getBy({ name: data.name });
                if (existing && existing.success && existing.data && (existing.data.length || existing.data._id)) {
                    reject({ success: false, message: 'Pokemon exist, try with another name.', error: null });
                    return;
                }
                data.imagePath = 'http://localhost:3000/files/' + imageFileDetails.data.fileDetails.filename;
                data.imageName = imageFileDetails.data.fileDetails.filename;
                data.height = (!isNaN(+data.height)) ? +data.height : 0;
                data.weight = (!isNaN(+data.weight)) ? +data.weight : 0;
                let pokemon = new PokemonCollection(data);
                let result = await pokemon.save();
                if (!result || !result._id) {
                    reject({ success: false, message: 'Error in saving data', error: null });
                    return;
                }

                resolve({ success: true, message: 'data saved', data: result });
            } catch (e) {
                reject({ success: false, message: 'Error in saving data', error: e });
                return;
            }

        } catch (e) {
            reject({ success: false, message: 'Error in saving data', error: e });
        }

    }
    return new Promise(promiseFunction);
}

function edit(req) {
    let promiseFunction = async (resolve, reject) => {
        try {

            let imageFileDetails;
            imageFileDetails = await UploadPokemonImageService.readFileFromRequest(req);

            if (
                !imageFileDetails ||
                !imageFileDetails.data ||
                !imageFileDetails.data.body ||
                !imageFileDetails.data.fileDetails ||
                !Object.keys(imageFileDetails.data.body) ||
                !Object.keys(imageFileDetails.data.body).length ||

                !imageFileDetails.data.body.description ||
                !imageFileDetails.data.body.height ||
                !imageFileDetails.data.body.imageName ||
                !imageFileDetails.data.body.imagePath ||
                !imageFileDetails.data.body.name ||
                !imageFileDetails.data.body.reqType ||
                !imageFileDetails.data.body.weight ||
                !imageFileDetails.data.body._id
            ) {
                reject({ success: false, message: 'Error in saving data', error: null });
                return;
            }

            let data = imageFileDetails.data.body;
            let refId = data._id;
            delete data._id;
            delete data._v;

            if (
                Object.keys(imageFileDetails.data.fileDetails) &&
                Object.keys(imageFileDetails.data.fileDetails).length &&
                imageFileDetails.data.fileDetails.destination &&
                imageFileDetails.data.fileDetails.encoding &&
                imageFileDetails.data.fileDetails.fieldname &&
                imageFileDetails.data.fileDetails.filename &&
                imageFileDetails.data.fileDetails.mimetype &&
                imageFileDetails.data.fileDetails.originalname &&
                imageFileDetails.data.fileDetails.path &&
                imageFileDetails.data.fileDetails.size
            ) {
                data.imagePath = 'http://localhost:3000/files/' + imageFileDetails.data.fileDetails.filename;
                data.imageName = imageFileDetails.data.fileDetails.filename;
                data.height = (!isNaN(+data.height)) ? +data.height : 0;
                data.weight = (!isNaN(+data.weight)) ? +data.weight : 0;
            }

            let result = await PokemonCollection.findOneAndUpdate({ _id: refId }, data);

            if (!result || !result._id) {
                reject({ success: false, message: 'Error in saving data', error: null });
                return
            }

            resolve({ success: true, message: 'data saved', data: result });
        } catch (e) {
            reject({ success: false, message: 'Error in saving data', error: e });
        }
    }
    return new Promise(promiseFunction);
}

function remove(data) {
    let promiseFunction = async (resolve, reject) => {
        try {
            if (!data._id) {
                reject({ success: false, message: 'Error in removing data', error: null });
                return
            }

            let result = await PokemonCollection.findOneAndRemove({ _id: data._id }).exec();
            if (!result || !result._id) {
                reject({ success: false, message: 'Error in removing data', error: null });
                return
            }
            resolve({ success: true, message: 'data removed', data: result });
        } catch (e) {
            reject({ success: false, message: 'Error in removing data', error: e });
        }
    }
    return new Promise(promiseFunction);
}