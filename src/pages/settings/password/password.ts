import Button from '../../../components/button';
import FormInput from '../../../components/forminput';
import Input from '../../../components/input';
import Block from '../../../types/block.ts';
import { validatePassword } from '../../../utils/validation.ts';
import './password.less';
import passwordTmpl from './password.tmpl.ts';

interface IProps {
  oldPassword: Block;
  newPassword1: Block;
  newPassword2: Block;
  saveButton: Block;
}

export class Password extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    let password1: string;
    let password2: string;
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
        blur: (event: any) => {
          const { value } = event.target;
          const isValidate = validatePassword(value);
          password1Form.setProps({ error: isValidate ? '' : 'Пароль невалиден' });
          if (!isValidate) {
            password1 = value;
          }
        },
      },
    });
    const newPassword2 = new Input({
      id: 'newPassword2',
      name: 'newPassword2',
      type: 'password',
      events: {
        blur: (event: any) => {
          const { value } = event.target;
          const isValidate = validatePassword(value);
          password2Form.setProps({ error: isValidate ? '' : 'Пароль невалиден' });
          if (!isValidate) {
            password2 = value;
          }
        },
      },
    });

    const password1Form = new FormInput({ input: newPassword1 });
    const password2Form = new FormInput({ input: newPassword2 });
    const saveButton = new Button({
      label: 'Сохранить',
      events: {
        click: (event: any) => {
          event.preventDefault();
          const validate1 = validatePassword(password1);
          const validate2 = validatePassword(password2);
          const validate3 = password1 === password2;
          if (validate1 && validate2 && validate3) {
            console.log({ password: password1 });
          }
        },
      },
    });
    this.props = {
      oldPassword: oldPassword.getContent()?.innerHTML,
      newPassword1: password1Form.getContent()?.innerHTML,
      newPassword2: password2Form.getContent()?.innerHTML,
      saveButton: saveButton.getContent()?.innerHTML,
    };
    return this.compile(passwordTmpl, this.props);
  }
}
