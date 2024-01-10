import React, { useEffect, useRef } from 'react';
import { select, geoPath, geoMercator } from 'd3';
import geojsonData from './assets/world-110m.geojson';
import Box from '@mui/material/Box';

const MapComponent: React.FC = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    initMap();
  }, []);

  const initMap = () => {
    const width = 960;
    const height = 660;
    const container = select(mapContainerRef.current);

    container.selectAll("*").remove(); // Clear previous SVG to prevent duplicates

    const svg = container.append("svg")
      .attr("width", width)
      .attr("height", height);

    const projection = geoMercator()
      .scale(width / 2 / Math.PI)
      .translate([width / 2, height / 2 + 140]);

    const path = geoPath()
      .projection(projection);

    svg.append("path")
      .attr("d", path(geojsonData));
  };

  return (
    <Box ref={mapContainerRef} sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box id="map" sx={{ height: '100%' }}></Box>
    </Box>
  );
};

export default MapComponent;
