export class State {
  public id: number;
  public base: string;

  public constructor(fields?: { id?: number; base?: string }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
