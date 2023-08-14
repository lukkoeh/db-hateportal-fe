import { DbLoveApiClient } from "../clients/dbLoveApiClient";

export class DbLoveService {
    private hateApiClient: DbLoveApiClient = new DbLoveApiClient()

    public async getTotalDbLovers(): Promise<number> {
        try {
            const response = await this.hateApiClient.getTotalDbLovers();
            return response.meta.pagination.total;
        } catch (err) {
            console.error("Error fetching total haters:", err);
            throw err;
        }
    }

    public increase(): void {
        try {
            this.hateApiClient.increase();
        } catch (err) {
            console.error("Error increasing hate count:", err);
        }
    }
}
