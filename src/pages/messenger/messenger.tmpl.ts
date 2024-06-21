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
    {{{chat}}}
</main>`;
