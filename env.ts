import dotenv from 'dotenv';
import { string, object, parse } from 'valibot';

dotenv.config();

const envSchema = object({
  FILEBASE_API_KEY: string('FILEBASE_API_KEY is required'),
});

export const { FILEBASE_API_KEY } = parse(envSchema, process.env);
