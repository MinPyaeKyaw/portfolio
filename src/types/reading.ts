export interface ReadingAnswer {
  answer: string;
  isCorrect: boolean;
}

export interface ReadingPassage {
  id: number;
  level: string;
  title: string;
  image: string;
  paragraph: string;
  question: string;
  answers: ReadingAnswer[];
}
