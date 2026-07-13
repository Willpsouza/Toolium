import type { NextConfig } from "next";

const securityHeaders = [
  // Previne clickjacking — impede que o site seja embutido em iframes de terceiros.
  // Complementa a diretiva frame-ancestors do CSP.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Impede MIME sniffing — o navegador respeita o Content-Type declarado.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Controla quanto referrer é enviado em requisições cross-origin.
  // "strict-origin-when-cross-origin" envia origem apenas em HTTPS, path completo em same-origin.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrita permissões de API do navegador (câmera, microfone, geolocalização, etc.).
  // O Toolium não usa nenhuma dessas APIs — todas bloqueadas.
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=(), payment=(), usb=()",
  },
  // Força HTTPS em navegadores que suportam (produção com certificado).
  // 1 ano, inclui subdomínios, permite preload.
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  // Content-Security-Policy:
  // - default-src 'self': carrega recursos apenas do próprio domínio por padrão
  // - script-src: 'self' + 'unsafe-inline' (Next.js inline scripts de runtime) + domínios AdSense
  // - style-src: 'self' 'unsafe-inline' (Tailwind 4 injeta estilos inline em runtime)
  // - img-src: 'self' data: (SVG inline, data URIs de canvas previews) + AdSense tracking pixels
  // - font-src: 'self' (next/font self-hosted)
  // - connect-src: 'self' + AdSense
  // - frame-src: AdSense pode usar iframes para anúncios
  // - object-src 'none': bloqueia Flash/Java/plugins
  // - base-uri 'self': previne hijack de base tag
  // - form-action 'self': previne redirecionamento de forms para domínios externos
  // - frame-ancestors 'self': previne embedding (equivalente moderno ao X-Frame-Options)
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://adservice.google.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net",
      "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  // Esconde o header X-Powered-By (fingerprinting da stack).
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
