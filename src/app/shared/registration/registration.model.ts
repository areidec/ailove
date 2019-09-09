interface RegInputValue {
  name: string;
  value: string | number;
}

export interface RegistrationInputField {
  name: string;
  type: string;
  placeholder: string;
  values?: RegInputValue[];
}

export interface UserData {
  [key: string]: string;
}

export interface GlobalErrors {
  [key: string]: string;
}
