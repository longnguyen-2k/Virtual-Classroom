import CallAPI from './CallApi';
import getUser from './GetUser';
const user = getUser();
const handleCreateForm = (data) => {
    const { title, content, fileAttachment } = data;
    let form = new FormData();
    form.append('title', title);
    form.append('content', content);
    form.append('fileAttachment', fileAttachment);
    form.append('ownerId', user.id);
    form.append('ownerName', user.name)
    return form;
}
const handleCreateFormComment = (data) => {
    return {
        'message': data,
        'ownerId': user.id,
        'ownerName': user.name
    };
}
const postMaterial = (idClass, data) => {
    return CallAPI(`classrooms/${idClass}/materials`, 'post', handleCreateForm(data));
}
const putMaterial = (idClass, idMaterial, data) => {
    return CallAPI(`classrooms/${idClass}/materials/${idMaterial}`, 'put', handleCreateForm(data));
}
const getMaterial = (idClass) => {
    return CallAPI(`classrooms/${idClass}/materials`);
}
const getMaterialDetail = (idClass, idMaterial) => {
    return CallAPI(`classrooms/${idClass}/materials/${idMaterial}`);
}
const commentMaterial = (idClass, idMaterial, data) => {
    return CallAPI(`classrooms/${idClass}/materials/${idMaterial}/comments`, 'post', handleCreateFormComment(data));
}
const getComment = (idClass, idMaterial) => {
    return CallAPI(`classrooms/${idClass}/materials/${idMaterial}/comments`);
}
const deleteComment = (idClass, idMaterial, idComment) => {
    return CallAPI(`classrooms/${idClass}/materials/${idMaterial}/comments/${idComment}`, 'delete');
}
const deleteMaterial = (idClass, idMaterial) => {
    return CallAPI(`classrooms/${idClass}/materials/${idMaterial}`, 'delete')
}


export default { handleCreateFormComment, postMaterial, putMaterial, getMaterial, getMaterialDetail, commentMaterial, getComment, deleteComment, deleteMaterial };
