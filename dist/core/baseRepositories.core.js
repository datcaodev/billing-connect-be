"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRespository = void 0;
class BaseRespository {
    async handleWithTryCatch(handleRequest) {
        // eslint-disable-next-line no-useless-catch
        try {
            return await handleRequest();
        }
        catch (error) {
            throw error;
        }
    }
}
exports.BaseRespository = BaseRespository;
//# sourceMappingURL=baseRepositories.core.js.map