export default `
<div class="chat">
  <div class="users">
  <h5>Изменить аватарку чата:</h5>
 {{{avatarForm}}}
    <h5>Участники чата:</h5>
    {{#each users}}
                {{{.}}}
            {{/each}}
    <button class="btn" onclick="window.userSearchDialog.show()">
    Добавить участника
    </button>
  </div>
  <div class="messages">
    {{{form}}}
    {{#each messages}}
    <div>
    <div>{{{this.time}}} > userId: {{{this.user_id}}}</div>
    <div>{{{this.content}}}</div>
    <hr>
</div>


    {{/each}}
  </div>
</div>
{{{addUser}}}
`;
