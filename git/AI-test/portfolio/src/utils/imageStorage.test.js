jest.mock('localforage');

import localforage from 'localforage';
import {
  saveImage,
  getImage,
  deleteImage,
  listImages
} from './imageStorage';

const mockSetItem = jest.fn();
const mockGetItem = jest.fn();
const mockRemoveItem = jest.fn();
const mockIterate = jest.fn();

localforage.createInstance.mockReturnValue({
  setItem: mockSetItem,
  getItem: mockGetItem,
  removeItem: mockRemoveItem,
  iterate: mockIterate,
});

describe('imageStorage utility', () => {
  const projectId = 'proj1';
  const imageName = 'img1.png';
  const fileOrDataUrl = 'data:image/png;base64,abc123';
  const metadata = { name: imageName, type: 'image/png', size: 1234 };
  const value = { data: fileOrDataUrl, metadata };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('saves an image with metadata', async () => {
    mockSetItem.mockResolvedValueOnce(undefined);
    await expect(saveImage(projectId, imageName, fileOrDataUrl, metadata)).resolves.toBe(true);
    expect(mockSetItem).toHaveBeenCalledWith(`${projectId}/${imageName}`, value);
  });

  it('retrieves an image', async () => {
    mockGetItem.mockResolvedValueOnce(value);
    await expect(getImage(projectId, imageName)).resolves.toEqual(value);
    expect(mockGetItem).toHaveBeenCalledWith(`${projectId}/${imageName}`);
  });

  it('returns null if getImage throws', async () => {
    mockGetItem.mockRejectedValueOnce(new Error('fail'));
    await expect(getImage(projectId, imageName)).resolves.toBeNull();
  });

  it('deletes an image', async () => {
    mockRemoveItem.mockResolvedValueOnce(undefined);
    await expect(deleteImage(projectId, imageName)).resolves.toBe(true);
    expect(mockRemoveItem).toHaveBeenCalledWith(`${projectId}/${imageName}`);
  });

  it('throws if saveImage fails', async () => {
    mockSetItem.mockRejectedValueOnce(new Error('fail'));
    await expect(saveImage(projectId, imageName, fileOrDataUrl, metadata)).rejects.toThrow('fail');
  });

  it('throws if deleteImage fails', async () => {
    mockRemoveItem.mockRejectedValueOnce(new Error('fail'));
    await expect(deleteImage(projectId, imageName)).rejects.toThrow('fail');
  });

  it('lists all images for a project', async () => {
    const images = [];
    mockIterate.mockImplementation(async (cb) => {
      await cb(value, `${projectId}/${imageName}`);
      await cb({ data: 'other', metadata: { name: 'img2.jpg', type: 'image/jpeg', size: 5678 } }, `${projectId}/img2.jpg`);
      await cb({ data: 'not-this', metadata: { name: 'img3.jpg', type: 'image/jpeg', size: 100 } }, `otherproj/img3.jpg`);
    });
    const result = await listImages(projectId);
    expect(result).toEqual([
      { imageName: 'img1.png', metadata },
      { imageName: 'img2.jpg', metadata: { name: 'img2.jpg', type: 'image/jpeg', size: 5678 } },
    ]);
  });

  it('returns empty array if listImages throws', async () => {
    mockIterate.mockRejectedValueOnce(new Error('fail'));
    await expect(listImages(projectId)).resolves.toEqual([]);
  });
}); 