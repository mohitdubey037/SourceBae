import * as actionTypes from './actionTypes';

export const addProject = (projects) => {
    return {
        type : actionTypes.ADD_PROJECT,
        projectDetails : projects
    };
}