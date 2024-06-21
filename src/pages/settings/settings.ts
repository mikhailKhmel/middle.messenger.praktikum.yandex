import Button from '../../components/button';
import FormInput from '../../components/forminput';
import Input from '../../components/input';
import Block, { Props } from '../../types/Block.ts';
import { validateEmail, validateLogin, validateName, validatePhone } from '../../utils/validation.ts';
import './settings.less';
import editTmpl from './settings.tmpl.ts';
import Settingsform from '../../components/settingsform';
import Form from '../../components/form';
import { UserApi } from '../../api/UserApi.ts';
import { router } from '../../index.ts';
import Avatarform from '../../components/avatarform';

export class Settings extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment {
    const inputEmail = new Input({
      id: 'email',
      name: 'email',
      type: 'email',
      events: {
        blur: (event: any) => {
          const { value } = event.target;
          const isValidate = validateEmail(value);
          inputEmailForm.setProps({ error: isValidate ? '' : 'Email невалиден' });
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
        },
      },
    });
    const inputDisplayname = new Input({
      id: 'display_name',
      name: 'display_name',
      type: 'text',
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
    });
    const settingsForm = new Settingsform({
      inputEmail: inputEmailForm,
      inputLogin: inputLoginForm,
      inputFirstname: inputFirstnameForm,
      inputLastname: inputSecondnameForm,
      inputDisplayname: inputDisplaynameForm,
      inputPhone: inputPhoneForm,
      saveButton,
    });
    const form = new Form({
      children: settingsForm,
      events: {
        submit: async (event: Event) => {
          event.preventDefault();
          if (!(event.target instanceof HTMLFormElement)) return;
          const formData = new FormData(event.target);
          const email = formData.get('email')
            ?.toString() ?? '';
          const login = formData.get('login')
            ?.toString() ?? '';
          const firstname = formData.get('first_name')
            ?.toString() ?? '';
          const lastname = formData.get('last_name')
            ?.toString() ?? '';
          const displayname = formData.get('display_name')
            ?.toString() ?? '';
          const phone = formData.get('phone')
            ?.toString() ?? '';

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
            try {
              const res = await (new UserApi().update({
                first_name: firstname,
                last_name: lastname,
                login,
                email,
                phone,
                display_name: displayname,
              }));
              if (res) {
                router.back();
              }
              console.log({
                email,
                login,
                firstname,
                lastname,
                displayname,
                phone,
              });
            } catch (error: unknown) {
              console.error(error);
            }
          }
        },
      },
    });
    const avatarForm = new Form({
      children: new Avatarform(),
      events: {
        submit: async (event: Event) => {
          event.preventDefault();
          if (!(event.target instanceof HTMLFormElement)) return;
          const formData = new FormData(event.target);
          try {
            await (new UserApi().updateAvatar(formData));
            router.back();
          } catch (error: unknown) {
            console.error(error);
          }
        },
      },
    });
    this.children = {
      form,
      avatarForm,
    };
    return this.compile(editTmpl, {});
  }
}
