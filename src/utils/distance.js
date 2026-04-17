const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees) => (degrees * Math.PI) / 180;

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const fromLat = Number(lat1);
    const fromLon = Number(lon1);
    const toLat = Number(lat2);
    const toLon = Number(lon2);

    const deltaLat = toRadians(toLat - fromLat);
    const deltaLon = toRadians(toLon - fromLon);

    const a =
        Math.sin(deltaLat / 2) ** 2 +
        Math.cos(toRadians(fromLat)) * Math.cos(toRadians(toLat)) * Math.sin(deltaLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS_KM * c;
};

export const calculateHaversineDistance = calculateDistance;