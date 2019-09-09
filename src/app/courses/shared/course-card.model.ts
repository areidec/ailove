import { CourseModule } from './course-module.model';
export class CourseCard {
  public name: string;
  public about: string;
  public backgroundColor: string;
  public color: string;
  public modules: CourseModule[];
  public extraModules: CourseModule[];
  public test: CourseModule;
  public id?: number;

  public constructor(fields: {
    name: string;
    about: string;
    backgroundColor: string;
    color: string;
    modules: CourseModule[];
    extraModules: CourseModule[];
    test: CourseModule;
    id?: number;
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export interface ApiModel {
  title: string;
  about: string;
  background_color: string;
  color: string;
  modules: [];
  extra_modules: [];
  final_test: { title: string; info: string; duration: number };
  id: number;
}

export interface UserInfoResponse {
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
  is_email_verified: boolean;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  emailVerified: boolean;
}
