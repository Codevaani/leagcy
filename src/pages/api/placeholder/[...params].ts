import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { params } = req.query;
  const [width = '100', height = '100'] = Array.isArray(params) ? params : [params];
  
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#e5e7eb"/>
    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial" font-size="14">${width}×${height}</text>
  </svg>`;
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).send(svg);
}
