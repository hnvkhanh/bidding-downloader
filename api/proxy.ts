import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = 'https://muasamcong.mpi.gov.vn/o/egp-portal-contractor-selection-v2' + req.url?.replace(/^\/api/, '') || '';
  const method = req.method || 'GET';
  // Convert headers to string values only, as required by fetch
  const headers: Record<string, string> = {};
  Object.entries(req.headers).forEach(([key, value]) => {
    if (key.toLowerCase() !== 'host' && typeof value !== 'undefined') {
      headers[key] = Array.isArray(value) ? value.join(',') : value;
    }
  });

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: method !== 'GET' && method !== 'HEAD' ? req.body : undefined,
    });
    const contentType = response.headers.get('content-type');
    res.status(response.status);
    if (contentType) res.setHeader('content-type', contentType);
    const data = await response.arrayBuffer();
    res.send(Buffer.from(data));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
