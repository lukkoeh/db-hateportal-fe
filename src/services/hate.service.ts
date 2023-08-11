import { HateApiClient } from "../clients/hateApi.client";

export class HateService {
    private hateApiClient: HateApiClient = new HateApiClient()

    public async getTotalHaters(): Promise<number> {
        try {
            const response = await this.hateApiClient.getTotalHaters();
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
