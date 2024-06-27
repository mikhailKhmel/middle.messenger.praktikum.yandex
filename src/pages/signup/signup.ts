import './signup.less';
import Input from '../../components/input';
import Block, { Props } from '../../types/Block.ts';
import signupTmpl from './signup.tmpl';
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePhone,
} from '../../utils/validation';
import FormInput from '../../components/forminput';
import Button from '../../components/button';
import { AuthApi } from '../../api/AuthApi.ts';
import { router } from '../../index.ts';
import Form from '../../components/form';
import SignUpForm from '../../components/signupform';

export class SignUp extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment {
    const button = new Button({
      label: 'Зарегистрироваться',
    });
    const inputEmail = new Input({
      id: 'email',
      type: 'text',
      name: 'email',
      events: {
        blur: (event: Event) => {
          if (!(event.target instanceof HTMLInputElement)) return;

          const { value } = event.target;
          const isValidate = validateEmail(value);
          emailFormInput.setProps({ error: isValidate ? '' : 'Email невалиден' });
        },
      },
    });
    const inputLogin = new Input({
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
    const inputFirstname = new Input({
      id: 'first_name',
      type: 'text',
      name: 'first_name',
      events: {
        blur: (event: Event) => {
          if (!(event.target instanceof HTMLInputElement)) return;

          const { value } = event.target;
          const isValidate = validateName(value);
          firstnameFormInput.setProps({ error: isValidate ? '' : 'Имя невалидно' });
        },
      },
    });
    const inputSecondname = new Input({
      id: 'last_name',
      type: 'text',
      name: 'last_name',
      events: {
        blur: (event: Event) => {
          if (!(event.target instanceof HTMLInputElement)) return;

          const { value } = event.target;
          const isValidate = validateName(value);
          secondnameFormInput.setProps({ error: isValidate ? '' : 'Имя невалидно' });
        },
      },
    });
    const inputPhone = new Input({
      id: 'phone',
      type: 'phone',
      name: 'phone',
      events: {
        blur: (event: Event) => {
          if (!(event.target instanceof HTMLInputElement)) return;

          const { value } = event.target;
          const isValidate = validatePhone(value);
          phoneFormInput.setProps({ error: isValidate ? '' : 'Номер телефона невалиден' });
        },
      },
    });
    const inputFirstPassword = new Input({
      id: 'password',
      type: 'password',
      name: 'first_password',
      events: {
        blur: (event: Event) => {
          if (!(event.target instanceof HTMLInputElement)) return;

          const { value } = event.target;
          const isValidate = validatePassword(value);
          firstPasswordFormInput.setProps({ error: isValidate ? '' : 'Пароль невалиден' });
        },
      },
    });
    const inputSecondPassword = new Input({
      id: 'password',
      type: 'password',
      name: 'last_password',
      events: {
        blur: (event: Event) => {
          if (!(event.target instanceof HTMLInputElement)) return;

          const { value } = event.target;
          const isValidate = validatePassword(value);
          secondPasswordFormInput.setProps({ error: isValidate ? '' : 'Пароль невалиден' });
        },
      },
    });

    const emailFormInput = new FormInput({ input: inputEmail });
    const loginFormInput = new FormInput({ input: inputLogin });
    const firstnameFormInput = new FormInput({ input: inputFirstname });
    const secondnameFormInput = new FormInput({ input: inputSecondname });
    const phoneFormInput = new FormInput({ input: inputPhone });
    const firstPasswordFormInput = new FormInput({ input: inputFirstPassword });
    const secondPasswordFormInput = new FormInput({ input: inputSecondPassword });
    const signUpForm = new SignUpForm({
      inputEmail: emailFormInput,
      inputLogin: loginFormInput,
      inputFirstname: firstnameFormInput,
      inputLastname: secondnameFormInput,
      inputPhone: phoneFormInput,
      inputFirstPassword: firstPasswordFormInput,
      inputSecondPassword: secondPasswordFormInput,
      button,
    });
    const form = new Form({
      children: signUpForm,
      events: {
        submit: async (event: Event) => {
          event.preventDefault();
          if (!(event.target instanceof HTMLFormElement)) return;
          const formData = new FormData(event.target);
          const email = formData.get('email')?.toString() ?? '';
          const login = formData.get('login')?.toString() ?? '';
          const firstname = formData.get('first_name')?.toString() ?? '';
          const lastname = formData.get('last_name')?.toString() ?? '';
          const phone = formData.get('phone')?.toString() ?? '';
          const firstpassword = formData.get('first_password')?.toString() ?? '';
          const secondpassword = formData.get('last_password')?.toString() ?? '';
          const isEmailValidate = validateEmail(email);
          if (!isEmailValidate) {
            emailFormInput.setProps({ error: 'Email невалиден' });
          }
          const isLoginValidate = validateLogin(login);
          if (!isLoginValidate) {
            loginFormInput.setProps({ error: 'Логин невалиден' });
          }
          const isFirstnameValidate = validateName(firstname);
          if (!isFirstnameValidate) {
            firstnameFormInput.setProps({ error: 'Имя невалидно' });
          }
          const isLastnameValidate = validateName(lastname);
          if (!isLastnameValidate) {
            secondnameFormInput.setProps({ error: 'Имя невалидно' });
          }
          const isPhoneValidate = validatePhone(phone);
          if (!isPhoneValidate) {
            phoneFormInput.setProps({ error: 'Номер невалиден' });
          }
          const isFirstPasswordValidate = validatePassword(firstpassword);
          if (!isFirstPasswordValidate) {
            firstPasswordFormInput.setProps({ error: 'Пароль невалиден' });
          }
          const isSecondPasswordValidate = validatePassword(secondpassword);
          if (!isSecondPasswordValidate) {
            secondPasswordFormInput.setProps({ error: 'Пароль невалиден' });
          }
          const isPasswordsEquel = firstpassword === secondpassword;
          if (!isPasswordsEquel) {
            firstPasswordFormInput.setProps({ error: 'Пароли не совпадают' });
            secondPasswordFormInput.setProps({ error: 'Пароли не совпадают' });
          }

          if (
            isEmailValidate &&
            isLoginValidate &&
            isFirstnameValidate &&
            isLastnameValidate &&
            isPhoneValidate &&
            isFirstPasswordValidate &&
            isSecondPasswordValidate &&
            isPasswordsEquel
          ) {
            try {
              const response = await new AuthApi().signup({
                email,
                login,
                first_name: firstname,
                second_name: lastname,
                phone,
                password: firstpassword,
              });
              if (response) {
                router.go('/messenger');
              }
              console.log({
                email,
                login,
                firstname,
                lastname,
                phone,
                password: firstpassword,
              });
            } catch (error: unknown) {
              console.error(error);
            }
          }
        },
      },
    });
    this.children = { form };
    return this.compile(signupTmpl, {});
  }
}
