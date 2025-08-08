import localforage from 'localforage';

// Configure localForage instance for image storage
const imageStore = localforage.createInstance({
  name: 'portfolio',
  storeName: 'images',
});

// Helper to build a unique key for each image
function imageKey(projectId, imageName) {
  return `${projectId}/${imageName}`;
}

// Save an image (data: Blob or Data URL, metadata: {name, type, size, ...})
export async function saveImage(projectId, imageName, fileOrDataUrl, metadata) {
  try {
    const key = imageKey(projectId, imageName);
    const value = { data: fileOrDataUrl, metadata };
    await imageStore.setItem(key, value);
    return true;
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
}

// Get an image (returns { data, metadata } or null)
export async function getImage(projectId, imageName) {
  try {
    const key = imageKey(projectId, imageName);
    return await imageStore.getItem(key);
  } catch (error) {
    console.error('Error retrieving image:', error);
    return null;
  }
}

// Delete an image
export async function deleteImage(projectId, imageName) {
  try {
    const key = imageKey(projectId, imageName);
    await imageStore.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

// List all images for a project (returns array of { imageName, metadata })
export async function listImages(projectId) {
  const images = [];
  try {
    await imageStore.iterate((value, key) => {
      if (key.startsWith(`${projectId}/`)) {
        images.push({
          imageName: key.substring(projectId.length + 1),
          metadata: value.metadata,
        });
      }
    });
    return images;
  } catch (error) {
    console.error('Error listing images:', error);
    return images;
  }
} 