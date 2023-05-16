import { Category } from "./category.model";
import { Contact } from "./contact.model";
import { Currency } from "./currency.model";
import { District } from "./district.model";
import { Subcategory } from "./subcategory.model";
import { Subsubcategory } from "./subsubcategory.model";
import { Image } from "./image.model";
import { Region } from "./region.model";

export interface Advert {
	id: string;
	name: string;
	description: string;
	keywords: string;

	dateAdded: Date;
	dateModified: Date;

	priceEur: number;
	fixedPrice: boolean;
	currency: Currency;

	category: Category;
	subcategory?: Subcategory;
	subsubcategory?: Subsubcategory;

	contact: Contact;

	district: District;
	region: Region;

	image: Image;
}
