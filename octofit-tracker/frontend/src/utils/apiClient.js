export function getApiBaseUrl(resource = '') {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const hostBase = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  const normalizedResource = resource.startsWith('/') ? resource : `/${resource}`;
  const trimmedResource = normalizedResource.replace(/\/+$/, '');

  return `${hostBase}/api${trimmedResource}/`;
}

export function normalizeCollectionPayload(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (Array.isArray(payload.docs)) {
    return payload.docs;
  }

  if (Array.isArray(payload.records)) {
    return payload.records;
  }

  return [];
}

export async function fetchCollection(resource) {
  const url = getApiBaseUrl(resource);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Unable to load ${resource}`);
  }

  const payload = await response.json();
  return normalizeCollectionPayload(payload);
}
