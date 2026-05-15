import fs from 'fs';

const getTimestampedMessage = (msg) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] ${msg}`;
}

const ensureDir = (dir) => {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (err) {
    console.error(err);
  }
};

const logger = {
  log: (msg) => {
    ensureDir('./logs');
    fs.appendFileSync('./logs/stdout.log', getTimestampedMessage(msg) + '\n');
  },
  error: (msg) => {
    ensureDir('./logs');
    fs.appendFileSync('./logs/stderr.log', getTimestampedMessage(msg) + '\n');
  }
};

export default logger;