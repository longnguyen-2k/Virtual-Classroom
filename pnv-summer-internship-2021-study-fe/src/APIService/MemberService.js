import CallAPI from './CallApi';

const inviteMember=(classId, data)=>{
    return CallAPI(`classrooms/${classId}/invite`, 'post', data);
}
export default {inviteMember};