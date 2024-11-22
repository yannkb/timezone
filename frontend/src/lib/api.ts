import axios from 'axios';
import type { Timezone, TimeConversion, TimezoneRequest } from '../types/timezone';

const api = axios.create({
  baseURL: 'http://localhost:8080/usertimezones',
});

export const getTimezonesAvailable = async () => {
  const response = await api.get<Timezone[]>('/available');
  return response.data;
};

export const getTimezones = async () => {
  const response = await api.get<Timezone[]>('/');
  return response.data;
};

export const getTimezone = async (id: number) => {
  const response = await api.get<Timezone>(`/${id}`);
  return response.data;
};

export const createTimezone = async (timezone: TimezoneRequest) => {
  const response = await api.post<Timezone>('/', timezone);
  return response.data;
};

export const updateTimezone = async (timezone: Timezone) => {
  const response = await api.put<Timezone>(`/${timezone.id}`, timezone);
  return response.data;
};

export const deleteTimezone = async (id: number) => {
  await api.delete(`/${id}`);
};

export const convertTime = async (data: TimeConversion) => {
  const response = await api.post('/convert', data);
  return response.data;
};