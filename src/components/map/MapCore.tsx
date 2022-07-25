import maplibregl,{ Map } from "maplibre-gl";
import { FC, useEffect, useRef } from "react";
import 'maplibre-gl/dist/maplibre-gl.css';

interface IMap {
}

export const MapCore: FC<IMap>=()=>{
    const mapRef = useRef<HTMLDivElement|null>(null)
    const map = useRef<Map|null>(null)
   
    useEffect(() => {
      if(map.current) return
      if (!mapRef.current) return
      map.current=new maplibregl.Map({
        container:mapRef.current,
        style: "https://api.maptiler.com/maps/streets/style.json?key=HJUbFGdyhTnKTnEt7XiJ",
        center:[107.609810,-6.914744],
        zoom:11,
        attributionControl:false,
      });
      // Geo Control
      map.current.addControl(
        new maplibregl.NavigationControl({ showCompass: false, showZoom: true }),
        'bottom-right'
      );
      map.current.addControl(
        new maplibregl.NavigationControl({ showCompass: true, showZoom: false }),
        'bottom-left'
      );
      map.current.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        }),
        'bottom-right'
      );
    
    }, [mapRef, map])
    
    return(
        <div className="h-[calc(100vh_-_82px)]">
            <div ref={mapRef} className="h-[calc(100vh_-_82px)]">
            </div>
        </div>
    )
}
export default MapCore