import type { Metadata, Viewport } from "next";
import Script from "next/script";
import CookieConsentInit from "@/components/CookieConsentInit";
import "./globals.css";

const BASE_URL = "https://www.sahelmahel.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#7c3aed",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Qui paye ? — Tirage au sort gratuit pour choisir le payeur",
    template: "%s | Qui paye ?",
  },
  description:
    "Désigne aléatoirement qui paye parmi tes amis ! Ajoute les prénoms, lance le tirage et laisse le sort décider. Application gratuite, sans inscription, multilingue (FR, AR, EN, IT, ES, TZM).",
  keywords: [
    "qui paye",
    "tirage au sort",
    "choisir qui paye",
    "application amis",
    "random picker",
    "désigner payeur",
    "tirages entre amis",
    "app gratuite tirage",
    "من يدفع",
    "chi paga",
    "quién paga",
    "who pays",
    "sahelmahel",
  ],
  authors: [{ name: "SahelMahel", url: BASE_URL }],
  creator: "SahelMahel",
  publisher: "SahelMahel",
  category: "entertainment",
  classification: "Application web de tirage au sort",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: BASE_URL + "/",
    languages: {
      "fr-FR": BASE_URL + "/",
      "ar":    BASE_URL + "/",
      "en":    BASE_URL + "/",
      "it":    BASE_URL + "/",
      "es":    BASE_URL + "/",
    },
  },
  openGraph: {
    type: "website",
    url: BASE_URL + "/",
    title: "Qui paye ? — Tirage au sort gratuit entre amis",
    description:
      "L'app qui désigne le payeur en un clic. Ajoute tes amis, lance le tirage et laisse le sort décider. 100% gratuit, sans pub, multilingue.",
    images: [
      {
        url: BASE_URL + "/img/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Qui paye ? - Application de tirage au sort entre amis",
        type: "image/png",
      },
    ],
    siteName: "Qui paye ? by SahelMahel",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sahelmahel",
    creator: "@sahelmahel",
    title: "Qui paye ? — Tirage au sort gratuit entre amis",
    description:
      "Désigne aléatoirement qui paye parmi tes amis ! Gratuit, sans pub, multilingue.",
    images: [BASE_URL + "/img/og-preview.png"],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Qui paye ?",
    "application-name": "Qui paye ?",
    "msapplication-TileColor": "#7c3aed",
    "format-detection": "telephone=no",
  },
};

const JSON_LD_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": BASE_URL + "/#website",
      url: BASE_URL + "/",
      name: "Qui paye ?",
      description: "Application de tirage au sort pour désigner qui paye entre amis",
      publisher: { "@id": BASE_URL + "/#organization" },
      inLanguage: ["fr", "ar", "en", "it", "es"],
    },
    {
      "@type": "Organization",
      "@id": BASE_URL + "/#organization",
      name: "SahelMahel",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: BASE_URL + "/android-chrome-512x512.png",
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": BASE_URL + "/#app",
      name: "Qui paye ?",
      alternateName: ["Who Pays?", "من يدفع؟", "Chi paga?", "¿Quién paga?"],
      description:
        "Application web gratuite de tirage au sort pour désigner aléatoirement qui paye parmi un groupe d'amis. Sans inscription, sans publicité, multilingue.",
      url: BASE_URL + "/",
      applicationCategory: "UtilitiesApplication",
      applicationSubCategory: "Entertainment",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript",
      inLanguage: ["fr", "ar", "en", "it", "es", "tzm"],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        ratingCount: "1",
        bestRating: "5",
        worstRating: "1",
      },
      author: { "@id": BASE_URL + "/#organization" },
      featureList: [
        "Tirage au sort aléatoire instantané",
        "Ajout et suppression de participants",
        "Historique des tirages",
        "Mode sombre et mode clair",
        "Palettes de couleurs personnalisables",
        "Effets sonores et confettis",
        "Multilingue : français, arabe, anglais, italien, espagnol, tamazight",
        "Partage de lien",
        "100% gratuit, sans inscription, sans publicité",
      ],
      screenshot: BASE_URL + "/img/og-preview.png",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Comment utiliser l'application Qui paye ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ajoutez les prénoms de vos amis dans le champ de texte, puis appuyez sur le bouton de tirage. L'application désigne aléatoirement un gagnant — ou plutôt un perdant — parmi les participants. Le résultat est instantané et équitable.",
          },
        },
        {
          "@type": "Question",
          name: "L'application Qui paye est-elle gratuite ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, Qui paye est 100% gratuit, sans inscription, sans abonnement et sans publicité. Elle fonctionne directement dans votre navigateur sur mobile et ordinateur.",
          },
        },
        {
          "@type": "Question",
          name: "Quelles langues sont disponibles dans Qui paye ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "L'application est disponible en 6 langues : français, arabe, anglais, italien, espagnol et tamazight (berbère). La langue se change en un clic via le drapeau en haut à droite.",
          },
        },
        {
          "@type": "Question",
          name: "Combien de personnes peut-on ajouter dans le tirage ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Il n'y a pas de limite. Vous pouvez ajouter autant de participants que vous voulez. Le tirage fonctionne à partir de 2 personnes.",
          },
        },
        {
          "@type": "Question",
          name: "Le tirage au sort est-il vraiment aléatoire ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, le tirage utilise Math.random() de JavaScript, qui génère un nombre aléatoire pour sélectionner un participant parmi la liste. Chaque personne a strictement la même probabilité d'être choisie.",
          },
        },
        {
          "@type": "Question",
          name: "Peut-on utiliser Qui paye sur mobile ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui, l'application est entièrement optimisée pour mobile. Elle peut aussi être installée sur l'écran d'accueil de votre smartphone (Android et iPhone) comme une application native.",
          },
        },
      ],
    },
    {
      "@type": "HowTo",
      name: "Comment désigner qui paye avec Qui paye ?",
      description: "Guide en 3 étapes pour utiliser l'application de tirage au sort",
      totalTime: "PT1M",
      step: [
        {
          "@type": "HowToStep",
          name: "Ajouter les participants",
          text: "Tapez le prénom d'un ami dans le champ de texte et appuyez sur le bouton +. Répétez pour chaque participant (minimum 2).",
          position: 1,
        },
        {
          "@type": "HowToStep",
          name: "Lancer le tirage",
          text: "Appuyez sur le bouton de tirage au sort. Une animation de roulette s'anime pendant quelques secondes.",
          position: 2,
        },
        {
          "@type": "HowToStep",
          name: "Découvrir le résultat",
          text: "Le nom du participant désigné s'affiche avec des confettis et des effets sonores. Le résultat est sauvegardé dans l'historique.",
          position: 3,
        },
      ],
    },
  ],
};

const INIT_SCRIPT = `(function(){try{
  var t=localStorage.getItem('qui-paye-theme');
  try{t=JSON.parse(t);}catch(e){}
  if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';}
  document.body.classList.add((t==='light')?'theme-light':'theme-dark');
  var pk=localStorage.getItem('qui-paye-palette');
  try{pk=JSON.parse(pk);}catch(e){}
  var m={
    violet:{primary:'#7c3aed',mid:'#a855f7',accent:'#ec4899',extra:'#f97316',rgb:'168,85,247',rgb2:'124,58,237',rgb3:'236,72,153'},
    ocean:{primary:'#0369a1',mid:'#0ea5e9',accent:'#06b6d4',extra:'#38bdf8',rgb:'14,165,233',rgb2:'3,105,161',rgb3:'6,182,212'},
    emeraude:{primary:'#047857',mid:'#10b981',accent:'#34d399',extra:'#a7f3d0',rgb:'16,185,129',rgb2:'4,120,87',rgb3:'52,211,153'},
    sunset:{primary:'#b91c1c',mid:'#ef4444',accent:'#f97316',extra:'#fbbf24',rgb:'239,68,68',rgb2:'185,28,28',rgb3:'249,115,22'},
    gold:{primary:'#92400e',mid:'#d97706',accent:'#f59e0b',extra:'#fcd34d',rgb:'217,119,6',rgb2:'146,64,14',rgb3:'245,158,11'},
    rose:{primary:'#9f1239',mid:'#e11d48',accent:'#f43f5e',extra:'#fb7185',rgb:'244,63,94',rgb2:'159,18,57',rgb3:'251,113,133'},
    indigo:{primary:'#4338ca',mid:'#6366f1',accent:'#818cf8',extra:'#a78bfa',rgb:'99,102,241',rgb2:'67,56,202',rgb3:'129,140,248'}
  };
  var v=m[pk]||m.violet;
  var r=document.documentElement.style;
  r.setProperty('--pal-primary',v.primary);r.setProperty('--pal-mid',v.mid);
  r.setProperty('--pal-accent',v.accent);r.setProperty('--pal-extra',v.extra);
  r.setProperty('--pal-rgb',v.rgb);r.setProperty('--pal-rgb2',v.rgb2);r.setProperty('--pal-rgb3',v.rgb3);
}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Cairo:wght@400;600;700;900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_GRAPH) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DLZ01F2QHL"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
gtag('js',new Date());gtag('config','G-DLZ01F2QHL',{anonymize_ip:true});`}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: INIT_SCRIPT }} />
        {children}
        <CookieConsentInit />
      </body>
    </html>
  );
}
