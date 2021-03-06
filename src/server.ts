import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import https from 'https';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { serverRenderMiddleware, themeCookieOptions } from './middlewares/serverRenderMiddleware';
import { authMiddleware } from './middlewares/authMiddleware';
import { logG } from './utils/log';
import { getTopics } from './utils/getTopics';
import { getMessages } from './utils/getMessages';
import { createMessage, createTopic, initDb } from './db/init';
import { serverRoutes } from './utils/constants/routes';
import { getCurrentUserTheme } from './utils/getCurrentUserTheme';
import { theme } from './utils/constants/cookieKeys';

const srcDirectives = ["'self'", 'https://ya-praktikum.tech'];

const app = express();

app
  .use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: srcDirectives,
        scriptSrc: [...srcDirectives, "'unsafe-inline'", "'unsafe-eval'"],
        imgSrc: srcDirectives
      }
    },
    crossOriginEmbedderPolicy: false
  }))
  .use(compression())
  .use(cookieParser())
  .use(express.json())
  .use(express.static(path.resolve(__dirname, '../dist')));

app.get(serverRoutes.TOPICS, authMiddleware, async (req, res) => {
  try {
    const topics = await getTopics(req.headers.cookie!);
    res.send(topics);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post(serverRoutes.MESSAGES, authMiddleware, async (req, res) => {
  try {
    const messages = await getMessages(req.body.topicId, req.headers.cookie!);
    res.send(messages);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post(serverRoutes.MESSAGE, authMiddleware, async (req, res) => {
  try {
    await createMessage(req.body.message);
    res.send('OK');
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post(serverRoutes.TOPIC, authMiddleware, async (req, res) => {
  try {
    await createTopic(req.body.topic);
    res.send('OK');
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post(serverRoutes.TOGGLE_THEME, async (req, res) => {
  try {
    const { userId } = req.body;
    const currentUserTheme = getCurrentUserTheme(req.cookies.theme, userId);
    const newTheme = currentUserTheme === 'light' ? 'dark' : 'light';
    res.cookie(theme, { ...req.cookies.theme, [userId]: newTheme }, themeCookieOptions);
    res.send(newTheme);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post(serverRoutes.THEME, async (req, res) => {
  const { userId } = req.body;
  const currentUserTheme = getCurrentUserTheme(req.cookies.theme, userId);
  res.send(currentUserTheme);
});

app.get('/*', authMiddleware, serverRenderMiddleware);

initDb();

const port = process.env.ENVIRONMENT === 'PROD' ? process.env.PORT : 8080;

if (process.env.ENVIRONMENT === 'PROD') {
  app.listen(port, () => {
    logG(`Application is started on http://localhost:${port}`);
  });
} else {
  const key = fs.readFileSync(path.resolve(__dirname, '../key.pem'));
  const cert = fs.readFileSync(path.resolve(__dirname, '../cert.pem'));
  const server = https.createServer({ key, cert }, app);

  server.listen(port, () => {
    logG(`Application is started on https://localhost:${port}`);
  });
}
