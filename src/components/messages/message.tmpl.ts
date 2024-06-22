export default `
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
`;
