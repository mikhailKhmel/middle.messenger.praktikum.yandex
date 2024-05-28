export default function getContacts() {
  const contacts: { username: string }[] = []
  for (let i = 0; i < 20; i++) {
    contacts.push({ username: `Пользователь ${i}` })
  }
  return contacts
}
