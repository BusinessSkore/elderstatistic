import { Evaluacion } from "@/interfaces/Evaluacion";
import { AxiosResponse } from "axios";
import axios from "./axios";

export const createPatient = async (
  evaluacion: Evaluacion
): Promise<AxiosResponse> =>
  await axios.put("/create?patient=true", evaluacion);

export const create = async (evaluacion: Evaluacion): Promise<AxiosResponse> =>
  await axios.put("/create", evaluacion);

export const updateConvocatoria = async (
  cedula: string,
  attribute: string,
  value: string
): Promise<AxiosResponse> =>
  await axios.get(`/getmanybydate?cedula=${cedula}&attribute=${attribute}&value=${value}`);

export const getManyByUNAP = async (
  id_center: string
): Promise<AxiosResponse> =>
  await axios.get(`/getmanybydate?id_center=${id_center}`);

export const getManyByUNAPPaginated = async (
  id_center: string,
  LastEvaluatedKey_fecha: string,
  LastEvaluatedKey_cedula: string,
  LastEvaluatedKey_id_center: string
): Promise<AxiosResponse> =>
  await axios.get(
    `/getmanybydate?id_center=${id_center}&LastEvaluatedKey_fecha=${LastEvaluatedKey_fecha}&LastEvaluatedKey_cedula=${LastEvaluatedKey_cedula}&LastEvaluatedKey_id_center=${LastEvaluatedKey_id_center}`
  );

export const getManyByDate = async (
  fecha: string,
  id_centerKit: string
): Promise<AxiosResponse> =>
  await axios.get(`/getmanybydate?fecha=${fecha}&id_centerKit=${id_centerKit}`);

export const getManyByDateOnly = async (
  fecha: string
): Promise<AxiosResponse> =>
  await axios.get(`/getmanybydateonly?fecha=${fecha}`);

export const getManyByCedula = async (cedula: string): Promise<AxiosResponse> =>
  await axios.get(`/getmanybycedula?cedula=${cedula}`);

export const getOneEncontrarNuevos = async (
  cedula: string
): Promise<AxiosResponse> =>
  await axios.get(`/getoneencontrarnuevos?cedula=${cedula}`);

export const getOne = async (
  cedula: string,
  fecha: string
): Promise<AxiosResponse> =>
  await axios.get(`/getone?cedula=${cedula}&fecha=${fecha}`);

export const destroy = async (
  cedula: string,
  fecha: string
): Promise<AxiosResponse> =>
  await axios.delete(`/destroy?cedula=${cedula}&fecha=${fecha}`);
