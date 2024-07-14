import React, { useState } from 'react';
import questionsData from './questionData.json';
import Question from './components/Question';
import ProgressBar from './components/ProgressBar';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questionsData.questions.length).fill(null));
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (isCorrect) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = isCorrect;
    setAnswers(updatedAnswers);

    if (currentQuestion < questionsData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartQuiz = () => {
    setShowScore(false);
    setCurrentQuestion(0);
    setAnswers(Array(questionsData.questions.length).fill(null));
  };

  const score = Math.round((answers.filter(Boolean).length / questionsData.questions.length) * 100);
  const passmark = questionsData.passmark;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      {!showScore ? (
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <button 
              onClick={prevQuestion} 
              disabled={currentQuestion === 0}
              className="text-gray-500 font-bold text-3xl mb-3"
            >
              &larr;
            </button>
            <div className="text-center w-full">
              <div className="text-gray-500 text-lg font-bold pt-3">
                {currentQuestion + 1} / {questionsData.questions.length}
              </div>
              <ProgressBar
                current={currentQuestion + 1}
                total={questionsData.questions.length}
              />
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">{questionsData.questions[currentQuestion].question}</h2>
              <div className="text-gray-500 text-sm mb-4">
                History of Art
              </div>
            </div>
            <div className="bg-blue-500 p-4 rounded-lg">
              <Question
                question={questionsData.questions[currentQuestion]}
                nextQuestion={handleAnswerClick}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className={`text-2xl font-semibold mb-4 ${score >= passmark ? 'text-green-500' : 'text-orange-500'}`}>
            {score >= passmark ? 'Passed' : 'Failed'}: {score}%
          </h2>
          <button onClick={restartQuiz} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
            Done
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
