import cookie from 'react-cookies';

function getUser(){
  const userLoad = cookie.load('user');
  if (!userLoad) window.location.assign('/login');
  return userLoad.data;
};

export default getUser;
