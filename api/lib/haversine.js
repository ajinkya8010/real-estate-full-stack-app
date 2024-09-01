export function haversineDistance(coords1, coords2) {
    const toRad = (value) => (value * Math.PI) / 180;
  
    const lat1 = toRad(coords1.lat);
    const lon1 = toRad(coords1.lon);
    const lat2 = toRad(coords2.lat);
    const lon2 = toRad(coords2.lon);
  
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return 6371 * c; // Radius of Earth in KM
  }
  