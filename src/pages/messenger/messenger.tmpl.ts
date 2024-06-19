export default `
<main class="container">
    <div class="header">
        {{{profile}}}
        {{{addChatButton}}}
        <div class="chats">
            {{#each chats}}
                {{{.}}}
            {{/each}}
        </div>

    </div>
    <div class="chat">
        <div class="messages">
            {{#each messages}}
                {{{.}}}
            {{/each}}
        </div>
        <div class="message-input">
            {{{messageInput}}}
            {{{sendButton}}}
        </div>
    </div>
</main>`;
