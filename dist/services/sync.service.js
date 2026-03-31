"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncService = void 0;
const sync_repository_1 = require("../repositories/sync.repository");
class SyncService {
    async refreshViews() {
        await sync_repository_1.syncRepository.refreshMaterializedViews();
    }
}
exports.syncService = new SyncService();
//# sourceMappingURL=sync.service.js.map