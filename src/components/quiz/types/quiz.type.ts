export interface Quiz {
    questions: Question[]
  }
  
  export interface Question {
    id: number
    question: string;
    description: string;
    image?: string;
    answers: Answer[];
    selectedAnswer?: Answer;
  }
  
  export interface Answer {
    id: string;
    answer: string;
    image?: string;
    description?: string;
  }