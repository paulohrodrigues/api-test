export default class Logic {
    constructor(params, options){
        this.params     = params;
        this.options    = options;
    }
    async save(subParams={}){
        try {
            this.params = {
                ...this.params,
                ...subParams
            };
            let children = {};
            for(let child of this.options.child){
                children[child.name] = (await child.logic.save({}))._id;
            }
            return await this.options.db.save({
                ...children,
                ...this.params
            });
        } catch(err) {
            throw err;
        }
    }
}
