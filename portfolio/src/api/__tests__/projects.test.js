import * as projectsApi from '../projects';
import { supabase } from '../../utils/supabase';

jest.mock('../../utils/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(),
      eq: jest.fn(),
      single: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    })),
  },
}));

describe('projects API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches all projects', async () => {
    supabase.from.mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: [{ id: '1', title: 'Test' }], error: null }),
    });
    const data = await projectsApi.getProjects();
    expect(data).toEqual([{ id: '1', title: 'Test' }]);
  });

  it('fetches a project by id', async () => {
    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { id: '1', title: 'Test' }, error: null }),
    });
    const data = await projectsApi.getProjectById('1');
    expect(data).toEqual({ id: '1', title: 'Test' });
  });

  it('creates a new project', async () => {
    supabase.from.mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { id: '2', title: 'New' }, error: null }),
    });
    const data = await projectsApi.createProject({ title: 'New' });
    expect(data).toEqual({ id: '2', title: 'New' });
  });

  it('updates a project', async () => {
    supabase.from.mockReturnValue({
      update: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { id: '1', title: 'Updated' }, error: null }),
    });
    const data = await projectsApi.updateProject('1', { title: 'Updated' });
    expect(data).toEqual({ id: '1', title: 'Updated' });
  });

  it('deletes a project', async () => {
    supabase.from.mockReturnValue({
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ error: null }),
    });
    const result = await projectsApi.deleteProject('1');
    expect(result).toBe(true);
  });

  it('throws on error', async () => {
    supabase.from.mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: null, error: new Error('fail') }),
    });
    await expect(projectsApi.getProjects()).rejects.toThrow('fail');
  });
}); 