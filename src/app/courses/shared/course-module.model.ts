export class CourseModule {
  public name: string;
  public about: string;
  public duration: number;
  public id?: number;
  public count?: number;
  public completed?: number;
  public info?: {};

  public constructor(fields: {
    name: string;
    about: string;
    duration: number;
    id?: number;
    count?: number;
    completed?: number;
    info?: {};
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
