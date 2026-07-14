import type { NextConfig } from "next";

const securityHeaders = [
  // X-Frame-Options removido — deprecated, substituído por CSP frame-ancestors (mais expressivo).
  // Impede MIME sniffing — o navegador respeita o Content-Type declarado.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Controla quanto referrer é enviado em requisições cross-origin.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrita permissões de API do navegador (câmera, microfone, geolocalização, etc.).
  { key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=(), payment=(), usb=()",
  },
  // Força HTTPS em produção (1 ano, inclui subdomínios, permite preload).
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  // Content-Security-Policy:
  // - frame-ancestors: permite 'self' + domínios do sandbox de preview (space-z.ai).
  //   Necessário para o painel de preview embuter o site em iframe durante o desenvolvimento.
  //   Em produção (toolium.com.br), space-z.ai não é usado, mas permitir não é risco
  //   (conteúdo é público, sem auth/dados sensíveis). Terceiros continuam bloqueados.
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
      "frame-ancestors 'self' https://*.space-z.ai",
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
