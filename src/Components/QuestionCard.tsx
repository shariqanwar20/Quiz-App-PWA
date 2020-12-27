import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { QuestionCardProps } from "../Types/quizTypes";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: 'auto',
        marginTop: '20px',
    },
    nextButton: {
        width: '100%',
        textAlign: 'center'
    },
    radio: {
        '&$checked': {
          color: '#3f51b5'
        }
      },
    checked: {}
});

export const QuestionCard: React.FC<QuestionCardProps> = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value);
    };
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (value !== '')
        {
            // if (value === props.quizData[props.currentQuestion].answer)
            //     props.scoreCallback();
            console.log("correct answer: " + props.quizData[props.currentQuestion].answer + "; user selected: " + value)
            props.callback(value);
            setValue('')
        }
    }

    if (!props.loading)
    {
        return ( 
        <Card className={classes.root}>
            <CardContent>
                {/* <h5 dangerouslySetInnerHTML={{__html: props.quizData[props.currentQuestion].question}}/> */}
                <Typography dangerouslySetInnerHTML={{__html: props.quizData[props.currentQuestion].question}} variant="body2" color="textSecondary" component="p" />
                {/*buttons for answers*/}
                <form onSubmit={handleSubmit}>
                    <FormControl component="fieldset" required>
                        <RadioGroup aria-label="options" name="answer" value={value}  onChange={handleChange}>
                            <FormControlLabel value={props.quizData[props.currentQuestion].options[0]} control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>} label={props.quizData[props.currentQuestion].options[0]} />
                            <FormControlLabel value={props.quizData[props.currentQuestion].options[1]} control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>} label={props.quizData[props.currentQuestion].options[1]} />
                            <FormControlLabel value={props.quizData[props.currentQuestion].options[2]} control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>} label={props.quizData[props.currentQuestion].options[2]} />
                            <FormControlLabel value={props.quizData[props.currentQuestion].options[3]} control={<Radio classes={{root: classes.radio, checked: classes.checked}}/>} label={props.quizData[props.currentQuestion].options[3]} />
                        </RadioGroup>
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit" className={classes.nextButton}>
                            Next
                    </Button>
                </form>
            </CardContent>
            <CardActions>
                {/* {answerSelected? (
                <Button variant="contained" color="primary" className={classes.nextButton} onClick={props.callback}>
                    Next
                </Button>
                ) : null} */}
            </CardActions>
        </Card>
    );
    }
    else
    {
        return(
            <Typography gutterBottom variant="h4" style={{textAlign: 'center'}}>
                Loading!!
            </Typography>
        )
    }
}
