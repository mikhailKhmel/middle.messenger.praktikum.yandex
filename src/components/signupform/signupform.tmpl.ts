export default `
<div class="card-form-row">
                <label for="email">Почта</label>
                {{{inputEmail}}}
            </div>
            <div class="card-form-row">
                <label for="login">Имя пользователя</label>
                {{{inputLogin}}}
            </div>
            <div class="card-form-row">
                <label for="first_name">Имя</label>
                {{{inputFirstname}}}
            </div>
            <div class="card-form-row">
                <label for="second_name">Фамилия</label>
                {{{inputLastname}}}
            </div>
            <div class="card-form-row">
                <label for="phone">Телефон</label>
                {{{inputPhone}}}
            </div>
            <div class="card-form-row">
                <label for="password">Пароль</label>
                {{{inputFirstPassword}}}
            </div>
            <div class="card-form-row">
                <label for="password">Повторите пароль</label>
                {{{inputSecondPassword}}}
            </div>
            {{{button}}}
            <a href="/messenger">Дальше</a>
            <a href="/">Войти</a>
`;
