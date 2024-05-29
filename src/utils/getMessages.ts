export default function getMessages() {
  const messages: { message: string; isIncome: boolean }[] = []
  for (let i = 0; i < 10; i++) {
    messages.push({
      message: `текст ${i}`,
      isIncome: Math.round(Math.random()) === 0,
    })
  }
  return messages
}
