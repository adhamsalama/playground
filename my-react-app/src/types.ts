export enum Status {
  NotStarted = "Not Started",
  InProgress = "In Progress",
  Paused = "Paused",
  Done = "Done",
}
export interface ITodo {
  id: number;
  title: string;
  status: Status;
}

export interface updateFunction {
  (id: number, status: Status): void;
}
