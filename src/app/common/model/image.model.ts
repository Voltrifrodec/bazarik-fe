export interface Image {
	id: number;
	originalFileName: string;
	type: string;
	originalWidth: number;
	originalHeight: number;
	originalSizeBytes: number;
	width: number;
	height: number;
	sizeBytes: number;
	image: Blob;
}
