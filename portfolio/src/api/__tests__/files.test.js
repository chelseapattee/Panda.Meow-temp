import { uploadFile, deleteFile } from '../files';
import { supabase } from '../../utils/supabase';

jest.mock('../../utils/supabase', () => ({
  supabase: {
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn(),
        getPublicUrl: jest.fn(),
        remove: jest.fn(),
      })),
    },
  },
}));

describe('files API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('uploads a file and returns public URL', async () => {
    const mockUpload = jest.fn().mockResolvedValue({ data: {}, error: null });
    const mockGetPublicUrl = jest.fn().mockReturnValue({ data: { publicUrl: 'https://example.com/file.jpg' } });
    supabase.storage.from.mockReturnValue({
      upload: mockUpload,
      getPublicUrl: mockGetPublicUrl,
    });
    const file = { name: 'file.jpg' };
    const result = await uploadFile(file);
    expect(mockUpload).toHaveBeenCalled();
    expect(mockGetPublicUrl).toHaveBeenCalled();
    expect(result.url).toBe('https://example.com/file.jpg');
  });

  it('throws if upload fails', async () => {
    const mockUpload = jest.fn().mockResolvedValue({ data: null, error: new Error('fail') });
    supabase.storage.from.mockReturnValue({
      upload: mockUpload,
      getPublicUrl: jest.fn(),
    });
    const file = { name: 'file.jpg' };
    await expect(uploadFile(file)).rejects.toThrow('fail');
  });

  it('deletes a file successfully', async () => {
    const mockRemove = jest.fn().mockResolvedValue({ error: null });
    supabase.storage.from.mockReturnValue({
      remove: mockRemove,
    });
    const result = await deleteFile('file.jpg');
    expect(mockRemove).toHaveBeenCalledWith(['file.jpg']);
    expect(result).toBe(true);
  });

  it('throws if delete fails', async () => {
    const mockRemove = jest.fn().mockResolvedValue({ error: new Error('fail') });
    supabase.storage.from.mockReturnValue({
      remove: mockRemove,
    });
    await expect(deleteFile('file.jpg')).rejects.toThrow('fail');
  });
}); 