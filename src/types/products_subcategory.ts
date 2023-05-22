export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_productsSubCategory {
	primaryPhoto?: ComplexImage,
	slug?: string,
	description?: string,
	name: string,
	dm_baseEntityCount?: string,
	dm_childEntityIds?: string[],
	dm_directoryChildren?: EntityReference[],
	dm_directoryManagerId?: string,
	dm_directoryParents?: EntityReference[],
	id: string,
}
