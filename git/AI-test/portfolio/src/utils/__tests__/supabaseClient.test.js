import { createClient } from '@supabase/supabase-js';
jest.mock('@supabase/supabase-js');

describe('supabase client', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    process.env.REACT_APP_SUPABASE_URL = 'https://test.supabase.co';
    process.env.REACT_APP_SUPABASE_ANON_KEY = 'test-key';
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('initializes supabase client with correct URL and key', () => {
    require('../supabase');
    expect(createClient).toHaveBeenCalledWith('https://test.supabase.co', 'test-key');
  });

  it('exports a supabase object', () => {
    const { supabase } = require('../supabase');
    expect(supabase).toBeDefined();
  });
}); 