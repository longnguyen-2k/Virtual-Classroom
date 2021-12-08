import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
function Ckeditor(props) {
    const {change, data, fill}=props;
    return (
        <div>
            <CKEditor
            editor={ ClassicEditor }
                data={data}
                onChange={( event, editor ) => {
                    change(editor.getData(), fill);
                }}
            />
        </div>
    );
}


export default Ckeditor;