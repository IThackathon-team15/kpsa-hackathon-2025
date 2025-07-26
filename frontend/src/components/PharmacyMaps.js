// src/components/PharmacyMap.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';

// explicitly import the icon images
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// configure the default Marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const CENTER = { lat: 37.364834, lng: 126.716713 };
const RADIUS = 1000; // meters

export default function PharmacyMap() {
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    // 더미 약국 데이터 생성 (중심점 기준 동쪽, 남쪽 방향)
    const pharmacyNames = [
      '건강약국',
      '미래약국',
      '행복약국',
      '새봄약국',
      '온누리약국',
      '희망약국',
      '사랑약국',
      '평화약국',
      '신세계약국',
      '든든약국'
    ];

    const generateDummyPharmacies = () => {
      const dummyPharmacies = [];
      
      for (let i = 0; i < 10; i++) {
        // 동쪽(+lng), 남쪽(-lat) 방향으로 랜덤 위치 생성
        const offsetLat = -Math.random() * 0.01; // 남쪽으로 0~0.01도
        const offsetLng = Math.random() * 0.015; // 동쪽으로 0~0.015도
        
        dummyPharmacies.push({
          id: i + 1,
          name: pharmacyNames[i],
          lat: CENTER.lat + offsetLat,
          lng: CENTER.lng + offsetLng,
          address: `시흥시 정왕동 ${Math.floor(Math.random() * 1000) + 1}번지`,
          phone: `031-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
          hours: '평일 09:00-22:00, 주말 09:00-18:00'
        });
      }
      
      return dummyPharmacies;
    };

    setPharmacies(generateDummyPharmacies());
  }, []);

  return (
    <MapContainer
      center={[CENTER.lat, CENTER.lng]}
      zoom={15}
      style={{ height: '200px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Circle
        center={[CENTER.lat, CENTER.lng]}
        radius={RADIUS}
        pathOptions={{ color: 'blue', fillOpacity: 0.1 }}
      />

      <Marker position={[CENTER.lat, CENTER.lng]}>
        <Popup>검색 중심 위치</Popup>
      </Marker>

      {pharmacies.map(pharm => (
        <Marker key={pharm.id} position={[pharm.lat, pharm.lng]}>
          <Popup>
            <div style={{ minWidth: '200px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '16px' }}>
                {pharm.name}
              </h4>
              <p style={{ margin: '4px 0', fontSize: '14px', color: '#666' }}>
                📍 {pharm.address}
              </p>
              <p style={{ margin: '4px 0', fontSize: '14px', color: '#666' }}>
                📞 {pharm.phone}
              </p>
              <p style={{ margin: '4px 0', fontSize: '14px', color: '#666' }}>
                🕒 {pharm.hours}
              </p>
              <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#999' }}>
                위치: ({pharm.lat.toFixed(5)}, {pharm.lng.toFixed(5)})
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
