// profile-service.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createClient } from 'redis';
import { JournalResponse } from 'shared/types/api';

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
    journals: [
      {
        id: '1',
        date: new Date().toISOString(),
        content: 'Sample journal entry',
      },
      { id: '2', date: new Date().toISOString(), content: 'Another entry' },
    ],
  };
  return res.json(response);
});

app.listen(4002, () => {
  console.log('Profile service running on http://localhost:4002');
});
