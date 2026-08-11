import { siteConfig } from '../../config/siteConfig';

export async function GET() {
  const content = `# Google AdSense Authorized Digital Sellers
# Generated dynamically by VictorADS config
google.com, ${siteConfig.googleAdSensePublisherId}, DIRECT, f08c47fec0942fa0
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  });
}
