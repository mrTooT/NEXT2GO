import React, { useMemo, useRef, useState } from 'react';
import type { Answer } from '~/types';


interface Props {
    answer: Answer;
}

const RAnswer = (props: Props) => {
    return (
        <>
          <div className="relative md:h-64 rounded-full shadow-lg mb-6">
          {
              props.answer.image && (
                  <img
                  src={props.answer.image}
                  className="w-full md:h-full rounded-full shadow-lg"
                  width={400}
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
      
          <p className="text-xl text-muted mb-6 dark:text-slate-300">{props.answer.description}</p>
        </>
    )
}

export default RAnswer