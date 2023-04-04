const request = require('supertest')
const app = require('./server');
// login
describe('User Not Found', () => {
  test('User Not Found', async () => {
    const response = await request(app).post('/auth/login').send(body = {
      email: 'fatihaxxx@gmail.com',
      password: 'scdcsd'
    }
    );
    expect(response.text).toBe('{\"error\":\"User Not Found\"}');
  })
})

//  register 

describe('email already exist', () => {
  test('email already exist', async () => {
    const response = await request(app).post('/auth/register').send(body = {
      fullName: 'sahtfatiha',
      email: 'fatihhaa27@gmail.com',
      password: '12345'
    });
    expect(response.text).toBe('{\"error\":\"Email already exist\"}');
  })
})


describe('your account is created', () => {
  test('your account is created', async () => {
    const response = await request(app).post('/auth/register').send(body = {
      username: 'sahtfatiha',
      email: 'fatihhaa@gmail.com',
      password: '12345'
    });
    expect(response.text).toBe('{\"message\":\"your account is created\"}');
  })
})
