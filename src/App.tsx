// App.tsx
import React, { useState } from 'react';
import './index.css';
import Sidebar from './components/layout/Sidebar';
import TabArea from './components/layout/TabArea';
import NodeLibrary from './components/NodeLibrary/NodeLibrary';
import WorldMapVisualization from './components/Map2d/WorldMapVisualization'; // Adjust path as necessary
import { Allotment } from "allotment";
import "allotment/dist/style.css";

function App() {
  const [nodeLibraryExpanded, setNodeLibraryExpanded] = useState(true);
  const [tabs, setTabs] = useState([{ id: 'home', title: 'Home', content: <div>Home Content</div>, active: true }]);

  const toggleNodeLibrary = () => {
    setNodeLibraryExpanded(!nodeLibraryExpanded);
  };

  const openWorldMapVisualization = () => {
    // Add new World Map Visualization tab
    const newTab = {
      id: 'world-map',
      title: 'World Map Visualization',
      content: <WorldMapVisualization />,
      active: true,
    };

    // Deactivate existing tabs and add the new tab
    setTabs(tabs.map(tab => ({ ...tab, active: false })).concat(newTab));
  };
  


  return (
    <div className="App">
      <Sidebar toggleNodeLibrary={toggleNodeLibrary} openWorldMapVisualization={openWorldMapVisualization} />
      <Allotment>
        {nodeLibraryExpanded && (
          <div style={{ height: '100%' }}>
            <NodeLibrary />
          </div>
        )}
        <div style={{ height: '100%' }}>
          <TabArea tabs={tabs} />
        </div>
      </Allotment>
    </div>
  );
}

export default App;
