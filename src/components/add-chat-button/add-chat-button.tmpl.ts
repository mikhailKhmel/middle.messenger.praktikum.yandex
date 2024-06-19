export default `
<button class="contact" onclick="window.chatTitleDialog.showModal()">
    <div class="contact-avatar">
        <i class="bi bi-plus"></i>
    </div>
    <div class="contact-name">Создать чат</div>
</button>
<dialog id="chatTitleDialog">
<h2>Введите название чата</h2>
{{{form}}}
</dialog>
`;
