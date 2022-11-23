import axios from 'axios';
export const apiGithub = axios.create({
  baseURL: 'https://api.github.com/',
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}` },
});

export const backendApi = axios.create({
  baseURL: process.env.BACKEND_API,
});
