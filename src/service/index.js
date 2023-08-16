import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://192.168.1.103/Conte-tecnologia/app_empresa/ERP_CONTE/public/api'
    baseURL: 'https://app.contetecnologia.com.br/public/api'
   });
   
 export default api;