import axios from 'axios';
import getUser from './GetUser';
const prefixUrl = 'https://pnv-ces-classwork.herokuapp.com/api';
export default function CallAPI(endpoint, method = 'GET', body) {
  const { token } = getUser();
  const header = { Authorization: `Bearer ${token}` };
  return axios({
    method,
    url: `${prefixUrl}/${endpoint}`,
    data: body,
    headers: header,
  });
}
