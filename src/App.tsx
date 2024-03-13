// App.tsx
import React, { useState } from 'react';
import './index.css';
import Sidebar from './components/layout/Sidebar';
import TabArea from './components/layout/TabArea';
import NodeLibrary from './components/NodeLibrary/NodeLibrary';
import WorldMapVisualization from './components/Map2d/WorldMapVisualization';
import Dashboard from './components/Dashboard/index';
import ExtensionMarket from './components/ExtensionMarket/index';
import ExtensionDetail from './components/ExtensionDetail/index';
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn } from './redux/slices/loginSlice';
import Login from './components/Auth/Login'; 


function App() {
  const [nodeLibraryExpanded, setNodeLibraryExpanded] = useState(true);
  const [tabs, setTabs] = useState([{ id: 'home', title: 'Home', content: <div>Home Content</div>, active: true }]);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  
  const toggleNodeLibrary = () => {
    setNodeLibraryExpanded(!nodeLibraryExpanded);
  };

  const openTab = (newTab) => {
    // Check if the tab is already open by looking for its id in the current tabs array
    const existingTab = tabs.find(tab => tab.id === newTab.id);
    if (existingTab) {
      // If it exists, make it the active tab
      setTabs(tabs.map(tab => ({
        ...tab,
        active: tab.id === newTab.id,
      })));
    } else {
      // If it doesn't exist, add the new tab and make it the active tab
      setTabs(tabs.map(tab => ({
        ...tab,
        active: false, // make all other tabs inactive
      })).concat({ ...newTab, active: true }));
    }
  };

  const openWorldMapVisualization = () => {
    // Define the new tab properties
    const newTab = {
      id: 'world-map',
      title: 'World Map Visualization',
      content: <WorldMapVisualization />,
    };
    openTab(newTab); // Call the new openTab function
  };
  // Moved out from openWorldMapVisualization function
  const openUserDashboard = () => {
    const newTab = {
      id: 'user-dashboard',
      title: 'User Dashboard',
      content: <Dashboard />,
      active: true,
    };

    // Deactivate existing tabs and add the new tab
    setTabs(tabs.map(tab => ({ ...tab, active: false })).concat(newTab));
  };

  const openExtensionDetail = (extensionId) => {
    // Logic to open the extension detail tab
    const newTab = {
      id: `extension-detail-${extensionId}`,
      title: `Extension Detail ${extensionId}`, // Replace with the actual extension name
      content: <ExtensionDetail extensionId={extensionId} />,
      active: true,
    };
    setTabs(tabs.map(tab => ({ ...tab, active: false })).concat(newTab));
  };

  const openExtensionMarket = () => {
    const newTab = {
      id: 'extension-market',
      title: 'Extension Market',
      // Pass the openExtensionDetail function as a prop to ExtensionMarket
      content: <ExtensionMarket onOpenDetail={openExtensionDetail} />,
      active: true,
    };
  
    // Deactivate existing tabs and add the new tab
    setTabs(tabs.map(tab => ({ ...tab, active: false })).concat(newTab));
  };

  // if (!isLoggedIn) {
  //   return <Login />;
  // }

  return (
    <div className="App">
      <Sidebar 
        toggleNodeLibrary={toggleNodeLibrary} 
        openWorldMapVisualization={openWorldMapVisualization} 
        openUserDashboard={openUserDashboard}
        openExtensionMarket={openExtensionMarket}
      />
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
