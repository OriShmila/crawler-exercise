class Logger {
  getDateNow = () => new Date().toLocaleString();

  info = (message) => console.log(`${message} at: ${this.getDateNow()}`);

  error = (message, error) =>
    console.log(`${message} Exception: ${error} at: ${this.getDateNow()}`);
}

export const logger = new Logger();
