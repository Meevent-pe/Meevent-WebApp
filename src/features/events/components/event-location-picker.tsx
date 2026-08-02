"use client";

import { LoaderCircle, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { findDepartmentIdByGoogleName } from "@/features/events/lib/department-matcher";
import { loadGoogleMaps } from "@/features/events/lib/google-maps-loader";
import type {
    GoogleAddressComponent,
    GoogleAdvancedMarker,
    GoogleGeocoder,
    GoogleLatLng,
    GoogleMapInstance,
    GooglePlaceSelectEvent,
    MapCoordinates,
} from "@/features/events/types/google-maps.types";
import { FormField } from "@/shared/components/forms/form-field";
import { Input } from "@/shared/components/ui/input";
import { PERU_DEPARTMENTS } from "@/shared/constants/peru-departments";
import { cn } from "@/shared/lib/utils";

const DEFAULT_MAP_CENTER: MapCoordinates = { lat: -12.046374, lng: -77.042793 };

export interface EventLocationValue {
    venueName: string;
    address: string;
    cityId: number;
    latitude: number;
    longitude: number;
    locationConfirmed: boolean;
}

interface EventLocationPickerProps {
    value: EventLocationValue;
    errors?: Partial<Record<keyof EventLocationValue, string>>;
    onChange(value: EventLocationValue): void;
}

function toCoordinates(position: MapCoordinates | GoogleLatLng): MapCoordinates {
    const possibleLatLng = position as GoogleLatLng;
    if (typeof possibleLatLng.lat === "function") {
        return { lat: possibleLatLng.lat(), lng: possibleLatLng.lng() };
    }
    return position as MapCoordinates;
}

function getDepartmentName(components: GoogleAddressComponent[] | undefined) {
    const component = components?.find((candidate) =>
        candidate.types.includes("administrative_area_level_1")
    );
    return component?.longText ?? component?.long_name;
}

export function EventLocationPicker({ value, errors, onChange }: EventLocationPickerProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
    const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ?? "";
    const mapsConfigured = Boolean(apiKey && mapId);
    const mapElementRef = useRef<HTMLDivElement>(null);
    const autocompleteElementRef = useRef<HTMLDivElement>(null);
    const valueRef = useRef(value);
    const markerRef = useRef<GoogleAdvancedMarker | null>(null);
    const mapRef = useRef<GoogleMapInstance | null>(null);
    const geocoderRef = useRef<GoogleGeocoder | null>(null);
    const [mapState, setMapState] = useState<"loading" | "ready" | "error">(
        mapsConfigured ? "loading" : "error"
    );
    const [mapMessage, setMapMessage] = useState(
        mapsConfigured ? "" : "Falta configurar la clave o el Map ID de Google Maps."
    );

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    useEffect(() => {
        const mapElement = mapElementRef.current;
        const autocompleteHost = autocompleteElementRef.current;

        if (!mapElement || !autocompleteHost) {
            return;
        }
        if (!mapsConfigured) {
            return;
        }

        let cancelled = false;
        const listeners: Array<{ remove(): void }> = [];
        let removeAutocompleteListener: () => void = () => {};

        async function updateFromCoordinates(coordinates: MapCoordinates) {
            const geocoder = geocoderRef.current;
            if (!geocoder) {
                return;
            }

            try {
                const response = await geocoder.geocode({ location: coordinates });
                if (cancelled || response.results.length === 0) {
                    return;
                }
                const result = response.results[0];
                const departmentId = findDepartmentIdByGoogleName(
                    getDepartmentName(result.address_components)
                );

                onChange({
                    ...valueRef.current,
                    address: result.formatted_address,
                    cityId: departmentId ?? valueRef.current.cityId,
                    latitude: coordinates.lat,
                    longitude: coordinates.lng,
                    locationConfirmed: true,
                });
                setMapMessage(
                    departmentId
                        ? "Ubicación actualizada desde el mapa."
                        : "No se identificó el departamento; selecciónalo manualmente."
                );
            } catch {
                setMapMessage("No se pudo obtener la dirección de este punto.");
            }
        }

        void (async () => {
            try {
                const google = await loadGoogleMaps(apiKey);
                const [
                    { Map },
                    { AdvancedMarkerElement },
                    { PlaceAutocompleteElement },
                    { Geocoder },
                ] = await Promise.all([
                    google.maps.importLibrary("maps"),
                    google.maps.importLibrary("marker"),
                    google.maps.importLibrary("places"),
                    google.maps.importLibrary("geocoding"),
                ]);

                if (cancelled) {
                    return;
                }

                const initialPosition = {
                    lat: valueRef.current.latitude,
                    lng: valueRef.current.longitude,
                };
                const map = new Map(mapElement, {
                    center: initialPosition,
                    zoom: 13,
                    mapId,
                    mapTypeControl: false,
                    streetViewControl: false,
                });
                const marker = new AdvancedMarkerElement({
                    map,
                    position: initialPosition,
                    gmpDraggable: true,
                    title: "Ubicación del evento",
                });
                const geocoder = new Geocoder();
                const autocomplete = new PlaceAutocompleteElement({
                    includedPrimaryTypes: ["establishment"],
                });

                autocomplete.includedRegionCodes = ["pe"];
                autocomplete.locationBias = { radius: 50_000, center: DEFAULT_MAP_CENTER };
                autocomplete.placeholder = "Buscar un lugar, recinto o dirección";
                autocomplete.className = "block w-full";
                autocompleteHost.replaceChildren(autocomplete);

                mapRef.current = map;
                markerRef.current = marker;
                geocoderRef.current = geocoder;

                const placeHandler = async (rawEvent: Event) => {
                    const event = rawEvent as GooglePlaceSelectEvent;
                    const place = event.placePrediction.toPlace();
                    await place.fetchFields({
                        fields: [
                            "displayName",
                            "formattedAddress",
                            "location",
                            "viewport",
                            "addressComponents",
                        ],
                    });

                    if (!place.location || cancelled) {
                        setMapMessage("El lugar seleccionado no tiene coordenadas disponibles.");
                        return;
                    }

                    const coordinates = toCoordinates(place.location);
                    const departmentId = findDepartmentIdByGoogleName(
                        getDepartmentName(place.addressComponents)
                    );

                    marker.position = coordinates;
                    if (place.viewport) {
                        map.fitBounds(place.viewport);
                    } else {
                        map.setCenter(coordinates);
                        map.setZoom(17);
                    }

                    onChange({
                        venueName: place.displayName ?? valueRef.current.venueName,
                        address: place.formattedAddress ?? valueRef.current.address,
                        cityId: departmentId ?? valueRef.current.cityId,
                        latitude: coordinates.lat,
                        longitude: coordinates.lng,
                        locationConfirmed: true,
                    });
                    setMapMessage(
                        departmentId
                            ? "Lugar seleccionado correctamente."
                            : "Selecciona manualmente el departamento del lugar."
                    );
                };

                autocomplete.addEventListener("gmp-select", placeHandler);
                removeAutocompleteListener = () =>
                    autocomplete.removeEventListener("gmp-select", placeHandler);
                listeners.push(
                    map.addListener("click", (event) => {
                        if (!event.latLng) {
                            return;
                        }
                        const coordinates = toCoordinates(event.latLng);
                        marker.position = coordinates;
                        void updateFromCoordinates(coordinates);
                    })
                );
                listeners.push(
                    marker.addListener("dragend", () => {
                        if (!marker.position) {
                            return;
                        }
                        void updateFromCoordinates(toCoordinates(marker.position));
                    })
                );

                setMapState("ready");
            } catch {
                if (!cancelled) {
                    setMapState("error");
                    setMapMessage(
                        "No se pudo cargar Google Maps. Revisa la clave, las APIs y los dominios autorizados."
                    );
                }
            }
        })();

        return () => {
            cancelled = true;
            listeners.forEach((listener) => listener.remove());
            removeAutocompleteListener();
            autocompleteHost.replaceChildren();
            markerRef.current = null;
            mapRef.current = null;
            geocoderRef.current = null;
        };
    }, [apiKey, mapId, mapsConfigured, onChange]);

    return (
        <div className="space-y-4">
            <FormField
                id="place-search"
                label="Buscar ubicación"
                hint="Busca un recinto en Perú o selecciona un punto directamente en el mapa."
            >
                <div
                    id="place-search"
                    ref={autocompleteElementRef}
                    className="min-h-10 [&>gmp-place-autocomplete]:w-full"
                />
            </FormField>

            <div className="relative h-72 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 sm:h-80">
                <div ref={mapElementRef} className="h-full w-full" aria-label="Mapa del evento" />
                {mapState === "loading" ? (
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-neutral-100 text-sm text-neutral-600">
                        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                        Cargando mapa...
                    </div>
                ) : null}
                {mapState === "error" ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-neutral-100 px-6 text-center text-sm text-neutral-600">
                        <MapPin className="size-5" aria-hidden="true" />
                        {mapMessage}
                    </div>
                ) : null}
            </div>

            {mapState !== "error" && mapMessage ? (
                <p className="text-xs text-neutral-500" role="status">
                    {mapMessage}
                </p>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
                <FormField id="venueName" label="Nombre del lugar" error={errors?.venueName}>
                    <Input
                        id="venueName"
                        maxLength={180}
                        value={value.venueName}
                        onChange={(event) => onChange({ ...value, venueName: event.target.value })}
                        placeholder="Ej. Estadio Nacional"
                        aria-invalid={!!errors?.venueName}
                    />
                </FormField>

                <FormField id="cityId" label="Departamento" error={errors?.cityId}>
                    <select
                        id="cityId"
                        value={value.cityId}
                        onChange={(event) =>
                            onChange({ ...value, cityId: Number(event.target.value) })
                        }
                        className={cn(
                            "border-input h-9 w-full rounded-md border bg-white px-3 text-sm shadow-xs outline-none",
                            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                            errors?.cityId && "border-destructive"
                        )}
                        aria-invalid={!!errors?.cityId}
                    >
                        {PERU_DEPARTMENTS.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </FormField>

                <div className="sm:col-span-2">
                    <FormField id="address" label="Dirección" error={errors?.address}>
                        <Input
                            id="address"
                            maxLength={255}
                            value={value.address}
                            onChange={(event) =>
                                onChange({ ...value, address: event.target.value })
                            }
                            placeholder="Dirección proporcionada por Google Maps"
                            aria-invalid={!!errors?.address}
                        />
                    </FormField>
                </div>
            </div>

            <p className="text-xs text-neutral-500">
                Coordenadas: {value.latitude.toFixed(7)}, {value.longitude.toFixed(7)}
            </p>
            {errors?.locationConfirmed ? (
                <p className="text-xs text-red-600" role="alert">
                    {errors.locationConfirmed}
                </p>
            ) : null}
        </div>
    );
}
