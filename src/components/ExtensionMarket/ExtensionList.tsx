import React from 'react';
import ExtensionItem from './ExtensionItem';

const ExtensionList = ({ extensions }) => {
  return (
    <div>
      {extensions.map(extension => (
        <ExtensionItem key={extension.id} extension={extension} />
      ))}
    </div>
  );
};

export default ExtensionList;
