import { Category } from "./category.model";

export interface Subcategory {
	id: number;
	name: string;
	category: Category | undefined;
}
