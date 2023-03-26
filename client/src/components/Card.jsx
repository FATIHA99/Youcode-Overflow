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
import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios'
import  {MDBTextArea }from 'mdb-react-ui-kit'

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  const API_URL = 'http://localhost:8080'

  const [AllQuestions, SetAllQuestions] = React.useState([])

  

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
        const user =  await getUser(q.user);
        questionsWithUser.push({ ...q, user});
      }
   console.log(questionsWithUser)
      SetAllQuestions(questionsWithUser);
    } catch (error) {
      console.log(error);
    }
  };

  function firstLetter(str){
    let initials = "";
    str.split(" ").forEach(word => {
      initials = initials.concat(word.charAt(0));
    });
    return initials
    
  }

  React.useEffect(() => {
    Display()
  }, [AllQuestions])

  return (
    <>
      {AllQuestions.map((q) => (
        <Card key={q._id} sx={{ width: 945, marginTop: 4 }}>


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
            title={q.user }
            subheader={q.created_at}
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {q.title}
            </Typography>
          </CardContent>

          <CardMedia
            component="img"
            height="194"
            image={q.image ? 'http://localhost:8080/images/'+q.image:''}
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

            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <QuestionAnswerIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>


         
              <Typography paragraph>  Add Answer  </Typography>
           
             
              <Typography paragraph>
              <MDBTextArea label='Add Answer' id='body' rows={4} />
              </Typography>
             


            </CardContent>
          </Collapse>
        </Card>
      ))}
    </>
  );

}
