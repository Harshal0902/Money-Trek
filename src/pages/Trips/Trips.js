import React from "react";
import { GoogleMap, Marker, InfoWindow, } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import { formatRelative } from "date-fns";
import "@reach/combobox/styles.css";
import { useTranslation } from 'react-i18next'
import CompassImg from "../../assets/compass.png"
import Fade from 'react-reveal/Fade';
import "./Trips.scss"

const mapContainerStyle = {
    left: "15vw",
    top: "2rem",
    bottom: "5rem",
    height: "70vh",
    width: "70vw",
};
const options = {
    disableDefaultUI: true,
    zoomControl: true,
};
const center = {
    lat: 28.7041,
    lng: 77.1025,
};

export default function Trips() {
    const { t } = useTranslation();

    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((e) => {
        setMarkers((current) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    return (
        <Fade bottom>
            <div>
                <h1 className="heading">{t('tripTitle')}
                </h1>

                <Locate panTo={panTo} />
                <Search panTo={panTo} />

                <GoogleMap
                    id="map"
                    mapContainerStyle={mapContainerStyle}
                    zoom={8}
                    center={center}
                    options={options}
                    onClick={onMapClick}
                    onLoad={onMapLoad}
                >
                    {markers.map((marker) => (
                        <Marker
                            key={`${marker.lat}-${marker.lng}`}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            onClick={() => {
                                setSelected(marker);
                            }}
                            icon={{
                                url: `https://img.icons8.com/office/16/000000/convertible.png`,
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15),
                                scaledSize: new window.google.maps.Size(30, 30),
                            }}
                        />
                    ))}

                    {selected ? (
                        <InfoWindow
                            position={{ lat: selected.lat, lng: selected.lng }}
                            onCloseClick={() => {
                                setSelected(null);
                            }}
                        >
                            <div>
                                Visited at {formatRelative(selected.time, new Date())}
                            </div>
                        </InfoWindow>
                    ) : null}
                </GoogleMap>
            </div>
        </Fade>
    );
}

function Locate({ panTo }) {
    return (
        <button
            className="locate"

            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }}
        >
            <img width="20px" src={CompassImg} alt="compass" />
        </button>
    );
}

function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 28.7041, lng: () => 77.1025 },
            radius: 100 * 1000,
        },
    });


    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    return (
        <div className="search" style={{ marginTop: "110px", left: "550px" }}>
            <Combobox onSelect={handleSelect}>
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}
