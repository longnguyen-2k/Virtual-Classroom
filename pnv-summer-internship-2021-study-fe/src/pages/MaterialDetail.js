import React, { useState } from 'react';
import Page from 'components/Page';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Container from 'reactstrap/lib/Container';
import Col from 'reactstrap/lib/Col';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FormControl from '@material-ui/core/FormControl';
import { Backdrop, CircularProgress, OutlinedInput, Popover } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import ModalAction from '../components/Modal';
import Row from 'reactstrap/lib/Row';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import MaterialService from '../APIService/MaterialService';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import CardComment from '../components/Card/CardComment';
const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none',
        width: '100%',
        backgroundColor: 'transparent',
    },
    avatar: {
        backgroundColor: '#129eaf',
        width: '3rem',
        height: '3rem',
        marginTop: '-0.5rem'
    },
    margin: {
        width: '100%'
    },
    detail: {
        color: 'gray',
        textDecoration: 'none !important'

    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));
function MaterialDetail(props) {
    const classes = useStyles();
    const [sendButton, setAction] = useState(true)
    const [comment, setComment] = useState("");
    const [anchorElCopy, setAnchorElCopy] = useState(null);
    const [data, setData] = useState({});
    const [listComment, setListComment] = useState(null);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [file, setFile] = useState({
        type: null,
        path: null,
        open: false
    })
    const {id, idClass} = useParams();
    async function fetchData() {
        const response = await MaterialService.getMaterialDetail(idClass, id);
        const responeComment = await MaterialService.getComment(idClass, id);
        setData(response.data);
        setListComment(responeComment.data);
    }
    useEffect(() => {
        fetchData()
    }, []);
    const handleClickCopy = (event) => {
        setAnchorElCopy(event.currentTarget);
    };
    const handleCloseCopy = () => {
        setAnchorElCopy(null);
    };
    const handleReadFile = () => {
        setFile({
            open: true
        })
    }
    const handleCloseReadFile = () => {
        setFile({
            open: false
        })
    }
    const openCp = Boolean(anchorElCopy);
    const idCp = openCp ? 'simple-popover' : undefined;
    const handleChange = (event) => {
        const {target:{value}} = event;
        setComment(value);
        if (value.length)
            setAction(false);
        else
            setAction(true);
    };
    const handleOpenBackdrop=()=>{
        setOpenBackdrop(true);
    }
    const handleCloseBackdrop=()=>{
        setOpenBackdrop(false);
    }
    const handleSubmitComment = async () => {
        handleOpenBackdrop();
        await MaterialService.commentMaterial(idClass, id, comment);
        handleCloseBackdrop();
        setComment("");
        setAction(true);
        fetchData();
    }
    const handleDeleteComment = async (idComment) => {
        handleOpenBackdrop();
        try{
            await MaterialService.deleteComment(idClass, id, idComment);
            
        }
        catch{
            
        }
        handleCloseBackdrop();
        fetchData();
    }
    const {fileAttachment=[], content, title, createdAt}=data;
    return (
        <Page>
            <Container>
                <Row>
                    <Col md='10' className='col-center'>
                        {
                            data &&
                            <Card className={classes.root}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" className={classes.avatar}>
                                            <AssignmentIcon />
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings" className='m-i'>
                                            <Popover
                                                id={idCp}
                                                open={openCp}
                                                anchorEl={anchorElCopy}
                                                onClose={handleCloseCopy}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'center',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'center',
                                                }}
                                            >
                                                <CopyToClipboard text={window.location.href}>
                                                    <button className='btn-nor'>Copy link</button>
                                                </CopyToClipboard>
                                            </Popover>
                                            <MoreVertIcon className='m-t' onClick={handleClickCopy} />
                                        </IconButton>
                                    }
                                    className='header-card'
                                    title={<h1 className='m-t'>{title}</h1>}
                                    subheader={createdAt}
                                />
                                <hr className='hr' />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" className='m-c' id='content' component="p">
                                        <div dangerouslySetInnerHTML={{ __html: content }} />
                                    </Typography>
                                    <br />
                                    {
                                        fileAttachment.length!=0
                                        &&
                                        <a onClick={handleReadFile}>

                                            <Card className='card-m-d'>
                                                <Row>
                                                    <img className='m-img' src='https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9jMWU2NmFhMTQxOWJjOTM4NGM5ZDg0ZDQ0MDgyNzg5Mz9zaXplPTEwMCZkZWZhdWx0PXJldHJvIn0.6OId2QLxu0DcnhrtsTijFS0RliMJzIql3zetwijVTrk'></img>
                                                    <CardContent >
                                                        Material
                                                    </CardContent>
                                                </Row>
                                            </Card>
                                        </a>
                                    }
                                </CardContent>
                                <hr className='hr-c' />
                                <CardContent>
                                    <Row>
                                        <SupervisorAccountIcon />
                                        <h6>
                                            <b className='c-t'>Material Comment</b>
                                        </h6>
                                    </Row>
                                    <Row>
                                        <Col md='12'>
                                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                                <OutlinedInput
                                                    id="outlined-adornment-weight"
                                                    value={comment}
                                                    className='i-r'
                                                    onChange={handleChange}
                                                    endAdornment={
                                                        <button disabled={sendButton} onClick={handleSubmitComment} className={`${classes.detail} btn-send`}>
                                                            <SendIcon className='btn-send' disabled={sendButton} />
                                                        </button>
                                                    }
                                                    aria-describedby="outlined-weight-helper-text"
                                                    inputProps={{
                                                        'aria-label': 'weight',
                                                    }}
                                                    labelWidth={0}
                                                />
                                            </FormControl>
                                            <Row>
                                                {
                                                    listComment
                                                    &&
                                                    listComment.map(e => {
                                                        return (
                                                            <CardComment deleteComment={()=>handleDeleteComment(e.id)} data={e} />
                                                        )
                                                    })
                                                }
                                            </Row>
                                        </Col>
                                    </Row>
                                </CardContent>
                                <ModalAction
                                    body={<iframe
                                        src={fileAttachment[0]}
                                        title="file"
                                        width="100%"
                                        height="600"
                                    ></iframe>}
                                    open={file.open}
                                    close={handleCloseReadFile}
                                >
                                </ModalAction>
                            </Card>
                        }
                    </Col>
                </Row>
            </Container>
            <Backdrop className={classes.backdrop} open={openBackdrop}>
                <CircularProgress color="secondary" />
            </Backdrop>
        </Page>
    );
}

export default MaterialDetail;