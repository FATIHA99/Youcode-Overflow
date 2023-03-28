import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios'
import { MDBTextArea } from 'mdb-react-ui-kit'
import { MDBBtn } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';

import { createContext, useState } from 'react';
import QuestionOverView from './QuestionOverView';





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
  const [view, setView] = useState(false);
  const [viewInfo, setViewInfo] = useState({});
  const [expanded, setExpanded] = React.useState(false);
  const [currentCard, setCurrentCard] = useState(null)

  const handleExpandClick = (i) => {
    setExpanded(!expanded);
    setCurrentCard(i)
  };


  const user = localStorage.getItem('ID').replace(/"/g, '');

  const API_URL = 'http://localhost:8080'
  const [AllQuestions, SetAllQuestions] = React.useState([])


  const [answerInfo, setAnswer] = React.useState({
    answer: '',
    question_id: '',
    user,

  })
  const handleChange = (e) => {
    setAnswer({ ...answerInfo, [e.target.id]: e.target.value })
  }

  const SubmitAnswer = (e, q) => {
    e.preventDefault();
    console.log('id question' + q._id)
    setAnswer({ ...answerInfo, question_id: q._id });

    const answer = {
      answer: answerInfo.answer,
      question_id: q._id,
      user,

    }

    console.log(answer);


    if (answerInfo.answer === '') {

      toast.warning('please fill all  fields ')
    }
    else {

      axios.post(`${API_URL}/answer/add`, answer)
        .then((e) => {
          // console.log(answerInfo)
          toast.success('Answer posted ')
          setExpanded(false)

        })
        .catch((err) => {
          console.log(err)
        })

    }

  }


  function getUser(id) {
    return axios.get(`${API_URL}/auth/user/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  const Display = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      const questions = response.data;
      const questionsWithUser = [];

      for (const q of questions) {
        const user = await getUser(q.user);
        questionsWithUser.push({ ...q, user });
      }

      SetAllQuestions(questionsWithUser);
    } catch (error) {
      console.log(error);
    }
  };

  function firstLetter(str) {
    let initials = "";
    str.split(" ").forEach(word => {
      initials = initials.concat(word.charAt(0));
    });
    return initials
  }
  function handleView(data) {
    setView(true);
    setViewInfo(data)
    console.log(viewInfo)
  }
  React.useEffect(() => {
    Display()
  }, [AllQuestions])

  return (
    <>
      <ToastContainer />
      {
        !view ? (
          <>
            {AllQuestions.map((q, i) => (
              <Card key={q._id} sx={{ width: 945, marginTop: 10 }}>


                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                      {firstLetter(q.user)}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={q.user}
                  subheader={q.created_at}
                />

                <CardContent>
                  <Typography fontSize={20} variant="body2" color="text.secondary">
                    {q.title}
                  </Typography>
                  <Typography fontSize={20} variant="body2" color="blue">
                    {q.language}
                  </Typography>
                </CardContent>

                <CardMedia
                  component="img"
                  height="194"
                  image={q.image ? 'http://localhost:8080/images/' + q.image : ''}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {q.body}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>

                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>

                  <Link onClick={() => {
                    setView(true)
                    setViewInfo(q)

                  }}
                    style={{ color: '#707070' }} >
                    <VisibilityIcon />
                  </Link>
                  {/* <MDBBtn onClick={() => {
              setView(true)
              setViewInfo(q)

            }}> view</MDBBtn> */}
                  {/* <DataContext.Provider value={{  }}>
              <Link to="/question_over_view">Go to Page 2</Link>
            </DataContext.Provider> */}
                  <ExpandMore
                    expand={expanded}
                    onClick={() => handleExpandClick(i)}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <QuestionAnswerIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded && currentCard == i} timeout="auto" unmountOnExit>
                  <CardContent>

                    <form onSubmit={(e) => SubmitAnswer(e, q)} key={q._id}>
                      <Typography paragraph>  Add Answer</Typography>
                      <Typography >
                        <MDBTextArea onChange={handleChange} label='Add Answer' id='answer' rows={6} />
                      </Typography>

                      <Typography>
                        <MDBBtn type='submit' className='mt-1' color='secondary'> Send Answer </MDBBtn>
                      </Typography>

                    </form>

                  </CardContent>
                </Collapse>
              </Card>
            ))}</>
        ) : (<QuestionOverView info={viewInfo} />)
      }

    </>
  );

}
