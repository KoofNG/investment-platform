import axios from "axios";

const baseURL = 'https://honiland.herokuapp.com/api/v1/'; 

// ALL DEFUALT CONFIGURATION HERE

export default axios.create({
  baseURL
});