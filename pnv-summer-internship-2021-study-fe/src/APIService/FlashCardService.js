import CallAPI from './CallApi';
const getClass = () => {
    return CallAPI(`class`);
};
const addClass = (data) => {
    return CallAPI(`class`, 'post', data);
};
const deleteClass = (idClass) => {
    return CallAPI(`class/${idClass}`, 'delete');
};
const updateClass = (idClass, data) => {
    return CallAPI(`class/${idClass}`, 'put', data);
};
const getLesson = (idClass) => {
    return CallAPI(`class/${idClass}/lessons`);
};
const addLesson = (idClass, data) => {
    return CallAPI(`class/${idClass}/lessons`, 'post', data);
};
const deleteLesson = (idClass, idLesson) => {
    return CallAPI(`class/${idClass}/lessons/${idLesson}`, 'delete');
};
const updateLesson = (idClass, idLesson, data) => {
    return CallAPI(`class/${idClass}/lessons/${idLesson}`, 'put', data);
};
const getFlashCard= (idClass, idLesson) => {
    return CallAPI(`class/${idClass}/lessons/${idLesson}/flashcards`);
};
const addFlashCard= (idClass, idLesson, data) => {
    return CallAPI(`class/${idClass}/lessons/${idLesson}/flashcards`, 'post', data);
};
const deleteFlashCard= (idClass, idLesson, idFlashCard) => {
    return CallAPI(`class/${idClass}/lessons/${idLesson}/flashcards/${idFlashCard}`, 'delete');
};
const updateFlashCard= (idClass, idLesson, idFlashCard, data) => {
    return CallAPI(`class/${idClass}/lessons/${idLesson}/flashcards/${idFlashCard}`, 'put', data);
};
export default { getClass, addClass, deleteClass, updateClass, getLesson, addLesson, deleteLesson, updateLesson, getFlashCard, addFlashCard, deleteFlashCard, updateFlashCard };