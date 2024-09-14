import { ApiKey, ApiKeyModel } from '../apikey.js';

async function findByKey(key: string): Promise<ApiKey | null> {
  return ApiKeyModel.findOne({ key: key, status: true }).lean().exec();
}

export {
  findByKey,
};