import axios from 'axios';

export default axios.create({
    baseURL: 'http://ec2-18-224-39-11.us-east-2.compute.amazonaws.com:3001',
    headers: {}
});
