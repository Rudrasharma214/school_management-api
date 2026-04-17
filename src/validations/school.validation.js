import { STATUS } from '../constants/statusCodes.js';
import AppError from '../utils/appError.js';

export const validateSchoolInput = (data = {}) => {
    const { name, address, latitude, longitude } = data;

    if (!name || typeof name !== 'string' || !name.trim()) {
        throw new AppError('Name is required and must be a non-empty string', STATUS.BAD_REQUEST);
    }

    if (!address || typeof address !== 'string' || !address.trim()) {
        throw new AppError('Address is required and must be a non-empty string', STATUS.BAD_REQUEST);
    }

    const parsedLatitude = Number(latitude);
    if (!Number.isFinite(parsedLatitude)) {
        throw new AppError('Latitude is required and must be a number', STATUS.BAD_REQUEST);
    }

    if (parsedLatitude < -90 || parsedLatitude > 90) {
        throw new AppError('Latitude must be between -90 and 90', STATUS.BAD_REQUEST);
    }

    const parsedLongitude = Number(longitude);
    if (!Number.isFinite(parsedLongitude)) {
        throw new AppError('Longitude is required and must be a number', STATUS.BAD_REQUEST);
    }

    if (parsedLongitude < -180 || parsedLongitude > 180) {
        throw new AppError('Longitude must be between -180 and 180', STATUS.BAD_REQUEST);
    }

    return {
        name: name.trim(),
        address: address.trim(),
        latitude: parsedLatitude,
        longitude: parsedLongitude,
    };
};

export const validateListInput = (userLatitude, userLongitude) => {
    const latitude = Number(userLatitude);
    const longitude = Number(userLongitude);

    if (!Number.isFinite(latitude)) {
        throw new AppError('Latitude must be a valid number', STATUS.BAD_REQUEST);
    }

    if (latitude < -90 || latitude > 90) {
        throw new AppError('Latitude must be between -90 and 90', STATUS.BAD_REQUEST);
    }

    if (!Number.isFinite(longitude)) {
        throw new AppError('Longitude must be a valid number', STATUS.BAD_REQUEST);
    }

    if (longitude < -180 || longitude > 180) {
        throw new AppError('Longitude must be between -180 and 180', STATUS.BAD_REQUEST);
    }

    return { latitude, longitude };
};