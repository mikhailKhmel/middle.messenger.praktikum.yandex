import { Router } from './types/Router.ts';
import { SignIn } from './pages/signin/signin.ts';
import { SignUp } from './pages/signup/signup.ts';
import { Messenger } from './pages/messenger/messenger.ts';
import { Profile } from './pages/profile/profile.ts';
import { Settings } from './pages/settings/settings.ts';
import { Password } from './pages/settings/password/password.ts';

export const router = new Router('#root')
  .use('/', SignIn)
  .use('/sign-up', SignUp)
  .use('/messenger', Messenger)
  .use('/profile', Profile)
  .use('/settings', Settings)
  .use('/settings/password', Password);

document.addEventListener('DOMContentLoaded', () => {
  router.start();
});
