import {
    createSchool,
    getAllSchoolsSortedByDistance,
} from '../models/school.model.js';
import { validateListInput, validateSchoolInput } from '../validations/school.validation.js';

export const addSchool = async (schoolData) => {
    const normalizedData = validateSchoolInput(schoolData);
    const insertResult = await createSchool(normalizedData);

    return {
        id: insertResult.insertId,
        ...normalizedData,
    };
};

export const listSchools = async (userLatitude, userLongitude) => {
    const { latitude, longitude } = validateListInput(userLatitude, userLongitude);
    const schools = await getAllSchoolsSortedByDistance(latitude, longitude);

    return {
        schools,
        meta: {
            sorting: 'distance',
            distanceEngine: 'db',
            fallbackUsed: false,
        },
    };
};