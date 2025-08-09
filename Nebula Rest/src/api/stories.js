import axios from './config.js'

export const getStories = async (page) => {
    return axios.get(`/api/stories?page=${page}`);
}