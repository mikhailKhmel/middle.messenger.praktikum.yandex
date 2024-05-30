export default `
<main>
    <div class="header">
        <a class="back" href="/pages/profile/">
            <i class="bi bi-arrow-left"></i>
        </a>
        <h2>Редактирование пароля</h2>
    </div>
    <div>
        <div class="profile-info">
            <div class="row">
                <label for="oldPassword">Старый пароль</label>
                {{{oldPassword}}}
            </div>
            <div class="row">
                <label for="newPassword">Новый пароль</label>
                {{{newPassword1}}}
            </div>
            <div class="row">
                <label for="newPassword">Повторите новый пароль</label>
                {{{newPassword2}}}
            </div>
        </div>
        <hr>
        <div class="button-save">
            {{{saveButton}}}
        </div>        
    </div>
</main>
`;
