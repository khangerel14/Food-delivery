const GoogleMap_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

type MapOptions = {
    googleMapApiKey: any
}
export const mapOptions: MapOptions = {
    googleMapApiKey: GoogleMap_API_KEY,
}