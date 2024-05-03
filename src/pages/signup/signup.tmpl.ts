export default `
<div class="center">
    <div class="card">
        <h1 class="card-title">
            Регистрация
        </h1>
        <form class="card-form">
            <div class="card-form-row">
                <label for="email">Почта</label>
                {{> input id="email" type="email" name="email" required="required"}}
            </div>
            <div class="card-form-row">
                <label for="login">Имя пользователя</label>
                {{> input id="login" type="text" name="login" required="required"}}
            </div>
            <div class="card-form-row">
                <label for="first_name">Имя</label>
                {{> input id="first_name" type="text" name="first_name" required="required"}}
            </div>
            <div class="card-form-row">
                <label for="last_name">Фамилия</label>
                {{> input id="last_name" type="text" name="last_name" required="required"}}
            </div>
            <div class="card-form-row">
                <label for="phone">Телефон</label>
                {{> input id="phone" type="tel" name="phone" required="required"}}
            </div>
            <div class="card-form-row">
                <label for="password">Пароль</label>
                {{> input id="password" type="password" name="password" required="required"}}
            </div>
            <div class="card-form-row">
                <label for="password">Повторите пароль</label>
                {{> input id="password" type="password" name="password" required="required"}}
            </div>
            <!-- {{> button label="Зарегистрироваться"}} -->
            {{> button-link href="/pages/main/" label="Зарегистрироваться"}}
            <a href="/pages/signin/">Войти</a>
        </form>
    </div>
</div>
`
