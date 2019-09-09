export class Teacher {
  public name: string;
  public about: string;
  public image: string;

  public constructor(fields?: { name?: string; about?: string; image?: string }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
