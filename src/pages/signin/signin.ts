import './signin.less';
import signinTmpl from './signin.tmpl';
import Input from '../../components/input';
import Block, { Props } from '../../types/Block.ts';
import Button from '../../components/button';
import Form from '../../components/form';
import SignInForm from '../../components/signinform';
import FormInput from '../../components/forminput';
import { validateLogin, validatePassword } from '../../utils/validation';
import { AuthApi } from '../../api/AuthApi.ts';
import { router } from '../../index.ts';

export class SignIn extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment {
    const loginInput = new Input({
      id: 'login',
      type: 'text',
      name: 'login',
      events: {
        blur: (event: Event) => {
          if (!(event.target instanceof HTMLInputElement)) return;
          const { value } = event.target;
          const isValidate = validateLogin(value);
          loginFormInput.setProps({ error: isValidate ? '' : 'Логин невалиден' });
        },
      },
    });
    const passwordInput = new Input({
      id: 'password',
      type: 'password',
      name: 'password',
      events: {
        blur: (event: Event) => {
          if (!(event.target instanceof HTMLInputElement)) return;
          const { value } = event.target;
          const isValidate = validatePassword(value);
          passwordFormInput.setProps({ error: isValidate ? '' : 'Пароль невалиден' });
        },
      },
    });
    const loginFormInput = new FormInput({ input: loginInput });
    const passwordFormInput = new FormInput({ input: passwordInput });
    const button = new Button({
      label: 'Войти',
    });
    const signInForm = new SignInForm({
      loginInput: loginFormInput,
      passwordInput: passwordFormInput,
      button,
    });
    const form = new Form({
      children: signInForm,
      events: {
        submit: async (event: Event) => {
          event.preventDefault();
          if (!(event.target instanceof HTMLFormElement)) return;
          const formData = new FormData(event.target);
          const login = formData.get('login')?.toString() ?? '';
          const password = formData.get('password')?.toString() ?? '';
          const isLoginValidate = validateLogin(login);
          if (!isLoginValidate) {
            loginFormInput.setProps({ error: 'Логин невалиден' });
          }
          const isPasswordValidate = validatePassword(password);
          if (!isPasswordValidate) {
            passwordFormInput.setProps({ error: 'Пароль невалиден' });
          }

          if (isLoginValidate && isPasswordValidate) {
            try {
              const response = await new AuthApi().signin({
                login,
                password,
              });
              if (response) {
                router.go('/messenger');
              }
              console.log({
                login,
                password,
              });
            } catch (error: unknown) {
              console.error(error);
            }
          }
        },
      },
    });
    this.children = {
      form,
    };
    return this.compile(signinTmpl, {});
  }
}
