import { Filter } from "./Filter";

export interface IQueryOptions{
    variable: string;
    filters: Filter[];
    limit: number | null;
    schema: object | null;
}