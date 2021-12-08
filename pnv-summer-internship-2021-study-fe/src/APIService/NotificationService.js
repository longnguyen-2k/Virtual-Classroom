import CallAPI from './CallApi';

const getNotificationData = () => {
  return CallAPI(`notifications`);
};
export { getNotificationData };
