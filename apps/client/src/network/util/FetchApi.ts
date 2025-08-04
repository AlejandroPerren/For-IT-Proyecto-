type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions<TBody = unknown> {
  method?: FetchMethod;
  body?: TBody;
  token?: string;
}

export async function apiFetch<TResponse, TBody = unknown>(
  endpoint: string,
  options: FetchOptions<TBody> = {}
): Promise<{ ok: boolean; data: TResponse | null; error?: string }> {
  try {
    const res = await fetch(endpoint, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      },
      ...(options.body ? { body: JSON.stringify(options.body) } : {}),
    });

    const json = await res.json();

    if (!res.ok || !json.ok) {
      return { ok: false, data: null, error: json?.error || 'Error desconocido' };
    }

    return { ok: true, data: json.data };
  } catch (err: unknown) {
  let errorMessage = 'Fallo de red';

  if (err instanceof Error) {
    errorMessage = err.message;
  }

  return { ok: false, data: null, error: errorMessage };
}
}
