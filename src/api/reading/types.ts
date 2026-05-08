export interface ReadingAnswerApi {
  answer: string;
  isCorrect: boolean;
}

export interface ReadingQuestionApi {
  question: string;
  answers: ReadingAnswerApi[];
}

export interface ReadingPassageApi {
  id: number;
  level: string;
  title: string;
  image: string;
  paragraph: string;
  questions: ReadingQuestionApi[];
}

export type ReadingCreatePayload = Omit<ReadingPassageApi, 'id'>;
export type ReadingUpdatePayload = Partial<ReadingCreatePayload>;
