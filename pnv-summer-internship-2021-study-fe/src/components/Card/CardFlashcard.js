import React, { useState } from 'react';
import { CardHeader, IconButton } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import ReactCardFlip from 'react-card-flip';
import { red } from '@material-ui/core/colors';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '100%',
    backgroundColor: '#ffe67a',
  },
  cardheader: {
    backgroundColor: 'white',
  },
  cardback: {
    backgroundColor: '#42c9ad',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
function CardFlashcard(props) {
  const [flip, setFlip] = useState(false);
  const classes = useStyles();
  const { createAction, handleConfirmDeleteFlashcard, data } = props;
  const { answer, question, id } = data;
  return (
    <ReactCardFlip isFlipped={flip} className="flip" flipDirection="horizontal">
      <Card className={classes.card}>
        <CardHeader
          title="Question"
          action={
            <div className="card-action">
              <IconButton
                aria-label="settings"
                onClick={() => createAction('update', '', data)}
              >
                <CreateIcon />
              </IconButton>
              <IconButton aria-label="settings">
                <DeleteIcon onClick={() => handleConfirmDeleteFlashcard(id)} />
              </IconButton>
            </div>
          }
        />
        <hr />
        <CardContent>
          <Typography component="h1">
            <div dangerouslySetInnerHTML={{ __html: `${question}` }} />
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            outline
            color="danger"
            className="center"
            onClick={() => {
              setFlip(true);
            }}
          >
            Flip
          </Button>
        </CardActions>
      </Card>
      <Card className={classes.cardback}>
        <CardHeader
          title="Answer"
          action={
            <div>
              <IconButton
                aria-label="settings"
                onClick={() => createAction('update', '', data)}
              >
                <CreateIcon />
              </IconButton>
              <IconButton aria-label="settings">
                <DeleteIcon onClick={() => handleConfirmDeleteFlashcard(id)} />
              </IconButton>
            </div>
          }
        />
        <hr />
        <CardContent>
          <Typography color="white" component="h1">
            <div dangerouslySetInnerHTML={{ __html: `${answer}` }} />
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            outline
            color="danger"
            className="center"
            onClick={() => {
              setFlip(false);
            }}
          >
            Flip
          </Button>
        </CardActions>
      </Card>
    </ReactCardFlip>
  );
}

export default CardFlashcard;
