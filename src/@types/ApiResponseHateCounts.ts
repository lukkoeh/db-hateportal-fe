export type ApiResponseHateCounts = {
    data: Array<{
        id: number;
        attributes: {
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
        };
    }>;
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}