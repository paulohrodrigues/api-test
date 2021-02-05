export default class Repository{

    constructor(schema){
        this.schema = schema;
    }

    save(data) {
        return new Promise( async (resolve, reject) => {
            let SC = this.schema.prototype.model;
            resolve(await (new SC(data)).save() );
        });
    }
}