import Button from '../../../components/button';
import FormInput from '../../../components/forminput';
import Input from '../../../components/input';
import Block, { Props } from '../../../types/Block.ts';
import { validatePassword } from '../../../utils/validation.ts';
import './password.less';
import passwordTmpl from './password.tmpl.ts';
import Passwordform from '../../../components/passwordform';
import Form from '../../../components/form';
import { UserApi } from '../../../api/UserApi.ts';
import { router } from '../../../index.ts';

export class Password extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment {
    const oldPassword = new Input({
      id: 'oldPassword',
      name: 'oldPassword',
      type: 'password',
    });
    const newPassword1 = new Input({
      id: 'newPassword1',
      name: 'newPassword1',
      type: 'password',
      events: {
        blur: (event: Event) => {
          if (!(event.target instanceof HTMLInputElement)) return;

          const { value } = event.target;
          const isValidate = validatePassword(value);
          password1Form.setProps({ error: isValidate ? '' : 'Пароль невалиден' });
        },
      },
    });
    const newPassword2 = new Input({
      id: 'newPassword2',
      name: 'newPassword2',
      type: 'password',
      events: {
        blur: (event: Event) => {
          if (!(event.target instanceof HTMLInputElement)) return;

          const { value } = event.target;
          const isValidate = validatePassword(value);
          password2Form.setProps({ error: isValidate ? '' : 'Пароль невалиден' });
        },
      },
    });

    const password1Form = new FormInput({ input: newPassword1 });
    const password2Form = new FormInput({ input: newPassword2 });
    const saveButton = new Button({
      label: 'Сохранить',
    });
    const passwordForm = new Passwordform({
      oldPassword,
      newPassword1: password1Form,
      newPassword2: password2Form,
      saveButton,
    });
    const form = new Form({
      children: passwordForm,
      events: {
        submit: async (event: Event) => {
          event.preventDefault();
          if (!(event.target instanceof HTMLFormElement)) return;
          const formData = new FormData(event.target);
          const password1 = formData.get('newPassword1')?.toString() ?? '';
          const password2 = formData.get('newPassword2')?.toString() ?? '';
          const validate1 = validatePassword(password1);
          const validate2 = validatePassword(password2);
          const validate3 = password1 === password2;
          if (validate1 && validate2 && validate3) {
            try {
              const res = await new UserApi().updatePassword({
                oldPassword: password1,
                newPassword: password2,
              });
              if (res) {
                router.back();
              }
              console.log({ password: password1 });
            } catch (error: unknown) {
              console.error(error);
            }
          }
        },
      },
    });
    this.children = { form };
    return this.compile(passwordTmpl, {});
  }
}
