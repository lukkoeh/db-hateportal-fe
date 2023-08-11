import config from "../config";
import { ApiResponseHateCounts } from "../@types";

export class HateApiClient {
    private apiUrl: string = config.apiUrl;

    private async makeApiCall(endpoint: string, options: RequestInit): Promise<Response> {
        const response: Response = await fetch(`${this.apiUrl}/${endpoint}`, options);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response;
    }

    private handleError(err: any): never {
        console.error(err);
        throw err;
    }

    public async increase(): Promise<void> {
        try {
            await this.makeApiCall('hate-counts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
        } catch (err) {
            this.handleError(err);
        }
    }

    public async getTotalHaters(): Promise<ApiResponseHateCounts> {
        try {
            const response = await this.makeApiCall('hate-counts?pagination[pageSize]=1', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response.json();

        } catch (err) {
            this.handleError(err);
        }
    }
}
