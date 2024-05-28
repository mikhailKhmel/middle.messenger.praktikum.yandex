export default `
    <div class="card">
        <h1 class="card-title">
            Авторизация
        </h1>
        <form class="card-form">
            <div class="card-form-row">
                <label for="login">Имя пользователя</label>
                {{{loginInput}}}
            </div>
            <div class="card-form-row">
                <label for="password">Пароль</label>
                {{{passwordInput}}}
            </div>
            {{{button}}}
            <a href="/pages/signup/">Создать аккаунт</a>
        </form>
    </div>
`
