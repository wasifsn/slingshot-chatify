class Messages {
  constructor() {}

  generateMessage(text) {
    return {
      text,
      createdAt: new Date().getTime()
    };
  }

  generateUrl(text) {
    return {
      text,
      createdAt: new Date().getTime()
    };
  }
}

module.exports = Messages;
