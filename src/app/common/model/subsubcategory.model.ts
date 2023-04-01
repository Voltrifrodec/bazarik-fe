import { Subcategory } from "./subcategory.model";

export interface Subsubcategory {
	id: number;
	name: string;
	subcategory: Subcategory;
}
