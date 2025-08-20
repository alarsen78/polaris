// profile-service.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createClient } from 'redis';
import { JournalResponse } from 'shared/types/api';
import { addEntry, getEntriesByUser } from './journal-store';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const redisHost = process.env.REDIS_HOST || 'localhost';
const redis = createClient({
  url: `redis://${redisHost}:6379`,
});

redis
  .connect()
  .then(() => console.log('Connected to Redis'))
  .catch(console.error);

app.get('/journal', async (req, res) => {
  const userId = req.query.userId as string;
  const token = req.query.token as string;

  const storedUserId = await redis.get(token);
  if (!storedUserId || storedUserId !== userId) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  const response: JournalResponse = {
    journals: (await getEntriesByUser(userId)) || [],
  };
  return res.json(response);
});

app.post('/journal', async (req, res) => {
  const { request, entry } = req.body;
  const { userId, token } = request;

  const storedUserId = await redis.get(token);
  if (!storedUserId || storedUserId !== userId) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  addEntry(userId, entry).catch((error) => {
    console.error('Error adding entry:', error);
    return res.status(500).json({ error: 'Failed to add journal entry' });
  });

  return res.status(201).json({ message: 'Journal entry added successfully' });
});

app.listen(4002, () => {
  console.log('Profile service running on http://localhost:4002');
});
