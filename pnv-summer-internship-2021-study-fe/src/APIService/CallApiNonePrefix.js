import axios from 'axios';
import getUser from './GetUser';
const CallAPINonePrefix = (url, method = 'GET', body) => {
  const { token } = getUser();
  const header = { Authorization: `Bearer ${token}` };
  return axios({
    method,
    url: url,
    data: body,
    headers: header,
  });
};
export default CallAPINonePrefix;
