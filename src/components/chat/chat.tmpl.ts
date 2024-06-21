export default `
<div class="chat">
  <div class="users">
    <h5>Участники чата:</h5>
    {{#each users}}
                {{{.}}}
            {{/each}}
    <button class="btn" onclick="window.userSearchDialog.show()">
    Добавить участника
    </button>
  </div>
  <div class="messages">
    <div class="message-input">
              {{{messageInput}}}
              {{{sendButton}}}
    </div>
  </div>
</div>
{{{addUser}}}
`;
