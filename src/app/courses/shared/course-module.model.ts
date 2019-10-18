export class CourseModule {
  public name: string;
  public about: string;
  public duration: number;
  public id?: number;
  public count?: number;
  public completed?: number;
  public info?: {};
  public state?: string;

  public constructor(fields: {
    name: string;
    about: string;
    duration: number;
    id?: number;
    count?: number;
    completed?: number;
    info?: {};
    state?: string;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
