import { useEffect, useRef, useState } from 'react';
import Stamen from 'ol/source/Stamen.js';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import HeatmapLayer from 'ol/layer/Heatmap';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';

import { fetchDataType, optionType } from '../types';
import { fetchData } from '../helpers/fetch';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import VectorLayer from 'ol/layer/Vector';

type Props = {
  city: optionType;
};

const MapWrapper = ({ city }: Props): JSX.Element => {
  const mapRef = useRef<Map>(null);
  const shouldFetch = useRef(true);

  useEffect(() => {
    async function getCitiesWeather() {
      const url = `http://localhost:3333/weather/near-cities?lat=${city.latitude}&lon=${city.longitude}&cityId=${city.wikiDataId}`;

      const result: fetchDataType = await fetchData(url);

      return result.data;
    }

    if (shouldFetch.current) {
      shouldFetch.current = false;
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new Stamen({
              layer: 'toner',
            }),
          }),
        ],
        view: new View({
          center: fromLonLat([city.longitude, city.latitude]), // City of London coordinates
          zoom: 11,
        }),
      });

      const heatmapLayer = new HeatmapLayer({
        source: new VectorSource(),
        blur: 16,
        radius: 14,
      });

      map.addLayer(heatmapLayer);

      getCitiesWeather().then((data) => {
        const features = data.map((city, idx: number) => {
          const { lon, lat, temp } = city;
          return new Feature({
            geometry: new Point(fromLonLat([lon, lat])),
            weight: temp,
          });
        });
        heatmapLayer.getSource().addFeatures(features);
      });
    }
  }, [city]);

  return (
    <section className="flex">
      <div ref={mapRef} style={{ width: '100%', height: '250px' }} />
    </section>
  );
};

export default MapWrapper;
