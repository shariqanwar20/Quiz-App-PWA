//call the api for the quiz and return the relevant data
// to the file which will call this function i.e usEffect hook in App.tsx
//Api: https://opentdb.com/api.php?amount={totalQuestions}&difficulty={level}&type=multiple

import { QuestionData, QuizData } from "../Types/quizTypes";

const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5)

// it iterates over an array of QuizData type objects and assigns the relevant data i.e question data to the array quizQuestion
export const quizService = async (totalQuestions: number, level: string) => {
    const response = await fetch (`https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=multiple`);
    const { results } = await response.json();
    const quizQuestion: QuestionData[] = results.map((questionObj: QuizData) => {
        return(
            {
                question : questionObj.question,
                answer : questionObj.correct_answer,
                options: shuffleArray(questionObj.incorrect_answers.concat(questionObj.correct_answer)),
            }
        )
    })

    return quizQuestion;
}