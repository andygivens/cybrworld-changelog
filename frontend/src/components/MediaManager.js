import axios from 'axios';

class MediaManager {
  async fetchMedia() {
    const res = await axios.get('/api/media');
    return res.data;
  }

  async addMedia(mediaData) {
    await axios.post('/api/media', mediaData);
  }

  async deleteMedia(id) {
    await axios.delete(`/api/media/${id}`);
  }
}

export default new MediaManager();