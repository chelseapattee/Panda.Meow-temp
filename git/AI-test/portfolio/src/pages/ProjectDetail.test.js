import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProjectDetail from './ProjectDetail';
import * as imageStorage from '../utils/imageStorage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('../utils/imageStorage');

const FALLBACK_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="%23eee"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="%23999">No Image</text></svg>';

describe('ProjectDetail', () => {
  const project = {
    id: '1',
    title: 'Test Project',
    imageKeys: ['1/cover.jpg', '1/extra.png'],
    description: 'desc',
  };
  beforeAll(() => {
    jest.doMock('../data/projects', () => [project], { virtual: true });
  });

  it('shows fallback image if image not found', async () => {
    imageStorage.getImage.mockResolvedValue(null);
    render(
      <MemoryRouter initialEntries={[`/projects/1`]}>
        <Routes>
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      const img = screen.getAllByAltText(/Test Project/)[0];
      expect(img).toBeInTheDocument();
      expect(img.src).toContain('data:image/svg+xml');
    });
  });

  it('shows all images from imageStorage if available', async () => {
    imageStorage.getImage
      .mockResolvedValueOnce({ data: 'data:image/png;base64,abc123' })
      .mockResolvedValueOnce({ data: 'data:image/png;base64,def456' });
    render(
      <MemoryRouter initialEntries={[`/projects/1`]}>
        <Routes>
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      const imgs = screen.getAllByAltText(/Test Project/);
      expect(imgs.length).toBe(2);
      expect(imgs[0].src).toContain('data:image/png;base64,abc123');
      expect(imgs[1].src).toContain('data:image/png;base64,def456');
    });
  });
}); 