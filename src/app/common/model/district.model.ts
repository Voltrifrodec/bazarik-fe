import { Region } from "./region.model";

export interface District {
	id: number;
	name: string;
	postcode: string;
	region: Region;
}
