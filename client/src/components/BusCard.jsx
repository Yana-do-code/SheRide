// client/src/components/BusCard.jsx
import React from 'react';

// Props: bus (object) — see mockData.js for shape
function BusCard({ bus }) {
  return (
    <div>
      <p>{bus?.operatorName}</p>
      {/* Full card UI will be implemented here */}
    </div>
  );
}

export default BusCard;
