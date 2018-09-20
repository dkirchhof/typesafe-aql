import { Filter } from ".";

export interface IQueryOptions{
    variable: string;
    filters: Filter[];
    limit: number | null;
    schema: object | null;
}