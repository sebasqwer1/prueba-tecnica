export interface PaginatedListWithOffset <T> {
    Data: T[];
    PageNumber: number;
    TotalCount: number;
}