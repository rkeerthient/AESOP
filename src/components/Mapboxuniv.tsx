import {
  Map,
  Marker,
  MapboxOptions,
  LngLatBounds,
  MarkerOptions,
  LngLat,
} from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState, useEffect } from "react";
import { useLocationsContext } from "../context/LocationsContext";
import * as mapboxgl from "mapbox-gl";
const Mapboxuniv = ({ data }: any) => {
  const {
    selectedLocation,
    setSelectedLocation,
    selectedLocationData,
    setSelectedLocationData,
  } = useLocationsContext();

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const markers = useRef<Marker[]>([]);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const buildAddress = (data: any) => {
    let addrStr = "";
    if (data.address.line1 != "") addrStr = data.address.line1 + ", ";
    if (data.address.line2) addrStr += data.address.line2.trim() + ", ";
    if (data.address.city) addrStr += data.address.city.trim() + ", ";
    return addrStr;
  };
  useEffect(() => {
    if (mapContainer.current && !map.current) {
      const mapInstance = new mapboxgl.Map({
        accessToken:
          "pk.eyJ1Ijoic3VubnlrZWVydGhpIiwiYSI6ImNsNWh5ZGt3czAyejUzY3A3Y3pvZ2E0bTgifQ.TNHfh1HL0LwTzLxs2TOaBQ",
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v10",
        center: [lng, lat],
        zoom: zoom,
      });
      map.current = mapInstance;
      const mapbox = map.current;
      mapbox.resize();
    }
  }, [mapContainer]);

  useEffect(() => {
    if (selectedLocationData) {
      let item: any = selectedLocationData;
      markers.current.forEach((marker) => marker.remove());
      markers.current = [];
      const mapbox = map.current;
      if (mapbox && item) {
        const bounds = new LngLatBounds();
        const el = document.createElement("div");
        el.className = "marker";
        const popup = new mapboxgl.Popup({
          offset: 25,
        }).setHTML(createPopUp1(item));
        new mapboxgl.Marker()
          .setLngLat({
            lng: item.yextDisplayCoordinate.longitude,
            lat: item.yextDisplayCoordinate.latitude,
          })
          .setPopup(popup)
          .addTo(mapbox)
          .togglePopup();
        bounds.extend([
          item.yextDisplayCoordinate.longitude,
          item.yextDisplayCoordinate.latitude,
        ]);

        if (!bounds.isEmpty()) {
          mapbox.fitBounds(bounds, {
            padding: { top: 50, bottom: 50, left: 50, right: 50 },
            maxZoom: 15,
          });
        }
      }
    }
  }, [selectedLocationData]);

  useEffect(() => {
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];
    const mapbox = map.current;
    if (mapbox && data.length > 0) {
      const bounds = new LngLatBounds();
      data.map((item: any) => {
        const el = document.createElement("div");
        el.className = "marker";
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          createPopUp(item)
        );
        new mapboxgl.Marker()
          .setLngLat({
            lng: item.rawData.yextDisplayCoordinate.longitude,
            lat: item.rawData.yextDisplayCoordinate.latitude,
          })
          .setPopup(popup)
          .addTo(mapbox);
        bounds.extend([
          item.rawData.yextDisplayCoordinate.longitude,
          item.rawData.yextDisplayCoordinate.latitude,
        ]);
      });
      if (!bounds.isEmpty()) {
        mapbox.fitBounds(bounds, {
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          maxZoom: 15,
        });
      }
    }
  }, [data]);

  const createPopUp = (data: any) => {
    data = data.rawData;
    return `<div 
      > <h3 class="uppercase bembo text-sm font-normal mb-2.5">
      ${data.c_fullName ? data.c_fullName : data.name}
    </h3>
    <p style="color: #555" class="text-sm leading-6 ">
    ${buildAddress(data)} 
  </p>
    <p style="color:#555" class ="text-sm leading-6 ">
    Hours today: 10:00 AM - 10:00 PM
  </p>
  <p>
    <span style="color: #555">T:</span>
    <a class ="underline text-black ml-1 text-sm	" href=tel:${data.mainPhone}>
      ${data.mainPhone}
    </a>
  </p>
  <p class ="mt-4 mb-5">
    <a href="" class ="underline text-xs text-black">
      Store details
    </a>
  </p>
  <p>
    <button
      style="min-height: 2.75rem"
      class="w-full uppercase leading-5 bg-black border border-black text-white font-bold px-11 py-3.5"
    >
      Book an appointment
    </button>
  </p> 
    </div>`;
  };
  const createPopUp1 = (data: any) => {
    data = data;
    return `<div 
      > <h3 class="uppercase bembo text-sm font-normal mb-2.5">
      ${data.c_fullName ? data.c_fullName : data.name}
    </h3>
    <p style="color: #555" class="text-sm leading-6 ">
    ${buildAddress(data)} 
  </p>
    <p style="color:#555" class ="text-sm leading-6 ">
    Hours today: 10:00 AM - 10:00 PM
  </p>
  <p>
    <span style="color: #555">T:</span>
    <a class ="underline text-black ml-1 text-sm	" href=tel:${data.mainPhone}>
      ${data.mainPhone}
    </a>
  </p>
  <p class ="mt-4 mb-5">
    <a href="" class ="underline text-xs text-black">
      Store details
    </a>
  </p>
  <p>
    <button
      style="min-height: 2.75rem"
      class="w-full uppercase leading-5 bg-black border border-black text-white font-bold px-11 py-3.5"
    >
      Book an appointment
    </button>
  </p> 
    </div>`;
  };

  return <div ref={mapContainer} className="hidden md:map-container" />;
};

export default Mapboxuniv;
