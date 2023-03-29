import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Delete from '@mui/icons-material/Delete';
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ChildModal from './Forms/ChildModal'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;

  
  return <IconButton {...other} />;
  
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  const API_URL = 'http://localhost:8080'
  const id = localStorage.getItem('ID').replace(/"/g, '');
  const [UserQuestions, SetUserQuestions] = React.useState([])


  const Display = e => {

    axios.get(`${API_URL}/user_questions/${id}`)

      .then((e) => {
        SetUserQuestions(e.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function deleteQuestion(id, e) {
    e.preventDefault();

    const result = window.confirm('Are you sure you want to delete this question? ')
    if (result) {
      axios.delete(API_URL + `/delete/` + id)
        .then(() => {
          toast.success('deleted success !!!!')
          console.log("deleted ..")
        }).catch((error) => {
          console.log(error)
        })
    }
    else {
      return;
    }
  }


  React.useEffect(() => {
    Display()
  }, [UserQuestions])
  return (
    <>
      {UserQuestions.map((uq) => (
        
        <Card sx={{ width: 945, marginTop: 10 }}>
          <ToastContainer autoClose={400} position="bottom-right" />
          <CardHeader
            action={
              <IconButton aria-label="settings" onClick={(e) => deleteQuestion(uq._id, e)} >
                <Delete />
              </IconButton>
            }
            title={uq.title}
            subheader={uq.created_at}
          />
          <CardMedia
            component="img"
            height="194"
            image={uq.image ? 'http://localhost:8080/images/'+uq.image:''}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="#3265B9">
                { 'Technologie : '+uq.language}
            </Typography>
          </CardContent>

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {uq.body}
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
            <IconButton onClick={handleOpen}  aria-label="add to favorites">
              <EditIcon />
            </IconButton>

            <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description"
>
  <Box sx={{ ...style, width: 400 }}>
  
    <ChildModal />
  </Box>
</Modal>

          
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                aside for 10 minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                large plate and set aside, leaving chicken and chorizo in the pan. Add
                pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                stirring often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes and
                peppers, and cook without stirring, until most of the liquid is absorbed,
                15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                mussels, tucking them down into the rice, and cook again without
                stirring, until mussels have opened and rice is just tender, 5 to 7
                minutes more. (Discard any mussels that don&apos;t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </>
  );
}
