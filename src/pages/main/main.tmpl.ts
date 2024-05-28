export default `
<div class="container">
    <div class="header">
        {{{profile}}}
        <div class="contacts">
            {{#each contacts}}
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
            <button>
                <i class="bi bi-send-fill"></i>
            </button>
        </div>
    </div>
</div>`
