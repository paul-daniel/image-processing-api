import supertest from 'supertest';
import app from '../../..';

const request = supertest(app)

describe('image endpoints', () => {
  describe('/GET', () => {
    it('should successfully send image file', async () => {
      await request.get('/api/image?filename=lake')
          .expect(200)
    })

    it('should successfully send resized image file', async () => {
      await request.get('/api/image/compress?filename=lake')
          .expect(200)
    })

    it('should successfully send compressed image file', async () => {
      await request.get('/api/image/compress?filename=lake')
          .expect(200)
    })
  })
})
