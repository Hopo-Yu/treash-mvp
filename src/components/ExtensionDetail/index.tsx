import React from 'react';
import MediaCarousel from './MediaCarousel';
import SubscriptionDetails from './SubscriptionDetails';
import ExtensionReadme from './ExtensionReadme';

// Dummy data for the example, you'd replace this with a real data fetch based on the extensionId
const extensionData = {
  id: 1,
  name: '3D World Map',
  description: 'Explore the world in 3D',
  media: [
    { type: 'image', url: 'image-url-1' },
    { type: 'image', url: 'image-url-2' }
  ],
  subscription: {
    price: 9.99,
    description: 'Monthly subscription'
  },
  readme: 'This is the README content for the 3D World Map extension.'
};

const ExtensionDetail = ({ extensionId }) => {
  const extension = extensionData;
  
  return (
    <div>
      <MediaCarousel media={extension.media} />
      <SubscriptionDetails subscription={extension.subscription} />
      <ExtensionReadme readme={extension.readme} />
    </div>
  );
};

export default ExtensionDetail;
