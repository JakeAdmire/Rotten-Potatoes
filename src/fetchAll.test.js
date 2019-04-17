import { fetchAll } from './fetchAll.js';

describe('fetchAll', () => {

  let mockData;
  let mockUrl;

  beforeEach(() => {

    mockData = { restaurants: [{}, {}, {}] };
    mockUrl = 'www.starwars.com';

    fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockData),
    }));

  });

  it('should take a url', () => {
    fetchAll(mockUrl);
    expect(fetch).toHaveBeenCalledWith(mockUrl);
  });

  it('should return expected data', async () => {
    const result = await fetchAll(mockUrl)
    expect(result).toEqual(mockData);
  });

  it('should throw an error if everything is not okay', async () => {
    window.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      json: jest.fn(() => Promise.resolve('fetch failed'))
    }));

    const expected = new Error('fetch failed');
    await expect(fetchAll(mockUrl)).rejects.toEqual(expected);
  });

})