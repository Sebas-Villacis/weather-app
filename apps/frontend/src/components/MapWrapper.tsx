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

import { optionType } from '../types';
import { fetchData } from '../helpers/fetch';

type Props = {
  city: optionType;
};

const MapWrapper = ({ city }: Props): JSX.Element => {
  const mapRef = useRef<Map>(null);
  const shouldFetch = useRef(true);

  useEffect(() => {
    async function getCitiesWeather() {
      const url = `http://localhost:3333/weather/near-cities?lat=${city.latitude}&lon=${city.longitude}&cityId=${city.wikiDataId}`;

      const result: any = await fetchData(url);

      console.log({ result });
      return result.data;
    }

    if (shouldFetch.current) {
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
          zoom: 14,
        }),
      });

      const heatmapLayer = new HeatmapLayer({
        source: new VectorSource(),
        blur: 16,
        radius: 12,
      });

      map.addLayer(heatmapLayer);
      console.log("I'm mounting!");
      shouldFetch.current = false;
      getCitiesWeather().then((data) => {
        console.log({
          data,
        });

        const features = data.map((city) => {
          const { lon, lat, temp } = city;
          return new Feature({
            geometry: new Point(fromLonLat([lon, lat])),
            weight: temp,
          });
        });
        heatmapLayer.getSource().addFeatures(features);
      });
    }

    //return () => map.setTarget('');
  }, [city]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapWrapper;
