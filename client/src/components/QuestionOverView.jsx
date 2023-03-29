import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios'
import Collapse from '@mui/material/Collapse';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { MDBTextArea } from 'mdb-react-ui-kit'
import { MDBBtn } from 'mdb-react-ui-kit';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import { ToastContainer, toast } from "react-toastify";

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

export default function QuestionOverView(props) {

  // const [randomColor, setRandomColor] = React.useState([]);
  // const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  // const [randomColor, setRandomColor] = React.useState(getRandomColor());

  // const [num, setnum] = React.useState("#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0"));

  const [expanded, setExpanded] = React.useState(false);
  const [expand, setExpand] = React.useState(false);

  const [showComment, setShowComment] = React.useState(null)
  const [currentCard, setCurrentCard] = React.useState(null)

  function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }

  const API_URL = 'http://localhost:8080'
  const [answers, setAnswers] = React.useState([])
  const id = props.info._id;
  const user = localStorage.getItem('ID').replace(/"/g, '');
  const [commentsData, setCommentData] = React.useState([])

  const handleExpandClick = (y) => {
    setExpanded(true);
    setExpand(false);
    setCurrentCard(y)
  };

  const handleClick =  (i, id) => {
   
     setExpand(true);
    setExpanded(false);
    setShowComment(i)
    DisplayComment(id)
  };


  function getUser(id) {
    return axios.get(`${API_URL}/auth/user/${id}`)
      .then((response) => {
        // setUsername(response.data)
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  const displayAnswers = async () => {
    try {
      const answers = await axios.get(`${API_URL}/answer/question/${id}`);
      const answ = answers.data;
      const AnswerWithUser = [];
      for (const a of answ) {
        const user = await getUser(a.user);
        AnswerWithUser.push({ ...a, user });
      }
      setAnswers(AnswerWithUser);
    } catch (error) {
      console.log(error);
    }

  }

  const DisplayComment = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/comment/${id}`);
      const allComments = response.data
      const commentWithUser = []

      for (const c of allComments) {
        const user = await getUser(c.user);
        commentWithUser.push({ ...c, user });
      }
      setCommentData(commentWithUser);
    } catch (error) {
      console.log(error);
    }
  };


  React.useEffect(() => {
    displayAnswers()
  }, [])


  function firstLetter(str) {
    let initials = "";
    str.split(" ").forEach(word => {
      initials = initials.concat(word.charAt(0));
    });
    return initials
  }
  const [comments, setComment] = React.useState({
    comment: '',
    question_id: '',
    user,
  })
  const handleChange = (e) => {
    setComment({ ...comments, [e.target.id]: e.target.value })
  }

  const SubmitComment = (event, e) => {
    event.preventDefault();
    setComment({ ...comments, answer_id: e._id });
    const comment = {
      comment: comments.comment,
      answer_id: e._id,
      user,
    }

    if (comments.comment === '') { toast.warning('please fill all  fields ') }
    else {
      axios.post(`${API_URL}/comment/add`, comment)
        .then((e) => {
          toast.success('comment posted ')
          setExpanded(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <Card sx={{ width: 945, marginTop: 10 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: randomColor() }} aria-label="recipe">
            {firstLetter(props.info.user)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.info.user}
        subheader={props.info.created_at}
      />
      <CardContent>
        <Typography fontSize={20} variant="body2" style={{color : "#3265B9"}}>
           Technologie : {props.info.language}
        </Typography>
        <Typography fontSize={20} variant="body2" style={{color : "#3265B9"}}>
          Title : {props.info.title}
        </Typography>
      </CardContent>

      <CardContent>
        <CardMedia
          component="img"
          height="194"

          image={props.info.image ? 'http://localhost:8080/images/' + props.info.image : ''}
          alt="Paella "
        />

        <Typography variant="body2" color="text.secondary">
          {props.info.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
       
      </CardActions>
       <Typography variant="body2" color="text.secondary" style={{marginLeft : 20}}>
          All Answers
        </Typography>
    
        <CardContent >

          {answers.map((e, i) => {
            return (
              <Card sx={{ maxWidth: 945, marginTop: 2 }} style={{ backgroundColor: '#FEFAF4' }} key={i}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: randomColor() }} aria-label="recipe">
                      {firstLetter(e.user)}
                    </Avatar>
                  }
                  title={e.user}
                  subheader={e.created_at}
                />
                <Typography style={{ marginLeft: 80, fontSize: 16, color: 'gray' }} paragraph>
                  {e.answer}
                </Typography>

                <CardActions disableSpacing>
                  <MDBBtn
                    expand={expand}
                    onClick={() =>handleClick(i, e._id)}
                    aria-expanded={expand}
                    aria-label="show more "
                    color='link'
                    className='mt-1' > show all comments  </MDBBtn>
                    

                  <ExpandMore
                    expand={expanded}
                    onClick={() =>  handleExpandClick(i)}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <MapsUgcIcon />
                  </ExpandMore>

                </CardActions>

               { (expand==true) ? <Collapse in={expand && showComment == i} timeout="auto" unmountOnExit>
                  <CardContent>
                    {commentsData.map((e) => {
                      return (
                        <Card sx={{ maxWidth: 945, marginTop: 2 }} style={{ backgroundColor: '#FEF2E0' }} key={e._id}>
                          <CardHeader
                            avatar={
                              <Avatar sx={{ bgcolor: randomColor() }} aria-label="recipe">
                                {firstLetter(e.user)}
                              </Avatar>
                            }
                            action={
                              <IconButton aria-label="settings">
                                <MoreVertIcon />
                              </IconButton>
                            }
                            title={e.user}
                            subheader={e.created_at}
                          />
                          <Typography style={{ marginLeft: 80 }} paragraph>  {e.comment} </Typography>
                        </Card>
                      )
                    })}
                  </CardContent>
                </Collapse>:""}
{ (expanded==true) ? 
               <Collapse in={expanded && currentCard == i} timeout="auto" unmountOnExit>
                  <CardContent>
                    <form onSubmit={(event) => SubmitComment(event, e)} key={e._id}>
                      <Typography style={{ marginLeft: 10 }}>
                        <Typography paragraph>  Add Comment</Typography>
                        <MDBTextArea onChange={handleChange} label='Add Comment' id='comment' rows={4} />
                        {/* <MDBTextArea value={e._id} label='Add Comment' id='comment' rows={4} /> */}
                        <MDBBtn type='submit' style={{ backgroundColor: '#706E6B' }} color='dark' className='mt-1' > Send  Comment  </MDBBtn>
                      </Typography>
                    </form>
                  </CardContent>
                </Collapse>:""}
              </Card>
            )
          })}
        </CardContent>
     
    </Card>
  );
}