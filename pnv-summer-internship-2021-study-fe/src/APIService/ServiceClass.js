import Call_API from "./CallApi";

const getClass = async ($endpoint) => {
  const res = await Call_API($endpoint, "GET", null);
  const { dataClassJoin: join, dataClassOwn: own } = res.data;
  return { own, join };
};
const deleteAPI = async ($endpoint) => {
  await Call_API($endpoint, "DELETE", null);
};
const unsubAPI = async ($endpoint) => {
  await Call_API($endpoint, "GET", null);
};
const getClassDetail = async (id) => {
  const response = await Call_API(`classrooms/${id}`);
  return response.data;
};

export { getClass, deleteAPI, unsubAPI, getClassDetail };
