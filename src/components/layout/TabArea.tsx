import React, { useEffect, useState, useCallback } from 'react';
import { Tabs, TabProperties } from "@sinm/react-chrome-tabs";
import '@sinm/react-chrome-tabs/css/chrome-tabs.css';

interface TabAreaProps {
  tabs: TabProperties[];
}

const TabArea: React.FC<TabAreaProps> = ({ tabs = [] }) => {
  const [localTabs, setLocalTabs] = useState<TabProperties[]>(tabs);

  useEffect(() => {
    setLocalTabs(tabs);
  }, [tabs]);

  const activeTabContent = localTabs.find(tab => tab.active)?.content;

  const activateTab = useCallback((tabId: string) => {
    setLocalTabs(localTabs.map(tab => ({ ...tab, active: tab.id === tabId })));
  }, [localTabs]);

  const closeTab = useCallback((tabId: string) => {
    setLocalTabs(localTabs.filter(tab => tab.id !== tabId));
  }, [localTabs]);

  const reorderTabs = useCallback((tabId: string, fromIndex: number, toIndex: number) => {
    const movingTab = localTabs.find(tab => tab.id === tabId);
    if (!movingTab) {
      return;
    }
    let newLocalTabs = localTabs.filter(tab => tab.id !== tabId);
    newLocalTabs.splice(toIndex, 0, movingTab);
    setLocalTabs(newLocalTabs);
  }, [localTabs]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Tabs
        tabs={localTabs}
        onTabActive={activateTab}
        onTabClose={closeTab}
        onTabReorder={reorderTabs}
      />
      {activeTabContent}
    </div>
  );
};

export default TabArea;
