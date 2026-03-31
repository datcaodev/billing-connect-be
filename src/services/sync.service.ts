import { syncRepository } from "../repositories/sync.repository";

class SyncService {
    public async refreshViews(): Promise<void> {
        await syncRepository.refreshMaterializedViews();
    }
}

export const syncService = new SyncService();
