export interface MapCoordinates {
    lat: number;
    lng: number;
}

export interface GoogleLatLng {
    lat(): number;
    lng(): number;
}

export interface GoogleMapsListener {
    remove(): void;
}

export interface GoogleMapInstance {
    addListener(
        eventName: string,
        handler: (event: GoogleMapMouseEvent) => void
    ): GoogleMapsListener;
    fitBounds(bounds: unknown): void;
    getBounds(): unknown;
    setCenter(position: MapCoordinates | GoogleLatLng): void;
    setZoom(zoom: number): void;
}

export interface GoogleMapMouseEvent {
    latLng: GoogleLatLng | null;
}

export interface GoogleAdvancedMarker {
    position: MapCoordinates | GoogleLatLng | null;
    addListener(eventName: string, handler: () => void): GoogleMapsListener;
}

export interface GoogleAddressComponent {
    longText?: string;
    long_name?: string;
    types: string[];
}

export interface GooglePlace {
    displayName?: string;
    formattedAddress?: string;
    location?: GoogleLatLng;
    viewport?: unknown;
    addressComponents?: GoogleAddressComponent[];
    fetchFields(options: { fields: string[] }): Promise<void>;
}

export interface GooglePlacePrediction {
    toPlace(): GooglePlace;
}

export interface GooglePlaceSelectEvent extends Event {
    placePrediction: GooglePlacePrediction;
}

export interface GooglePlaceAutocompleteElement extends HTMLElement {
    includedRegionCodes: string[];
    locationBias: { radius: number; center: MapCoordinates } | null;
    placeholder: string;
}

export interface GoogleGeocoderResult {
    formatted_address: string;
    address_components: GoogleAddressComponent[];
}

export interface GoogleGeocoder {
    geocode(request: { location: MapCoordinates }): Promise<{ results: GoogleGeocoderResult[] }>;
}

interface GoogleMapsLibrary {
    Map: new (
        element: HTMLElement,
        options: {
            center: MapCoordinates;
            zoom: number;
            mapId: string;
            mapTypeControl?: boolean;
            streetViewControl?: boolean;
        }
    ) => GoogleMapInstance;
}

interface GoogleMarkerLibrary {
    AdvancedMarkerElement: new (options: {
        map: GoogleMapInstance;
        position: MapCoordinates;
        gmpDraggable?: boolean;
        title?: string;
    }) => GoogleAdvancedMarker;
}

interface GooglePlacesLibrary {
    PlaceAutocompleteElement: new (options?: {
        includedPrimaryTypes?: string[];
    }) => GooglePlaceAutocompleteElement;
}

interface GoogleGeocodingLibrary {
    Geocoder: new () => GoogleGeocoder;
}

export interface GoogleMapsApi {
    maps: {
        importLibrary(name: "maps"): Promise<GoogleMapsLibrary>;
        importLibrary(name: "marker"): Promise<GoogleMarkerLibrary>;
        importLibrary(name: "places"): Promise<GooglePlacesLibrary>;
        importLibrary(name: "geocoding"): Promise<GoogleGeocodingLibrary>;
    };
}
