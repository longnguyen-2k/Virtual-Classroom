import React from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';
function ModalAction(props) {
    const {close, open, type, title, body, action=false}=props;
    const closeBtn = <button className="close" onClick={close}>&times;</button>;
    return (
        <Modal
            size="lg"
            isOpen={open}
            className={type}
        >
            <ModalHeader close={closeBtn}>{title}</ModalHeader>
            <ModalBody>
                <div id='body'>{body}</div>
            </ModalBody>
            <ModalFooter>
                {
                    action
                }
                <Button color="secondary" onClick={close}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}
export default ModalAction;
