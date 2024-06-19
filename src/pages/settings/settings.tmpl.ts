export default `
<main>
    <div class="header">
        <a class="back" href="/profile">
            <i class="bi bi-arrow-left"></i>
        </a>
        <h2>Редактирование профиля</h2>
    </div>
    <div class="container">
        <div class="column">
            <div class="avatar">
                <i class="bi bi-person-circle"></i>
            </div>
            {{{avatarForm}}}
        </div>
        <hr>
        {{{form}}}
    </div>
</main>
`;
