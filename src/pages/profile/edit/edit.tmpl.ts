export default `
<div>
    <div class="header">
        <a class="back" href="/pages/profile/">
            <i class="bi bi-arrow-left"></i>
        </a>
        <h2>Редактирование профиля</h2>
    </div>
    <div>
        <div class="column">
            <div class="avatar">
                <i class="bi bi-person-circle"></i>
            </div>
            {{{inputAvatar}}}
        </div>
        <hr>
        <form class="profile-info">
            <div class="row">
                <label for="email">Почта</label>
                {{{inputEmail}}}
            </div>
            <div class="row">
                <label for="login">Логин</label>
                {{{inputLogin}}}
            </div>
            <div class="row">
                <label for="first_name">Имя</label>
                {{{inputFirstname}}}
            </div>
            <div class="row">
                <label for="second_name">Фамилия</label>
                {{{inputLastname}}}
            </div>
            <div class="row">
                <label for="display_name">Имя в чате</label>
                {{{inputDisplayname}}}
            </div>
            <div class="row">
                <label for="phone">Номер телефона</label>
                {{{inputPhone}}}
            </div>
            <div class="button-save">
                {{{saveButton}}}
            </div>  
        </form>
    </div>
</div>
`;
