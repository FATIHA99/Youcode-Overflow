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

  function randomColor(){
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }
  const API_URL = 'http://localhost:8080'
  const [answers, setAnswers] = React.useState([])
  const id = props.info._id;
  const [expanded, setExpanded] = React.useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [username, setUsername] = React.useState('')

  function getUser(id) {
    return axios.get(`${API_URL}/auth/user/${id}`)
      .then((response) => {
        setUsername(response.data)
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
  React.useEffect(() => {
    displayAnswers()
  }, [answers])


  function firstLetter(str) {
    let initials = "";
    str.split(" ").forEach(word => {
      initials = initials.concat(word.charAt(0));
    });
    return initials
  }





  return (
    <Card sx={{ maxWidth: 945, marginTop: 10 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor:randomColor()}} aria-label="recipe">
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
      <CardMedia
        component="img"
        height="194"

        image={props.info.image ? 'http://localhost:8080/images/' + props.info.image : ''}
        alt="Paella "
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.info.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>



        <Typography variant="body2" color="text.secondary">
          All Answers
        </Typography>
      </CardActions>
      < >
        <CardContent >
          {answers.map((e,i) => (
            <Card sx={{ maxWidth: 945, marginTop: 2 }} style={{ backgroundColor: '#FEFAF4' }} key={i}>


              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor:randomColor() }} aria-label="recipe">
                    {firstLetter(e.user)}
                  </Avatar>
                }
                title={e.user}
                subheader={e.created_at}
              />
              <Typography style={{ marginLeft: 80, fontSize: 16, color: 'gray' }} paragraph>
                {e.answer}
              </Typography>
            </Card>
          ))}
        </CardContent>
      </>
    </Card>
  );
}