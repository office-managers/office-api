import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
});
