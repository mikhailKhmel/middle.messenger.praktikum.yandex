export default `
<button class="contact">
    <div class="contact-avatar">
      {{#if avatar}}
        <img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="avatar">
      {{else}}
        <i class="bi bi-person-circle"></i>
      {{/if}}
    </div>
    <div class="contact-name">{{name}}</div>
</button>
`;
