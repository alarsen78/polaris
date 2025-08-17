// auth-service.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getUserId } from './user-store';
import { AuthRequest, AuthResponse } from 'shared/types/api';
import { createClient } from 'redis';
import crypto from 'crypto';

const redisHost = process.env.REDIS_HOST || 'localhost';
const redis = createClient({
  url: `redis://${redisHost}:6379`,
});
redis
  .connect()
  .then(() => console.log('Connected to Redis'))
  .catch(console.error);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/auth', async (req, res) => {
  const { username, password } = req.body as AuthRequest;

  const userRecord = await getUserId(username, password);

  if (userRecord && userRecord.userId) {
    const token = crypto.randomBytes(32).toString('hex');

    await redis.set(token, userRecord.userId, { EX: 3600 });
    const response: AuthResponse = {
      userId: userRecord.userId,
      token: token,
    };

    return res.json(response);
  }

  return res.status(401).json({ error: 'Invalid credentials' });
});

app.listen(4000, () => {
  console.log('Auth service running on http://localhost:4000');
});
