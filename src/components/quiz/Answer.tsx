import React, { useMemo, useRef, useState } from 'react';
import type { Answer } from '~/types';
import { client } from '~/client';
import imageUrlBuilder from "@sanity/image-url";


interface Props {
    answer: Answer;
}

const RAnswer = (props: Props) => {

const builder = imageUrlBuilder(client);

const urlFor = (source) => {
	return builder.image(source);
}

    return (
        <>
          <div className="relative rounded-full mb-6 image-container">
          {
              props.answer.image && (
                  <img
                  src={urlFor(props.answer.image).width(450).url()}
                  className="answer-image md:h-full shadow-lg rounded-full animate-image w-32 h-32 md:w-40 md:h-40"
                  sizes="(max-width: 500px) 400px, 500px"
                  alt={props.answer.answer}
                  loading="lazy"
                  decoding="async"
                  />
              )
          }
          </div>
          <h3 className="mb-2 text-xl font-bold leading-tight sm:text-2xl font-heading">
          {props.answer.answer}  
          </h3>
      
          <p className="text-xl text-muted mb-6 dark:text-slate-300 answer-text hidden md:block">{props.answer.description}</p>
        </>
    )
}

export default RAnswer