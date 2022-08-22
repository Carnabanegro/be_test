const uModule = require("../model/uModule");
const {createHash} = require('crypto');


const create = async (id, permissions, content) => {

const newModule = new uModule({
        id: createHash('sha256').update(permissions).digest("hex"),
        permissions: permissions,
        content: content,
    });
    return await newModule.save();

}


module.exports = uModuleService;
