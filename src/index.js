const puppeteer = require('puppeteer');
const readline = require('readline');
const credentials = require('./credentials');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({
    width: 1280,
    height: 800,
  });

  await page.goto('https://www.twitch.tv/gaules', { waitUntil: 'networkidle2' });
  await page.click('div[data-a-target="tw-core-button-label-text"]');
  await page.waitForSelector('#login-username');
  await page.type('#login-username', credentials.username, { delay: 30 });
  await page.type('#password-input', credentials.password, { delay: 30 });
  await page.click('button[data-a-target="passport-login-button"]');
  rl.question('Input your SMS token: ', async (token) => {
    await page.type('input[autocomplete="one-time-code"]', token);
    await page.mouse.click(562.875, 514.5);
  });
})();

let farmedPoints = 0;

setInterval(() => {
  console.log(`Farmed points: ${farmedPoints += 4}`);
}, 600000);
