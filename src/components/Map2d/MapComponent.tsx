import React, { useEffect, useRef } from 'react';
import { select, geoPath, geoMercator } from 'd3';
import geojsonData from './assets/world-110m.geojson';
import Box from '@mui/material/Box';
import { useDrop } from 'react-dnd';

const MapComponent: React.FC = () => {
    const mapContainerRef = useRef(null);
    const overlayRef = useRef(null);

    const [, drop] = useDrop(() => ({
        accept: "node", // Make sure this type corresponds to the type used in your draggable items
        drop: (item, monitor) => {
          const clientOffset = monitor.getClientOffset();
          if (clientOffset && overlayRef.current) {
              const rect = overlayRef.current.getBoundingClientRect();
              const x = clientOffset.x - rect.left;
              const y = clientOffset.y - rect.top;
              console.log(`Dropped node at x: ${x}, y: ${y}`);
              // Convert to lat, lng or any other coordinate system you use in your map
          }
      },
      
    }));

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
          <div 
              ref={ref => {
                  overlayRef.current = ref;
                  drop(ref); // Set the drop target
              }} 
              style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'all', // Allow this div to receive pointer events
                  zIndex: 10 // Ensure this overlay is above the map for receiving drops
              }}
          />
      </Box>
  );
};

export default MapComponent;
