export default `
<main>
    <div class="header">
        <a class="back" href="/messenger">
            <i class="bi bi-arrow-left"></i>
        </a>
        <h2>Мой профиль</h2>
    </div>
    <div class="profile-container">
        <div class="column">
            <div class="avatar">
                {{#if avatar}}
                  <img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="avatar">
                {{else}}
                  <i class="bi bi-person-circle"></i>
                {{/if}}
            </div>
            <div>{{displayname}}</div>
        </div>
        <hr>
        <div class="profile-info">
            <div class="row">
                <div>Почта</div>
                <div>{{email}}</div>
            </div>
            <div class="row">
                <div>Логин</div>
                <div>{{login}}</div>
            </div>
            <div class="row">
                <div>Имя</div>
                <div>{{firstname}}</div>
            </div>
            <div class="row">
                <div>Фамилия</div>
                <div>{{lastname}}</div>
            </div>
            <div class="row">
                <div>Имя в чате</div>
                <div>{{displayname}}</div>
            </div>
            <div class="row">
                <div>Номер телефона</div>
                <div>{{phone}}</div>
            </div>
        </div>
        <hr>
        <a href="/settings">Изменить данные</a><br>
        <a href="/settings/password">Изменить пароль</a><br>
        {{{logoutButton}}}
    </div>
</main>
`;
