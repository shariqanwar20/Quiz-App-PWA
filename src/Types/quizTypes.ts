export type QuizData = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

export type QuestionData = {
    question: string,
    answer: string,
    options: string[]
}

export type QuestionCardProps = {
    quizData: QuestionData[],
    loading: boolean,
    callback: (value: string) => void,
    currentQuestion: number
}