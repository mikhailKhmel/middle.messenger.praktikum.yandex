import Button from '../../components/button';
import FormInput from '../../components/forminput';
import Input from '../../components/input';
import Block from '../../types/block.ts';
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePhone,
} from '../../utils/validation.ts';
import './settings.less';
import editTmpl from './settings.tmpl.ts';

interface IProps {
  inputAvatar: Block;
  inputEmail: Block;
  inputLogin: Block;
  inputFirstname: Block;
  inputLastname: Block;
  inputDisplayname: Block;
  inputPhone: Block;
  saveButton: Block;
}

export class Settings extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    let email: string;
    let login: string;
    let firstname: string;
    let lastname: string;
    let displayname: string;
    let phone: string;

    const inputAvatar = new Input({
      id: 'avatar',
      name: 'avatar',
      type: 'file',
    });
    const inputEmail = new Input({
      id: 'email',
      name: 'email',
      type: 'email',
      events: {
        blur: (event: any) => {
          const { value } = event.target;
          const isValidate = validateEmail(value);
          inputEmailForm.setProps({ error: isValidate ? '' : 'Email невалиден' });
          if (isValidate) {
            email = value;
          }
        },
      },
    });
    const inputLogin = new Input({
      id: 'login',
      name: 'login',
      type: 'text',
      events: {
        blur: (event: any) => {
          const { value } = event.target;
          const isValidate = validateLogin(value);
          inputLoginForm.setProps({ error: isValidate ? '' : 'Логин невалиден' });
          if (isValidate) {
            login = value;
          }
        },
      },
    });
    const inputFirstname = new Input({
      id: 'first_name',
      name: 'first_name',
      type: 'text',
      events: {
        blur: (event: any) => {
          const { value } = event.target;
          const isValidate = validateName(value);
          inputFirstnameForm.setProps({ error: isValidate ? '' : 'Имя невалидно' });
          if (isValidate) {
            firstname = value;
          }
        },
      },
    });
    const inputSecondname = new Input({
      id: 'second_name',
      name: 'second_name',
      type: 'text',
      events: {
        blur: (event: any) => {
          const { value } = event.target;
          const isValidate = validateName(value);
          inputSecondnameForm.setProps({ error: isValidate ? '' : 'Имя невалидно' });
          if (isValidate) {
            lastname = value;
          }
        },
      },
    });
    const inputDisplayname = new Input({
      id: 'display_name',
      name: 'display_name',
      type: 'text',
      events: {
        blur: (event: any) => {
          const { value } = event.target;
          displayname = value;
        },
      },
    });
    const inputPhone = new Input({
      id: 'phone',
      name: 'phone',
      type: 'phone',
      events: {
        blur: (event: any) => {
          const { value } = event.target;
          const isValidate = validatePhone(value);
          inputPhoneForm.setProps({ error: isValidate ? '' : 'Номер телефона невалиден' });
          if (isValidate) {
            phone = value;
          }
        },
      },
    });

    const inputEmailForm = new FormInput({ input: inputEmail });
    const inputLoginForm = new FormInput({ input: inputLogin });
    const inputFirstnameForm = new FormInput({ input: inputFirstname });
    const inputSecondnameForm = new FormInput({ input: inputSecondname });
    const inputDisplaynameForm = new FormInput({ input: inputDisplayname });
    const inputPhoneForm = new FormInput({ input: inputPhone });
    const saveButton = new Button({
      label: 'Сохранить',
      events: {
        click: (event: any) => {
          event?.preventDefault();
          const emailValidate = validateEmail(email);
          const loginValidate = validateLogin(login);
          const firstnameValidate = validateName(firstname);
          const lastnameValidate = validateLogin(lastname);
          const phoneValidate = validateLogin(phone);
          if (
            emailValidate
            && loginValidate
            && firstnameValidate
            && lastnameValidate
            && phoneValidate
          ) {
            console.log({
              email,
              login,
              firstname,
              lastname,
              displayname,
              phone,
            });
          }
        },
      },
    });
    this.props = {
      inputAvatar: inputAvatar.getContent()?.innerHTML,
      inputEmail: inputEmailForm.getContent()?.innerHTML,
      inputLogin: inputLoginForm.getContent()?.innerHTML,
      inputFirstname: inputFirstnameForm.getContent()?.innerHTML,
      inputLastname: inputSecondnameForm.getContent()?.innerHTML,
      inputDisplayname: inputDisplaynameForm.getContent()?.innerHTML,
      inputPhone: inputPhoneForm.getContent()?.innerHTML,
      saveButton: saveButton.getContent()?.innerHTML,
    };
    return this.compile(editTmpl, this.props);
  }
}
