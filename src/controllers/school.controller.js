import { STATUS } from '../constants/statusCodes.js';
import * as schoolService from '../services/school.service.js';
import { sendErrorResponse, sendResponse } from '../utils/response.js';

export const addSchool = async (req, res, next) => {
    try {
        const school = await schoolService.addSchool(req.body);

        return sendResponse(res, STATUS.CREATED, 'School added successfully', school);
    } catch (error) {
        return next(error);
    }
};

export const listSchools = async (req, res, next) => {
    try {
        const { latitude, longitude } = req.query;
        if (latitude == null || longitude == null || latitude === '' || longitude === '') {
            return sendErrorResponse(res, STATUS.BAD_REQUEST, 'Latitude and longitude are required');
        }
        
        const result = await schoolService.listSchools(latitude, longitude);

        return sendResponse(res, STATUS.OK, 'Schools fetched successfully', result);
    } catch (error) {
        return next(error);
    }
};