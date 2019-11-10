export interface ITodo {
  id: number;
  item: string;
  done: boolean;
}

export type Status = "done" | "doing";