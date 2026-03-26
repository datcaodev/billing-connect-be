"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
class BaseModel {
    async executeQuery(handleRequest) {
        try {
            return await handleRequest();
        }
        catch (error) {
            throw `${error} in ${this.constructor.name}`;
        }
    }
}
exports.BaseModel = BaseModel;
//# sourceMappingURL=baseModel.core.js.map