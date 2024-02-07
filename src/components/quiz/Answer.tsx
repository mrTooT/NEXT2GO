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
          <div className="relative md:h-40 rounded-full mb-6 image-container">
          {
              props.answer.image && (
                  <img
                  src={urlFor(props.answer.image).width(450).url()}
                  className="answer-image w-full md:h-full shadow-lg rounded-full"
                  sizes="(max-width: 900px) 400px, 900px"
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
      
          <p className="text-xl text-muted mb-6 dark:text-slate-300 answer-text">{props.answer.description}</p>
        </>
    )
}

export default RAnswer