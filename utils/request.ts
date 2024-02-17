

export interface RequestOptions {
  // 可以根据需要扩展其他选项
  headers?: Record<string, string>;
  body?: any;
}

export async function get<T>(url: string, options?: RequestOptions): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    headers: options?.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  return response.json();
}

export async function post<T>(url: string, data: any, options?: RequestOptions): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to post to ${url}: ${response.statusText}`);
  }

  return response.json();
}

export async function put<T>(url: string, data: any, options?: RequestOptions): Promise<T> {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to put to ${url}: ${response.statusText}`);
  }

  return response.json();
}

export async function del<T>(url: string, options?: RequestOptions): Promise<T> {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: options?.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to delete ${url}: ${response.statusText}`);
  }

  return response.json();
}
