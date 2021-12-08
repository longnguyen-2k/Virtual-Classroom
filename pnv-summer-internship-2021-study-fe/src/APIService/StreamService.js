import CallAPI from './CallApi';

const getQuestion=(classroomId)=>{
    return CallAPI(`classrooms/${classroomId}/posts`);
}
const createForm=(data)=>{
    const {title, content, fileAttachment}=data;
    const form=new FormData();
    form.append('title', title);
    form.append('content', content);
    form.append('fileAttachment', fileAttachment);
    return form;
}
const postQuestion=(classroomId, data)=>{
    const form=createForm(data);
    return CallAPI(`classrooms/${classroomId}/posts`, 'post', form);
}
const putQuestion=(classroomId, id, data)=>{
    const form=createForm(data);
    return CallAPI(`classrooms/${classroomId}/posts/${id}`, 'put', form);
}
const deletePost=(classroomId, postId)=>{
    return CallAPI(`classrooms/${classroomId}/posts/${postId}`, 'delete');
}
const getCommentQuestion=(classroomId, postId)=>{
    return CallAPI(`classrooms/${classroomId}/posts/${postId}/comments`);
}
const postComment=(classroomId, postId, message)=>{
    return CallAPI(`classrooms/${classroomId}/posts/${postId}/comments`, 'post', message);
}
const deleteComment=(classroomId, postId, commentId)=>{
    return CallAPI(`classrooms/${classroomId}/posts/${postId}/comments/${commentId}`, 'delete');
}
export default {getQuestion, postQuestion, putQuestion, getCommentQuestion, deletePost, postComment, deleteComment};
