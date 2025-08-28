import { config } from "apps/frontend/config";
export async function login(formData: any) {
  try {
    const res = await fetch(`${config.BACKEND_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    if (res.status === 200) {
      const { data } = await res.json();
      return data;
    }
    return null;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function signup(formData: any) {
  try {
    const res = await fetch(`${config.BACKEND_ENDPOINT}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data.success);
    const newData = { ...data, ok: true };
    return newData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function logout() {
  try {
    const res = await fetch(`${config.BACKEND_ENDPOINT}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    const { data } = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function getUserInformation() {
  try {
    console.log("getting user");
    const res = await fetch(`${config.BACKEND_ENDPOINT}/auth/user`, {
      method: "GET",
      credentials: "include",
    });
    const { data } = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function updateUserInformation(formData: any) {
  try {
    const res = await fetch(`${config.BACKEND_ENDPOINT}/auth/user`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const { data } = await res.json();
    console.log(data, "from upadrte use ingo");
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
