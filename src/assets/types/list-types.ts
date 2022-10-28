export interface Answer {
  img: any;
  answers: string[];
}

export type AnswerList = Array<Answer>;

export enum DeckNames {
  BOLLARDS = 'bollards',
  POLES = 'poles',
  MIXED = 'mixed'
}
