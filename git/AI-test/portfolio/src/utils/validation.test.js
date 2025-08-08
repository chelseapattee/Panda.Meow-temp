import { validateProjectForm } from './validation';

describe('validateProjectForm', () => {
  const validFile = (name = 'img.jpg', type = 'image/jpeg', size = 1000) => ({ name, type, size });

  it('returns no errors for valid input', () => {
    const data = {
      title: 'Valid Title',
      description: 'Valid description',
      technologies: ['React'],
      images: [validFile()],
    };
    expect(validateProjectForm(data)).toEqual({});
  });

  it('requires title', () => {
    const data = {
      title: '',
      description: 'desc',
      technologies: ['React'],
      images: [validFile()],
    };
    expect(validateProjectForm(data).title).toMatch(/required/i);
  });

  it('enforces max title length', () => {
    const data = {
      title: 'a'.repeat(101),
      description: 'desc',
      technologies: ['React'],
      images: [validFile()],
    };
    expect(validateProjectForm(data).title).toMatch(/at most 100 characters/i);
  });

  it('requires description', () => {
    const data = {
      title: 'Title',
      description: '',
      technologies: ['React'],
      images: [validFile()],
    };
    expect(validateProjectForm(data).description).toMatch(/required/i);
  });

  it('enforces max description length', () => {
    const data = {
      title: 'Title',
      description: 'a'.repeat(1001),
      technologies: ['React'],
      images: [validFile()],
    };
    expect(validateProjectForm(data).description).toMatch(/at most 1000 characters/i);
  });

  it('requires at least one technology', () => {
    const data = {
      title: 'Title',
      description: 'desc',
      technologies: [],
      images: [validFile()],
    };
    expect(validateProjectForm(data).technologies).toMatch(/at least one technology/i);
  });

  it('requires at least one image', () => {
    const data = {
      title: 'Title',
      description: 'desc',
      technologies: ['React'],
      images: [],
    };
    expect(validateProjectForm(data).images).toMatch(/at least one image/i);
  });

  it('rejects invalid image type', () => {
    const data = {
      title: 'Title',
      description: 'desc',
      technologies: ['React'],
      images: [{ name: 'bad.txt', type: 'text/plain', size: 1000 }],
    };
    expect(validateProjectForm(data).images_0).toMatch(/invalid file type/i);
  });

  it('rejects image over 2MB', () => {
    const data = {
      title: 'Title',
      description: 'desc',
      technologies: ['React'],
      images: [{ name: 'big.jpg', type: 'image/jpeg', size: 3 * 1024 * 1024 }],
    };
    expect(validateProjectForm(data).images_0).toMatch(/under 2MB/i);
  });

  it('handles multiple image errors', () => {
    const data = {
      title: 'Title',
      description: 'desc',
      technologies: ['React'],
      images: [
        { name: 'bad.txt', type: 'text/plain', size: 1000 },
        { name: 'big.jpg', type: 'image/jpeg', size: 3 * 1024 * 1024 },
      ],
    };
    const errors = validateProjectForm(data);
    expect(errors.images_0).toMatch(/invalid file type/i);
    expect(errors.images_1).toMatch(/under 2MB/i);
  });
}); 