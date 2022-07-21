import * as types from '../constants/movie';

export const getAllMovie = (data) => {
    return {
        type: types.LIST_ALL,
        payload: {
            data,
        },
    };
};

