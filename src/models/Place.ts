export default interface Place {
    id: number,
    title: string,
    coords: GeoPoint,
    radius: number,
}

export interface ApiPlace {
    id: number,
    title: string,
    latitude: number,
    longitude: number,
    radius: number,
}

export interface GeoPoint {
    latitude: number,
    longitude: number,
}
