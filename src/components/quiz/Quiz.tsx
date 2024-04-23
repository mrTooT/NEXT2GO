import React, { useState, useEffect } from 'react';
import type { Quiz, Question, Answer } from './types/quiz.type';
import RAnswer from '~/components/quiz/Answer.tsx';
import { client } from '~/client';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';

export interface Props {
  title?: string;
  linkText?: string;
  linkUrl?: string | URL;
  information?: string;
  count?: number;
  quiz: Quiz;
}

export interface Content {
  quizFinishedTitle?: string;
  quizFinishedText?: any;
}

const quizId = 'vacation-quiz';
const builder = imageUrlBuilder(client);

const urlFor = (source) => {
  return builder.image(source);
};

const RQuiz = (props: Props) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [content, setContent] = useState<Content>();
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);
  const activeQuestionsRef = React.createRef();
  const answeredQuestionsRef = React.createRef();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "question"]{
      id,
      question,
      description,
      answers,
    }`
      )
      .then((data) => {
        generateQuestions(data);
        setQuestions(data);
      })
      .catch(console.error);

    client
      .fetch(
        `*[_type == "home"]{
      quizFinishedTitle,
      quizFinishedText, 
    }`
      )
      .then((data) => {
        setContent(data[0]);
      })
      .catch(console.error);
  }, []);

  const generateQuestions = (data) => {
    console.log('questions data: ', data);
  };

  const findActiveQuestion: Question | undefined = (activeQuestionId) => {
    return questions.find((question) => question.id === activeQuestionId);
  };
  const [activeQuestion, setActiveQuestion] = useState<Question>();
  const [activeQuiz, setActiveQuiz] = useState(false);

  const scrollIntoView = () => {
    if (activeQuestion && activeQuestionsRef?.current) {
      activeQuestionsRef?.current.scrollIntoView();
    } else if (!activeQuestion && answeredQuestionsRef?.current) {
      answeredQuestionsRef?.current.scrollIntoView();
    }
  };

  const RenderAnsweredQuestions = () => {
    if (!answeredQuestions.length) return;

    return (
      <div className={'answered-questions ' + (!activeQuestion ? 'finished' : '')} ref={answeredQuestionsRef}>
        {answeredQuestions.map(
          (question: Question) =>
            question.selectedAnswer && (
              <div
                className="answered-questions question cursor-pointer"
                key={question.id}
                onClick={() => setActiveQuestion(findActiveQuestion(question.id))}
              >
                <img
                  src={urlFor(question.selectedAnswer.image).width(450).url()}
                  className="rounded-full shadow-lg w-16 h-16 md:w-24 md:h-24"
                  width={400}
                  sizes="(max-width: 900px) 400px, 900px"
                  alt={question.selectedAnswer.answer}
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="answered-question-text mb-2 text-l font-bold leading-tight sm:text-xl font-heading">
                  {question.selectedAnswer.answer}
                </h3>
              </div>
            )
        )}
      </div>
    );
  };

  const RenderActiveQuestions = () => {
    return activeQuestion ? (
      <>
        <div className="flex md:items-center justify-between mb-4 md:mb-8 flex-col md:flex-row">
          {activeQuestion.question && (
            <div className="md:max-w-sm">
              <h2 className="text-3xl font-bold tracking-tight sm:text-2xl sm:leading-none group font-heading mb-2">
                {activeQuestion.question}
              </h2>
            </div>
          )}

          {activeQuestion.description && (
            <h3 className="text-muted sm:text-m dark:text-slate-400 lg:text-l lg:max-w-md">
              {activeQuestion.description}
            </h3>
          )}
        </div>
        <div className="grid lg:gap-6 lg:row-gap-5 grid-cols-2 lg:grid-cols-4 -mb-6">
          {activeQuestion.answers.map((answer, index) => (
            <div
              className={'lg:mb-6 transition cursor-pointer p-6 md:pt-8 md:pb-8 answer-' + index}
              key={answer.id}
              onClick={() => onAnswerClick(activeQuestion, answer)}
            >
              <RAnswer key={answer.id} answer={answer}></RAnswer>
            </div>
          ))}
        </div>
      </>
    ) : (
      activeQuiz && (
        <div className="mt-4 md:mx-auto md:mb-12 text-center max-w-3xl">
          <h2 className="text-4xl font-bold tracking-tight sm:text-4xl sm:leading-none group font-heading mb-2 md:mx-auto md:mb-2 text-center max-w-3xl">
            {content?.quizFinishedTitle}
          </h2>
          {content?.quizFinishedText && <PortableText value={content?.quizFinishedText} />}
          {props.children}
        </div>
      )
    );
  };

  const onAnswerClick = (clickedQuestion: Question, clickedAnswer: Answer) => {
    window.setTimeout(() => {
      setActiveQuiz(true);
      clickedQuestion.selectedAnswer = clickedAnswer;

      // Check if the state already contains an item with the same id
      const existingAnswerIndex = answeredQuestions.findIndex((answer) => answer.id === clickedQuestion.id);

      if (existingAnswerIndex !== -1) {
        // If the id already exists, update the existing item
        const updatedAnsweredQuestions = [...answeredQuestions];
        updatedAnsweredQuestions[existingAnswerIndex] = clickedQuestion;
        setAnsweredQuestions(updatedAnsweredQuestions);
      } else {
        // If the id doesn't exist, add the clickedAnswer to the state array
        setAnsweredQuestions((prevAnswers) => [...prevAnswers, clickedQuestion]);
      }

      if (activeQuestion && activeQuestion.id) {
        switch (clickedAnswer.id) {
          case 'summer':
            setActiveQuestion(findActiveQuestion(11));
            break;
          case 'city':
            setActiveQuestion(findActiveQuestion(21));
            break;
          case 'wintersport':
            setActiveQuestion(findActiveQuestion(31));
            break;
          case 'world':
            setActiveQuestion(findActiveQuestion(41));
            break;
          default:
            setActiveQuestion(findActiveQuestion(activeQuestion.id + 1));
            break;
        }
        scrollIntoView();
      }
    }, 300);
  };

  useEffect(() => {
    setActiveQuestion(findActiveQuestion(1));
  }, [questions]);

  const handleCloseQuiz = () => {
    setAnsweredQuestions([]);
    setActiveQuestion(findActiveQuestion(1));
    setActiveQuiz(false);
  };

  return (
    <div className={`${activeQuiz ? 'active' : ''}`}>
      {activeQuiz && <div className="close-icon" onClick={handleCloseQuiz}></div>}
      <div
        id={quizId}
        ref={activeQuestionsRef}
        className={'relative px-4 md:px-6 py-7 md:py-16 lg:py-20 text-default mx-auto max-w-6xl'}
      >
        <div className="text-center pb-4 md:pb-0 max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold leading-tighter tracking-tighter mb-4 font-heading dark:text-gray-200">
            <span className="text-accent dark:text-white highlight">Travel Quiz</span>
          </h1>
        </div>
        <div className={`${activeQuiz ? 'quiz-wrapper' : ''}`}>
          {<RenderAnsweredQuestions />}
          {<RenderActiveQuestions />}
        </div>
        {!activeQuiz && (
          <div className="max-w-xs pt-4 sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center gap-4">
            <div className="flex w-full sm:w-auto">
              <a className="btn-primary w-full sm:mb-0" onClick={() => setActiveQuiz(true)}>
                Start travel quiz
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RQuiz;
