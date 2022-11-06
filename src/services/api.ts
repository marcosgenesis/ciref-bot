import axios from 'axios';
export const apiGithub = axios.create({
  baseURL: 'https://api.github.com/',
  headers: { Authorization: 'Bearer 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' },
});

export const backendApi = axios.create({
  baseURL: 'http://localhost:3333/',
});
