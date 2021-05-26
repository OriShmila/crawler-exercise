class Logger {
  getDateNow = () => new Date().toLocaleString();

  info = (message) => console.log(`${message} at: ${this.getDateNow()}`);

  error = (message, error) =>
    console.error(`${message} Exception: ${error} at: ${this.getDateNow()}`);
}

export const logger = new Logger();
