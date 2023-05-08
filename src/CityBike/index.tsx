import React from 'react';

const CityBike: React.FC<{capacity: number}> = ({capacity}) => {
    return <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <p style={{fontSize: "40px", margin: "12px 0"}}>Sykler: {capacity}</p>
    </div>
}

export default CityBike;