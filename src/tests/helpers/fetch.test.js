import { fetchWithoutToken, fetchWithToken } from '../../../src/helpers/fetch';

describe('Tests in Fetch', () => {
  let token = '';
  test('should work without token', async () => {
    const resp = await fetchWithoutToken(
      'auth',
      { email: 'elisperezmusic@test.com', password: '123456' },
      'POST'
    );
    expect(resp instanceof Response).toBe(true);

    const body = await resp.json();
    expect(body.ok).toBe(true);
    // console.log(body);
    token = body.token;
  });

  test('should work with token', async () => {
    localStorage.setItem('token', token);
    const resp = await fetchWithToken('events/62d7164f60c767f9901e765c', {}, 'DELETE');
    const body = await resp.json();

    expect(body.msg).toBe('Event not found');
  });
});
