import React, { useState, useEffect } from 'react';
import { uploadFile, deleteFile } from '../api/files';

const initialState = {
  title: '',
  description: '',
  technologies: '',
  images: [], // { file, previewUrl, imageName, storagePath, publicUrl }
};

export default function AdminProjectForm({ projectId = null, onSave }) {
  const [form, setForm] = useState(initialState);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const errorRef = React.useRef();
  const successRef = React.useRef();

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);
  useEffect(() => {
    if (success && successRef.current) {
      successRef.current.focus();
    }
  }, [success]);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file input and upload to Supabase Storage
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    setError(null);
    setSuccess(null);
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/gif',
    ];
    const maxSize = 2 * 1024 * 1024; // 2MB
    const newImages = [];
    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        setError(`Invalid file type: ${file.name}`);
        setUploading(false);
        return;
      }
      if (file.size > maxSize) {
        setError(`File too large (max 2MB): ${file.name}`);
        setUploading(false);
        return;
      }
      try {
        // Upload to Supabase Storage
        const { url, path } = await uploadFile(file);
        newImages.push({ file, previewUrl: url, imageName: file.name, storagePath: path, publicUrl: url });
      } catch (err) {
        setError(`Failed to upload image: ${file.name}`);
        setUploading(false);
        return;
      }
    }
    setForm((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
    setSuccess('Image(s) uploaded successfully!');
    setTimeout(() => setSuccess(null), 2500);
    setUploading(false);
  };

  // Remove image from form and Supabase Storage
  const handleRemoveImage = async (imageName, storagePath) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter(img => img.imageName !== imageName) }));
    if (storagePath) {
      await deleteFile(storagePath);
    }
    setSuccess('Image removed.');
    setTimeout(() => setSuccess(null), 2000);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Collect public URLs for image_urls
    const image_urls = form.images.map(img => img.publicUrl || img.previewUrl);
    const projectData = {
      title: form.title,
      description: form.description,
      technologies: form.technologies,
      image_urls,
    };
    if (onSave) onSave(projectData);
  };

  return (
    <form className="admin-project-form" onSubmit={handleSubmit} aria-busy={uploading}>
      <div>
        <label htmlFor="title-input">Title</label>
        <input id="title-input" name="title" value={form.title} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="description-input">Description</label>
        <textarea id="description-input" name="description" value={form.description} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="technologies-input">Technologies (comma separated)</label>
        <input id="technologies-input" name="technologies" value={form.technologies} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="images-input">Images</label>
        <input id="images-input" type="file" accept="image/*" multiple onChange={handleImageChange} disabled={uploading} />
        <div style={{ fontSize: '0.9em', color: '#666', marginBottom: 4 }}>
          Uploading a file with the same name will replace the previous image.
        </div>
        {uploading && <div>Uploading...</div>}
        {error && (
          <div
            className="error"
            style={{ color: 'red', marginTop: 4 }}
            tabIndex={-1}
            ref={errorRef}
            aria-live="assertive"
            role="alert"
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="success"
            style={{ color: success.includes('removed') ? '#1976d2' : 'green', marginTop: 4 }}
            tabIndex={-1}
            ref={successRef}
            aria-live="polite"
            role="status"
          >
            {success}
          </div>
        )}
        <div className="image-previews" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
          {form.images.map((img) => (
            <div key={img.imageName} className="image-preview" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 8 }}>
              <img src={img.previewUrl} alt={img.imageName} style={{ maxWidth: 100, maxHeight: 100, borderRadius: 8, marginBottom: 4 }} />
              <button type="button" onClick={() => handleRemoveImage(img.imageName, img.storagePath)} style={{ cursor: 'pointer', padding: '2px 8px', borderRadius: 4, border: '1px solid #1976d2', background: '#fff', color: '#1976d2', fontSize: 14 }}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <button type="submit">Save Project</button>
    </form>
  );
} 