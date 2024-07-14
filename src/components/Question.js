import React from 'react';

function Question({ question, nextQuestion }) {
  return (
    <div className="fade-in">
      {question.options.map((option, index) => (
        <button
        key={index}
        className="w-full p-2 my-2 bg-blue-400 text-white border-l-4 border-white hover:bg-white 
        hover:text-blue-400 hover:border-white transition-colors duration-300 relative"
        onClick={() => nextQuestion(option.isCorrect)}
      >
        <span className="absolute left-5">{String.fromCharCode(97 + index)}.</span>
        <span className="ml-1">{option.label}</span>
      </button>
      
      ))}
    </div>
  );
}

export default Question;
