import { getPool } from '../config/db.js';

export const createSchool = async (data) => {
    const { name, address, latitude, longitude } = data;

    const sql = `
        INSERT INTO schools (name, address, latitude, longitude)
        VALUES (?, ?, ?, ?)
    `;

    const values = [name, address, latitude, longitude];
    const [result] = await getPool().execute(sql, values);

    return result;
};

export const getAllSchoolsSortedByDistance = async (userLatitude, userLongitude) => {
    const sql = `
        SELECT
            id,
            name,
            address,
            latitude,
            longitude,
            (
                6371 * 2 * ASIN(
                    LEAST(
                        1,
                        SQRT(
                            POW(SIN((RADIANS(latitude) - RADIANS(?)) / 2), 2) +
                            COS(RADIANS(?)) * COS(RADIANS(latitude)) *
                            POW(SIN((RADIANS(longitude) - RADIANS(?)) / 2), 2)
                        )
                    )
                )
            ) AS distance
        FROM schools
        ORDER BY distance ASC
    `;

    const values = [userLatitude, userLatitude, userLongitude];

    const [rows] = await getPool().execute(sql, values);

    return rows;
};
