import { Component, OnInit } from '@angular/core';
import { RegistrationService } from './registration.service';
import { RegistrationInputField, UserData, GlobalErrors } from './registration.model';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.styl'],
})
export class RegistrationComponent implements OnInit {
  private toggleRegistration: (nextVal: boolean) => void;
  private setUserData: (name: string, value: string) => void;
  private getUserData: () => UserData;
  public userData: UserData;
  public inputs: RegistrationInputField[];
  public userDataForm: FormGroup;
  public maxDate = new Date();
  private hideState = {
    password: true,
    password_repeat: true,
  };
  private submitRegistration: (userData: UserData) => void;

  public rules = false;
  public personal = false;

  public globalErrors: string[] = [];

  constructor(private registrationState: RegistrationService) {
    this.toggleRegistration = (nextVal: boolean) => registrationState.toggleRegistration(nextVal);
    this.setUserData = (name: string, value: string) => registrationState.setUserData(name, value);
    this.getUserData = () => registrationState.getUserData();
    this.submitRegistration = (userData: UserData) =>
      registrationState.submitRegistration(userData);
    registrationState.registrationDataObs.subscribe((payload) => {
      this.inputs = payload;
    });
    this.userData = this.getUserData();
    registrationState.globalErrors.subscribe((newErrors: string[]) => {
      this.globalErrors = newErrors;
    });
  }

  initForm() {
    const getValidators = (name: string): ValidatorFn[] => {
      const defaultValidators = [Validators.required, Validators.minLength(1)];
      const passwordDefaultValidators = [Validators.required, Validators.minLength(6)];
      switch (name) {
        case 'email': {
          return [Validators.email, ...defaultValidators];
        }
        case 'password': {
          return [...passwordDefaultValidators];
        }
        case 'password_repeat': {
          return [this.checkPasswords, ...passwordDefaultValidators];
        }
        default: {
          return [...defaultValidators];
        }
      }
    };
    const getFormControls = (initialObj: {}): {} => {
      const newObj = Object.assign({}, initialObj);
      Object.keys(newObj).forEach((key) => {
        newObj[key] = new FormControl(this.userData[key], getValidators(key));
      });
      return newObj;
    };

    this.userDataForm = new FormGroup({ ...getFormControls(this.userData) });

    Object.keys(this.userDataForm.controls).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => {
          return this.userDataForm.get(key);
        },
      });
    });
  }

  validateForm(): void {
    const valid = this.userDataForm.valid;
    if (valid) {
      Object.keys(this.userData).forEach((key) => {
        this.setUserData(key, this[key].value);
      });
      this.userData = this.getUserData();
      this.submitRegistration(this.userData);
    }
  }

  handleInput(name: string) {
    this.setUserData(name, this[name].value);
  }

  getField = (name: string): FormControl => this[name];

  checkPasswords = () => {
    if (this.userDataForm) {
      const password = this.userDataForm.controls.password.value;
      const confirmPassword = this.userDataForm.controls.password_repeat.value;

      return password === confirmPassword ? null : { notEqual: true };
    }
    return null;
  };

  ngOnInit(): void {
    this.initForm();
  }

  getHide = (name: string): boolean => this.hideState[name];

  setHide = (name: string) => {
    this.hideState[name] = !this.hideState[name];
  };

  getBigClass(name: string) {
    const namesForBigClassName = [
      'first_name',
      'last_name',
      'area_id',
      'city_id',
      'course',
      'program_source',
    ];
    return {
      big: namesForBigClassName.some((el) => el === name),
    };
  }
}
