import { getProjects, saveProjects } from './projects';

const STORAGE_KEY = 'portfolio_projects';

describe('projects data persistence', () => {
  let localStorageMock;
  beforeEach(() => {
    localStorageMock = (() => {
      let store = {};
      return {
        getItem: jest.fn(key => store[key] || null),
        setItem: jest.fn((key, value) => { store[key] = value; }),
        removeItem: jest.fn(key => { delete store[key]; }),
        clear: jest.fn(() => { store = {}; }),
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    jest.resetModules();
  });

  it('saves projects to localStorage', () => {
    const projects = [{ id: '1', title: 'Test' }];
    saveProjects(projects);
    expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify(projects));
  });

  it('gets projects from localStorage if present', () => {
    const projects = [{ id: '1', title: 'Test' }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(projects));
    expect(getProjects()).toEqual(projects);
  });

  it('returns [] if localStorage is corrupted', () => {
    localStorage.getItem.mockReturnValueOnce('not-json');
    expect(getProjects()).toEqual([]);
  });

  it('falls back to projects.json if localStorage is empty', () => {
    localStorage.getItem.mockReturnValueOnce(null);
    jest.doMock('./projects.json', () => ([{ id: '2', title: 'From JSON' }]), { virtual: true });
    // Re-import getProjects to use the mocked module
    const { getProjects: getProjectsReloaded } = require('./projects');
    expect(getProjectsReloaded()).toEqual([{ id: '2', title: 'From JSON' }]);
    jest.dontMock('./projects.json');
  });

  it('returns [] if projects.json is missing or invalid', () => {
    localStorage.getItem.mockReturnValueOnce(null);
    jest.doMock('./projects.json', () => ({}), { virtual: true });
    const { getProjects: getProjectsReloaded } = require('./projects');
    expect(getProjectsReloaded()).toEqual([]);
    jest.dontMock('./projects.json');
  });
}); 