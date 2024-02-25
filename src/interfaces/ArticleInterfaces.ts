export interface ArticleListItemInterface {
    id: number,
    type: string,
    title: string,
    image: string,
    images: string[],
    totalPlaces: number
    places: []
}

export interface ArticleDetailsInterface {
    id: number,
    type: string,
    title: string,
    description: string,
    image: string,
    images: string[],
    totalPlaces: number
    places: []
}
