import { Button, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './App.css';
import {QuestionCard} from './Components/QuestionCard';
import { quizService } from './Services/quizService';
import { QuestionData } from "./Types/quizTypes";
import ResultCard from './Components/ResultCard'
import firebase from './Services/firebase';

function App() {

  useEffect(() => {
    const messaging = firebase.messaging();
    Notification.requestPermission().then((permission) => {
      console.log("permission");
      messaging.getToken().then((token) => {
        console.log("Token");
        console.log(token);
      })
      .catch((err) => {
        console.log(err);
      })
    })
    .catch((err) => {
      console.log(err);
      
    })
  }, []);
  //states for the quiz app
  let [score, setScore] = useState(0);
  //When we declare the type for useState using <> then we dont use :
  let [quizData, setQuizData] = useState<QuestionData[]>([])
  let [currentQuestion, setCurrentQuestion] = useState(0)
  let [isLoading, setIsLoading] = useState(true);
  let [isGameStarted, setIsGameStarted] = useState(false);
  //display Score Page
  let [showResults, setShowResults] = useState(false);

  const handleNext = (value:string) => {
    if (currentQuestion + 1 < quizData.length)
      setCurrentQuestion(currentQuestion + 1)
    else
    {
      setIsGameStarted(false);
      setShowResults(true);
    }

    if (value === quizData[currentQuestion].answer)
      setScore(score + 1)
  }

  const startGame = async () => {
    setShowResults(false)
    setIsGameStarted(true);
    //Since we need to change the questions whenever a new game is Started so this can be an alternate way rather than useEffect
    await fetchQuizData();
    setCurrentQuestion(0)
    setScore(0);
  }
  async function fetchQuizData() {
    //Since quizService is an async fucntion we have to  use await here
    setIsLoading(true)
    const quizQuestionsAndAnswers: QuestionData[] = await quizService(5, 'easy');
    setQuizData(quizQuestionsAndAnswers)
    setIsLoading(false)
  }

  return (
    <div className='App'>
      <div className="header-div">
          <h1>React Quiz</h1>
      </div>
      <div>
        {isGameStarted? (<Typography gutterBottom variant="h5" component="h2" className='score-counter' style={{fontWeight: 'bolder', color: 'black'}}> Score: {score} </Typography>) : null}
      </div>
      <div style={{textAlign:'center'}}>
        {/* the button is centered by setting the fiv to textalign center */}
        {!isGameStarted? (<Button variant="contained" color="primary" onClick={startGame}> Start Quiz </Button>) : null}
      </div>
      {isGameStarted? ( <QuestionCard quizData={quizData} loading={isLoading} callback={handleNext} currentQuestion={currentQuestion}/>) : null}
      <br />
      {showResults? (<ResultCard score={score}/>) : null}
    </div>
  );
}

export default App;
