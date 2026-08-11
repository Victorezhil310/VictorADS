import { siteConfig } from '../../config/siteConfig';

export async function GET() {
  const content = `google.com, pub-6751037211810646, DIRECT, f08c47fec0942fa0\n`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  });
}
