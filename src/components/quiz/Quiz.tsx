import React, { useState, useEffect } from 'react';
import type { Quiz, Question, Answer } from './types/quiz.type';
import RAnswer from '~/components/quiz/Answer.tsx';
import { client } from '~/client';
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from '@portabletext/react';

export interface Props{
  title?: string;
  linkText?: string;
  linkUrl?: string | URL;
  information?: string;
  count?: number;
  quiz: Quiz;
}

export interface Content{
  quizFinishedTitle?: string;
  quizFinishedText?: any;
}

const quizId = 'vacation-quiz';
const builder = imageUrlBuilder(client);

const urlFor = (source) => {
	return builder.image(source);
}

const RQuiz = (props: Props) => {
  const [questions, setQuestions] = useState<Question[] >([]);
  const [content, setContent] = useState<Content>();
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);
  const [animateIndex, setAnimateIndex] = useState<number | null>(null);
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
        console.log('Questions data: ', data);
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
        console.log('Homepage data: ', data[0]);
        setContent(data[0]);
      })
			.catch(console.error);
	}, []);

  const findActiveQuestion: Question | undefined = (activeQuestionId) => {
    return questions.find(question => question.id === activeQuestionId)
  }
  const [activeQuestion, setActiveQuestion] = useState<Question>();

    const RenderAnsweredQuestions = () => {
      if (!answeredQuestions.length) return;

      return (
        <div className="answered-questions" ref={answeredQuestionsRef}>
          {answeredQuestions.map((question: Question) => 
            question.selectedAnswer && <div className="answered-questions question cursor-pointer" key={question.id} onClick={() =>  setActiveQuestion(findActiveQuestion(question.id))}>
              <img
                src={urlFor(question.selectedAnswer.image).width(450).url()}
                className="w-full md:h-full rounded-full shadow-lg"
                width={400}
                sizes="(max-width: 900px) 400px, 900px"
                alt={question.selectedAnswer.answer}
                loading="lazy"
                decoding="async"
              />
              <h3 className="mb-2 text-xl font-bold leading-tight sm:text-2xl font-heading">
                {question.selectedAnswer.answer}  
              </h3>
            </div>
          )}
        </div>
      )
    }

    const RenderActiveQuestions = () => {
        return activeQuestion ? (
          <>
          <div ref={activeQuestionsRef} className="flex items-center justify-between mb-8">
              {activeQuestion.question && (
              <div className="md:max-w-sm">
                  <h2 className="text-4xl font-bold tracking-tight sm:text-4xl sm:leading-none group font-heading mb-2">{activeQuestion.question}</h2>
              </div>
              )}

              {activeQuestion.description && <h3 className="text-muted sm:text-m dark:text-slate-400 lg:text-2xl lg:max-w-md">{activeQuestion.description}</h3>}
          </div>
          <div className="grid lg:gap-6 lg:row-gap-5 grid-cols-2 lg:grid-cols-4 -mb-6">
              {activeQuestion.answers.map((answer, index) => 
                <div className={'lg:mb-6 transition cursor-pointer p-6 pt-12 pb-12 answer-' + index} key={answer.id} onClick={() => onAnswerClick(activeQuestion, answer)}>
                  <RAnswer key={answer.id} answer={answer}></RAnswer>
                </div>
              )}
        
          </div>  
        </>) :
        (<div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-4xl sm:leading-none group font-heading mb-2">{content?.quizFinishedTitle}</h2>
          {content?.quizFinishedText && <PortableText value={content?.quizFinishedText} />}
        </div>)
    }

    const onAnswerClick = (clickedQuestion: Question, clickedAnswer: Answer) => {
      clickedQuestion.selectedAnswer = clickedAnswer;

      // Check if the state already contains an item with the same id
      const existingAnswerIndex = answeredQuestions.findIndex(answer => answer.id === clickedQuestion.id);

      if (existingAnswerIndex !== -1) {
        // If the id already exists, update the existing item
        const updatedAnsweredQuestions = [...answeredQuestions];
        updatedAnsweredQuestions[existingAnswerIndex] = clickedQuestion;
        setAnsweredQuestions(updatedAnsweredQuestions);
      } else {
        // If the id doesn't exist, add the clickedAnswer to the state array
        setAnsweredQuestions(prevAnswers => [...prevAnswers, clickedQuestion]);
      }
      
      setAnimateIndex(clickedAnswer.id)
      setActiveQuestion(findActiveQuestion(activeQuestion.id + 1));
      activeQuestionsRef?.current.scrollIntoView() 


    }

    useEffect(() => {
      setActiveQuestion(findActiveQuestion(1))
    }, [questions])
    

    // const [saving, setSaving] = useState(false)
    return (
    <div id={quizId} className="relative px-4 md:px-6 py-12 md:py-16 lg:py-20 text-default mx-auto max-w-6xl">
            { <RenderAnsweredQuestions />}
            { <RenderActiveQuestions />}
    </div>
    )

}

export default RQuiz;

