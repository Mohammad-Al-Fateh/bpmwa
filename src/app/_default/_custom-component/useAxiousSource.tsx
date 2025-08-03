import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_V1,
  withCredentials: true,
});

export default function useAxiousSource() {
  return { axiosSource: axiosInstance };
}
