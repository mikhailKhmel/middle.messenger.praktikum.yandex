export default `
<div class="center">
    <div class="card">
        <h1 class="card-title">
            Авторизация
        </h1>
        <form class="card-form">
            <div class="card-form-row">
                <label for="login">Имя пользователя</label>
                {{> input id="login" type="text" name="login"}}
            </div>
            <div class="card-form-row">
                <label for="password">Пароль</label>
                {{> input id="password" type="password" name="password"}}
            </div>
            <!-- {{> button label="Войти"}} -->
            {{> button-link href="/pages/main/" label="Войти"}}
            <a href="/pages/signup/">Создать аккаунт</a>
        </form>
    </div>
</div>
`
