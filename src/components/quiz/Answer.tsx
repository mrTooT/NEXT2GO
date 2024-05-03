import React, { useMemo, useState } from 'react';
import type { Answer } from '~/types';
import { client } from '~/client';
import imageUrlBuilder from '@sanity/image-url';

interface Props {
  answer: Answer;
}

const RAnswer = (props: Props) => {
  const [animateAnswer, setAnimateAnswer] = useState(false);

  const builder = imageUrlBuilder(client);

  const urlFor = (source) => {
    return builder.image(source);
  };

  const toggleAnimateAnswer = () => {
    setAnimateAnswer(true);
  };

  return (
    <>
      <div
        className={
          'relative rounded-full mb-4 lg:mb-6 image-container answer-inner' + (animateAnswer ? ' animate-answer' : '')
        }
        onClick={toggleAnimateAnswer}
      >
        {props.answer.image && (
          <img
            src={urlFor(props.answer.image).width(450).url()}
            className="answer-image md:h-full shadow-lg rounded-full animate-image w-32 h-32 md:w-36 md:h-36"
            sizes="(max-width: 500px) 400px, 500px"
            alt={props.answer.answer}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      <h3
        className={
          'text-center mb-4 text-l font-bold leading-tight sm:text-xl font-heading answer-text-base' +
          (animateAnswer ? ' animate-answer-text' : '')
        }
      >
        {props.answer.answer}
      </h3>

      <p
        className={
          'text-center text-m text-muted dark:text-slate-300 answer-text hidden md:block answer-text-base' +
          (animateAnswer ? ' animate-answer-text' : '')
        }
      >
        {props.answer.description}
      </p>
    </>
  );
};

export default RAnswer;
