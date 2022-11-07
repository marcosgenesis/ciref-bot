import axios from 'axios';
export const apiGithub = axios.create({
  baseURL: 'https://api.github.com/',
  headers: { Authorization: 'Bearer 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' },
});

export const backendApi = axios.create({
  baseURL: 'http://localhost:3333/',
});
