export default `
{{#if isIncome}}
    <div class="message-income message">
        <div class="message-content message-content-income">{{message}}</div>
    </div>
{{else}}
    <div class="message">
        <div class="message-content">{{message}}</div>
    </div>
{{/if}}
`;
