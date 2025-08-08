import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProjectCard from '../ProjectCard';
import * as imageStorage from '../../utils/imageStorage';

jest.mock('../../utils/imageStorage');

const FALLBACK_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="%23eee"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="%23999">No Image</text></svg>';

describe('ProjectCard', () => {
  const project = {
    id: '1',
    title: 'Test Project',
    imageKeys: ['1/cover.jpg'],
  };

  it('shows fallback image if image not found', async () => {
    imageStorage.getImage.mockResolvedValueOnce(null);
    render(<ProjectCard project={project} />);
    await waitFor(() => {
      const img = screen.getByAltText('Test Project');
      expect(img).toBeInTheDocument();
      expect(img.src).toContain('data:image/svg+xml');
    });
  });

  it('shows image from imageStorage if available', async () => {
    imageStorage.getImage.mockResolvedValueOnce({ data: 'data:image/png;base64,abc123' });
    render(<ProjectCard project={project} />);
    await waitFor(() => {
      const img = screen.getByAltText('Test Project');
      expect(img).toBeInTheDocument();
      expect(img.src).toContain('data:image/png;base64,abc123');
    });
  });
}); 