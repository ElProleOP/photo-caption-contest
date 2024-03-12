const request = require('supertest');
const app = require('../app'); 
const assert = require('chai').assert;
const expect = require('chai').expect;

describe('Caption routes', () => {
  let authToken;
  // Before running the tests, sign in and obtain the authentication token
  beforeEach(async () => {
    const signInRes = await request(app)
      .post('/api/auth/signin')
      .send({ email: 'test@example.com', password: 'password' }); // Update with your test user credentials

    authToken = signInRes.body.token;
  });

  it('should create a new caption', async () => {
    const res = await request(app)
      .post('/api/captions')
      .set('Authorization', `${authToken}`)
      .send({ imageUrl: 'image-url.jpg', caption: 'Test caption' });

    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.ownProperty('message', 'Caption created successfully');
    expect(res.body).to.have.ownProperty('caption');
  });

  it('should get all captions', async () => {
    const res = await request(app)
      .get('/api/captions');

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an.instanceOf(Array);
  });

  it('should update an existing caption', async () => {
    // First, create a caption to update
    const createRes = await request(app)
        .post('/api/captions')
        .set('Authorization', `${authToken}`)
        .send({ imageUrl: 'image-url.jpg', caption: 'Test caption' });

    const captionId = createRes.body.caption.id;

    // Update the caption
    const updateRes = await request(app)
      .put(`/api/captions/${captionId}`)
      .set('Authorization', `${authToken}`)
      .send({ caption: 'Updated caption' });

    expect(updateRes.statusCode).to.equal(200);
    expect(updateRes.body).to.have.ownProperty('message', 'Caption updated successfully');
  });

  it('should delete an existing caption', async () => {
    // First, create a caption to delete
    const createRes = await request(app)
        .post('/api/captions')
        .set('Authorization', `${authToken}`)
        .send({ imageUrl: 'image-url.jpg', caption: 'Test caption' });

    const captionId = createRes.body.caption.id;

    // Delete the caption
    const deleteRes = await request(app)
      .delete(`/api/captions/${captionId}`)
      .set('Authorization', `${authToken}`);

    expect(deleteRes.statusCode).to.equal(200);
    expect(deleteRes.body).to.have.ownProperty('message', 'Caption deleted successfully');
  });
  
});
