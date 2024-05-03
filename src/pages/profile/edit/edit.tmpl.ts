export default `
<div>
    <div class="header">
        <a class="back" href="/pages/profile/">
            <i class="bi bi-arrow-left"></i>
        </a>
        <h2>Редактирование профиля</h2>
    </div>
    <div class="container">
        <div class="column">
            <div class="avatar">
                <i class="bi bi-person-circle"></i>
            </div>
            {{>input type="file" id="avatar" name="avatar"}}
        </div>
        <hr>
        <div class="profile-info">
            <div class="row">
                <label for="email">Почта</label>
                {{>input type="text" id="email" name="email"}}
            </div>
            <div class="row">
                <label for="login">Логин</label>
                {{>input type="text" id="login" name="login"}}
            </div>
            <div class="row">
                <label for="first_name">Имя</label>
                {{>input type="text" id="first_name" name="first_name"}}
            </div>
            <div class="row">
                <label for="last_name">Фамилия</label>
                {{>input type="text" id="last_name" name="last_name"}}
            </div>
            <div class="row">
                <label for="display_name">Имя в чате</label>
                {{>input type="text" id="display_name" name="display_name"}}
            </div>
            <div class="row">
                <label for="phone">Номер телефона</label>
                {{>input type="phone" id="phone" name="phone"}}
            </div>
        </div>
        <hr>
        <div class="button-save">
            {{>button-link label="Сохранить" href="/pages/profile/"}}
        </div>        
    </div>
</div>
`
