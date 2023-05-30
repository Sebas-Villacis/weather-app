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
import { citiesWindWeatherType, optionType } from '../types';
import useWind from '../hooks/useWind';
import { fetchData } from '../helpers/fetch';

type Props = {
  city: optionType;
};

const MapWrapper = ({ city }: Props): JSX.Element => {
  /*  const { citiesWind } = useWind(
    city.latitude,
    city.longitude,
    city.wikiDataId,
  );
  console.log({ citiesWind }); */

  const mapRef = useRef<Map>(null);

  const getCitiesWeather = async () => {
    const result = await fetchData(
      `http://localhost:3333/weather/near-cities?lat=${city.latitude}&lon=${city.longitude}&cityId=${city.wikiDataId}`,
    );
    return result;
  };

  useEffect(() => {
    console.log("I'm mounting!");

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

    getCitiesWeather().then((data) => {
      console.log({ data });
      const features = data.map((city) => {
        const { lon, lat, temp } = city;
        return new Feature({
          geometry: new Point(fromLonLat([lon, lat])),
          weight: temp,
        });
      });
      heatmapLayer.getSource().addFeatures(features);
    });

    return () => {
      map.setTarget(null);
    };
  }, []);

  // useEffect(() => {

  /* const dummyData = [
    {
      lat: 51.51988,
      lon: -0.09446,
      temp: 9.27,
    },
    {
      lat: 51.5224,
      lon: -0.0925,
      temp: 9.27,
    },
    {
      lat: 51.5095,
      lon: -0.0837,
      temp: 9.31,
    },
    {
      lat: 51.520905555,
      lon: -0.103675,
      temp: 9.23,
    },
    {
      lat: 51.51181,
      lon: -0.10634,
      temp: 9.26,
    },
    {
      lat: 51.5165,
      lon: -0.075,
      temp: 9.33,
    },
    {
      lat: 51.5166,
      lon: -0.075,
      temp: 9.33,
    },
    {
      lat: 51.526,
      lon: -0.103475,
      temp: 9.28,
    },
    {
      lat: 51.5204,
      lon: -0.1136,
      temp: 9.29,
    },
    {
      lat: 51.526,
      lon: -0.078,
      temp: 9.22,
    },
  ]; */

  /*  const map = 

    return () => {
      map.setTarget(undefined);
    }; */
  //}, []);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapWrapper;
