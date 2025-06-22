// profile-service.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { userProfileMap } from './profile-store';
import { ProfileRequest, ProfileResponse } from 'shared/types/api';
import { createClient } from 'redis';

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

app.post('/profile', async (req, res) => {
  const { userId, token } = req.body as ProfileRequest;

  const storedUserId = await redis.get(token);
  if (!storedUserId || storedUserId !== userId) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  const userProfile = userProfileMap.get(userId);
  const response: ProfileResponse = {
    fullName: userProfile ? userProfile.fullName : 'Unknown User',
  };
  return res.json(response);
});

app.listen(4001, () => {
  console.log('Profile service running on http://localhost:4001');
});
