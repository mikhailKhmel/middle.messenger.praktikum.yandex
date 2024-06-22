import { RESOURCE_URL } from '../../types/Consts.ts';

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
                {{#if avatar}}
                  <img class="avatar" src="${RESOURCE_URL}{{avatar}}" alt="avatar">
                {{else}}
                  <div class="icon">
                    <i class="bi bi-person-circle"></i>
                  </div>

                {{/if}}
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
                <div>{{first_name}}</div>
            </div>
            <div class="row">
                <div>Фамилия</div>
                <div>{{second_name}}</div>
            </div>
            <div class="row">
                <div>Имя в чате</div>
                <div>{{display_name}}</div>
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
