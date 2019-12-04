export class AppEvent {
    _id?: string;
    name?: string;
    description?: string;
    category?: string;
    status?: string;

    constructor(
        _id?: string,
        name?: string,
        description?: string,
        category?: string,
        status?: string,
    ) {
        this._id = _id || '';
        this.name = name || '';
        this.description = description || '';
        this.category = category || '';
        this.status = status || '';
    }
}