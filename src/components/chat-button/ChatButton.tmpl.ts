import { RESOURCE_URL } from '../../types/Consts.ts';

export default `
<button class="contact">
      {{#if avatar}}
        <img class="contact-avatar" src="${RESOURCE_URL}{{avatar}}" alt="avatar">
      {{else}}
      <div class="contact-icon">
              <i  class="bi bi-person-circle"></i>

</div>
      {{/if}}
    <div class="contact-name">{{name}}</div>
</button>
`;
