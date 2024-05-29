import './signin.less';
import signinTmpl from './signin.tmpl';
import Input from '../../components/input';
import Center from '../../components/center';
import { render } from '../../utils/renderDOM';
import Block, { Props } from '../../types/block';
import Button from '../../components/button';
import Form from '../../components/form';
import SignInForm from '../../components/signinform';
import FormInput from '../../components/forminput';
import { validateLogin, validatePassword } from '../../utils/validation';

class SignIn extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(signinTmpl, this.props);
  }
}

let loginValue: string;
let passwordValue: string;

document.addEventListener('DOMContentLoaded', () => {
  const loginInput = new Input({
    id: 'login',
    type: 'text',
    name: 'login',
    events: {
      blur: (event: any) => {
        const { value } = event.target;
        const isValidate = validateLogin(value);
        loginFormInput.setProps({ error: isValidate ? '' : 'Логин невалиден' });
        if (isValidate) {
          loginValue = value;
        }
      },
    },
  });
  const passwordInput = new Input({
    id: 'password',
    type: 'password',
    name: 'password',
    events: {
      blur: (event: any) => {
        const { value } = event.target;
        const isValidate = validatePassword(value);
        passwordFormInput.setProps({ error: isValidate ? '' : 'Пароль невалиден' });
        if (isValidate) {
          passwordValue = value;
        }
      },
    },
  });
  const loginFormInput = new FormInput({ input: loginInput });
  const passwordFormInput = new FormInput({ input: passwordInput });
  const button = new Button({
    label: 'Войти',
    events: {
      click: (event: any) => {
        event.preventDefault();
        const isLoginValidate = validateLogin(loginValue);
        if (!isLoginValidate) {
          loginFormInput.setProps({ error: 'Логин невалиден' });
        }
        const isPasswordValidate = validatePassword(passwordValue);
        if (!isPasswordValidate) {
          passwordFormInput.setProps({ error: 'Пароль невалиден' });
        }
        if (isLoginValidate && isPasswordValidate) {
          console.log({ login: loginValue, password: passwordValue });
        }
      },
    },
  });
  const signInForm = new SignInForm({
    loginInput: loginFormInput,
    passwordInput: passwordFormInput,
    button,
  });
  const form = new Form({
    children: signInForm,
  });
  const signIn = new SignIn({ form });
  const center = new Center({ children: signIn });

  render('#root', center);
});
