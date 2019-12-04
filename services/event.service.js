const helper = require("../data/constants");
const PostCollection = require("../models/post.model");

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

                if (criteria && criteria.refId && helper.util.isValidMongooseObject(criteria.refId)) {
                    condition.push({ $match: { _id: mongoose.Types.ObjectId(criteria.refId) } });
                };

                if (criteria && criteria.name) {
                    condition.push({ $match: { name: criteria.name } });
                };

                if (criteria && criteria.description) {
                    condition.push({ $match: { description: criteria.description } });
                };

                if (criteria && criteria.category) {
                    condition.push({ $match: { category: criteria.category } });
                };

                if (criteria && criteria.status) {
                    condition.push({ $match: { status: criteria.status } });
                };

                if (criteria && criteria.sort) {
                    condition.push({ $sort: criteria.sort });
                } else {
                    condition.push({ $sort: { updatedAt: 1 } });
                }

            } else {
                condition.push({ $sort: { updatedAt: 1 } });
            }

            cr = await PostCollection.aggregate(condition).allowDiskUse(true).exec();

            if (criteria && criteria.refId) {
                cr = cr && cr.length ? cr[0] : {};
            }
            resolve({ success: true, status: helper.success.status.OK, message: 'Success!', data: cr });
        } catch (e) {
            reject({ success: false, status: helper.error.status.InternalServerError, message: helper.error.message.InternalServerError, error: e });
        }
    };
    return new Promise(promiseFunction);
}

function add(data) {
    let promiseFunction = async (resolve, reject) => {
        try {
            if (!data || !data.name || !data.description || !data.category || !data.status) {
                reject({ success: false, message: 'Error in saving data', error: null });
                return
            }

            let post = new PostCollection(data);
            let result = await post.save();
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

function edit(data) {
    let promiseFunction = async (resolve, reject) => {
        try {
            if (!data || !data._id || !data.name || !data.description || !data.category || !data.status) {
                reject({ success: false, message: 'Error in saving data', error: null });
                return
            }
            let refId = data._id;
            delete data._id;
            delete data._v;

            let result = await PostCollection.findOneAndUpdate({ _id: refId }, data);

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

            let result = await PostCollection.findOneAndRemove({ _id: data._id }).exec();
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