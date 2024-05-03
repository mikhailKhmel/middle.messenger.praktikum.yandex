export default `
<div>
    <div class="header">
        <a class="back" href="/pages/profile/">
            <i class="bi bi-arrow-left"></i>
        </a>
        <h2>Редактирование пароля</h2>
    </div>
    <div class="container">
        <div class="profile-info">
            <div class="row">
                <label for="oldPassword">Старый пароль</label>
                {{>input type="password" id="oldPassword" name="oldPassword"}}
            </div>
            <div class="row">
                <label for="newPassword">Новый пароль</label>
                {{>input type="password" id="newPassword" name="newPassword"}}
            </div>
            <div class="row">
                <label for="newPassword">Повторите новый пароль</label>
                {{>input type="password" id="newPassword" name="newPassword"}}
            </div>
        </div>
        <hr>
        <div class="button-save">
            {{>button-link label="Сохранить" href="/pages/profile/"}}
        </div>        
    </div>
</div>
`
