import React, { useState } from 'react';
import {
    Button,
    Col,
    Form,
    FormGroup,
    Badge,
    Input,
    Label,
    Row,
} from 'reactstrap';
import $ from 'jquery';
import Ckeditor from './Ckeditor';
function FormAction(props){
    const [dataForm, setDataForm]=useState(props.dataForm);
    const handleChange=(event)=>{
        const {target:{name, value}}=event;
        setDataForm({...dataForm, [name]: value});
    }
    const handleSubmit=async (event)=>{
        event.preventDefault();
        props.submit(dataForm);
    }
    const handleChangeCkeditor=(value, fill)=>{
        setDataForm({...dataForm, [fill]:value})
    }
    const handleChangeImage=(e)=>{
        var reader = new FileReader();
        const {target:{name, files}}=e;
        reader.onload = function (e) {
            const {target:{result}}=e;
            $('#new-image').attr('src', result);
            const type=result.search('image');
            if(type!=-1){
                $('#new-image').removeAttr('hidden');
                $('#new').removeAttr('hidden');
            }
            else{
                $('#new-image').hide();
                $('#new').hide();
            }
        };
        reader.readAsDataURL(files[0]);
        const file=files[0];
        setDataForm({...dataForm, [name]: file});
    }
        return (
            <Form onSubmit={handleSubmit}>
                {props.structure.map(e => {
                    const {fill, type, value, data}=e;
                    if (type == 'select') {
                        return (
                            <FormGroup>
                                <Label for={fill}>{fill.toUpperCase()}</Label>
                                <Input type="select" name={fill} id={fill} onChange={handleChange} required>
                                    {data.map(op => {
                                        if (op.name == value) {
                                            return (
                                                <option value={op.id} selected>{op.name}</option>
                                            )
                                        }
                                        return (
                                            <option value={op.id}>{op.name}</option>
                                        )
                                    })}
                                </Input>
                            </FormGroup>
                        )
                    }
                    else
                        if (type == 'file') {
                            return (
                                <FormGroup>
                                    <Label for={fill}>{fill.toUpperCase()}</Label>
                                    <Input type="file" id={fill} name={fill} onChange={handleChangeImage}>
                                    </Input>
                                    <FormGroup>
                                        <Row>
                                            <Col md={12} id='new' hidden>
                                                <iframe className='file' hidden id="new-image" />
                                                <br />
                                                <Badge color="light" className="mr-1">
                                                    New File
                                                </Badge>
                                            </Col>
                                            {
                                                (value && value.length>0) &&
                                                <Col md={12}>
                                                    <iframe className='file' src={value} />
                                                    <br />
                                                    <Badge color="light" className="mr-1">
                                                        Old File
                                                    </Badge>
                                                </Col>
                                            }
                                        </Row>
                                    </FormGroup>
                                </FormGroup>
                            )
                        }
                        if(type == 'textarea'){
                            return(
                                <FormGroup>
                                    <Label for={fill}>{fill.toUpperCase()}</Label>
                                    <Ckeditor data={value} change={handleChangeCkeditor} fill={fill}/>
                                </FormGroup>
                            )
                        }
                        else {
                            return (
                                <FormGroup>
                                    <Label for={fill}>{fill.toUpperCase()}</Label>
                                    <Input
                                        className='frm-input'
                                        onChange={handleChange}
                                        type={type}
                                        name={fill}
                                        id={fill}
                                        defaultValue={value}
                                        placeholder={fill.toUpperCase()}
                                        required
                                    />
                                </FormGroup>
                            )
                        }
                })}
                <FormGroup>
                    <Button outline color="success" className="float-right">{props.titleSubmit}</Button>
                </FormGroup>
            </Form>
        );
}

export default FormAction;
