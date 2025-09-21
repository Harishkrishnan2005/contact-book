import axios from 'axios';

const BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';

const instance = axios.create({
  baseURL: BASE,
});

export default {
  createContact: (data) => instance.post('/contacts', data).then((r) => r.data),
  getContacts: (page = 1, limit = 10) =>
    instance.get(`/contacts?page=${page}&limit=${limit}`).then((r) => r.data),
  deleteContact: (id) => instance.delete(`/contacts/${id}`).then((r) => r.data),
};