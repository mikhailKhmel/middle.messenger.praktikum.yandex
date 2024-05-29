export default `
<div class="center">
    <div class="card">
        <h1 class="card-title">
            Регистрация
        </h1>
        <form class="card-form">
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
                <label for="last_name">Фамилия</label>
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
            <a href="/pages/main/">Дальше</a>
            <a href="/pages/signin/">Войти</a>
        </form>
    </div>
</div>
`;
