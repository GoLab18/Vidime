export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc'
}

export function fetchSortString(sortField: string, sortOrder: SortOrder): string {
    return `sort=${sortField},${sortOrder}`;
}