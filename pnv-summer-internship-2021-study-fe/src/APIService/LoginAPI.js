import axios from 'axios';
const url='https://pnv-ces-classwork.herokuapp.com/auth/login';
class LoginAPI{
    
    static loginGoogle=(data)=>{
        return axios.post(url, data);
    }
}

export default LoginAPI;