export default `
<div class="container">
    <div class="header">
        {{> profile}}
        <div class="contacts">
            {{#each contacts}}
                {{>contact name=this.username}}
            {{/each}}
        </div>
    </div>
    
    <div class="chat">
        <div class="messages">
            {{#each messages}}
                {{>message message=message isIncome=isIncome}}
            {{/each}}
        </div>
        <div class="message-input">
            {{> input type="text" placeholder="Введите сообщение"}}
            <button>
                <i class="bi bi-send-fill"></i>
            </button>
        </div>
    </div>
</div>
`
