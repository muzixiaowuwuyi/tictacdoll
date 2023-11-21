import { User } from '../components/Login/Login';

const API_BASE_URL = "http://localhost:3002";

export async function register(user: User) {
  try {
    const res = await fetch( `${API_BASE_URL}/user/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return res;
  } catch(error) {
    console.log(error)
  }
}

export function login(user: User) {

}

export function logout() {

}