"use client";
import Script from "next/script";

const CC_LANG_MAP: Record<string, string> = {
  FR: "fr", AR: "ar", EN: "en", IT: "it", ES: "es", TZM: "fr",
};

function updateGAConsent(analyticsAccepted: boolean) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (!w.gtag) return;
  w.gtag("consent", "update", {
    analytics_storage: analyticsAccepted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

interface CCInstance {
  run: (cfg: unknown) => void;
  acceptedCategory: (cat: string) => boolean;
  setLanguage: (lang: string) => void;
}

function initCookieConsent() {
  const win = window as unknown as Record<string, unknown>;
  if (!win.CookieConsent) return;
  const CC = win.CookieConsent as CCInstance;

  let savedLang = "FR";
  try {
    const raw = localStorage.getItem("qui-paye-lang");
    if (raw) savedLang = (JSON.parse(raw) as string) || "FR";
  } catch {}
  const ccLang = CC_LANG_MAP[savedLang] || "fr";

  CC.run({
    revision: 1,
    guiOptions: {
      consentModal: {
        layout: "box",
        position: "bottom left",
        equalWeightButtons: false,
        flipButtons: false,
        disablePageInteraction: false,
      },
      preferencesModal: {
        layout: "box",
        equalWeightButtons: false,
        flipButtons: false,
      },
    },
    onFirstConsent: () => updateGAConsent(CC.acceptedCategory("analytics")),
    onConsent:      () => updateGAConsent(CC.acceptedCategory("analytics")),
    onChange:       () => updateGAConsent(CC.acceptedCategory("analytics")),
    categories: {
      necessary: { enabled: true, readOnly: true },
      analytics: {
        enabled: false,
        autoClear: {
          cookies: [{ name: /^_ga/ }, { name: "_gid" }],
        },
      },
    },
    language: {
      default: ccLang,
      translations: {
        fr: {
          consentModal: {
            title: "🍪 Cookies",
            description:
              "Nous utilisons <strong>Google Analytics</strong> (anonymisé) pour mesurer l'audience. Vous pouvez refuser sans aucun impact sur votre expérience.",
            acceptAllBtn: "Tout accepter",
            acceptNecessaryBtn: "Refuser",
            showPreferencesBtn: "Personnaliser ›",
          },
          preferencesModal: {
            title: "⚙️ Préférences cookies",
            acceptAllBtn: "Tout accepter",
            acceptNecessaryBtn: "Tout refuser",
            savePreferencesBtn: "✓ Enregistrer mes choix",
            closeIconLabel: "Fermer",
            sections: [
              {
                title: "Comment on utilise les cookies",
                description:
                  "Les cookies nécessaires sont indispensables au bon fonctionnement. Les cookies analytiques nous aident à améliorer l'application. Modifiez vos choix à tout moment via le bouton <strong>Cookies</strong> en bas de page.",
              },
              {
                title: "🔒 Cookies nécessaires",
                description:
                  "Stockent vos préférences locales : langue, thème, palette, historique. Aucune donnée envoyée à des tiers.",
                linkedCategory: "necessary",
              },
              {
                title: "📊 Google Analytics (anonymisé)",
                description:
                  "Mesure l'audience de manière anonyme : pages visitées, pays, type d'appareil. <strong>Aucune donnée personnelle</strong> collectée. Conservation : 13 mois. Conforme CNIL.",
                linkedCategory: "analytics",
              },
            ],
          },
        },
        en: {
          consentModal: {
            title: "🍪 Cookies",
            description:
              "We use <strong>Google Analytics</strong> (anonymized) to measure traffic. You can decline without any impact on your experience.",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Decline",
            showPreferencesBtn: "Customize ›",
          },
          preferencesModal: {
            title: "⚙️ Cookie preferences",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            savePreferencesBtn: "✓ Save my choices",
            closeIconLabel: "Close",
            sections: [
              {
                title: "How we use cookies",
                description:
                  "Necessary cookies are required for the app to function. Analytics cookies help us improve the app. Change your choices at any time via the <strong>Cookies</strong> button at the bottom of the page.",
              },
              {
                title: "🔒 Necessary cookies",
                description:
                  "Store your local preferences: language, theme, color palette, draw history. No data sent to third parties.",
                linkedCategory: "necessary",
              },
              {
                title: "📊 Google Analytics (anonymized)",
                description:
                  "Anonymously measures audience: pages visited, country, device type. <strong>No personal data</strong> collected. Stored for 13 months.",
                linkedCategory: "analytics",
              },
            ],
          },
        },
        ar: {
          consentModal: {
            title: "🍪 ملفات تعريف الارتباط",
            description:
              "نستخدم <strong>Google Analytics</strong> بشكل مجهول لقياس الزيارات. يمكنك الرفض دون أي تأثير على تجربتك.",
            acceptAllBtn: "قبول الكل",
            acceptNecessaryBtn: "رفض",
            showPreferencesBtn: "تخصيص ›",
          },
          preferencesModal: {
            title: "⚙️ تفضيلات ملفات تعريف الارتباط",
            acceptAllBtn: "قبول الكل",
            acceptNecessaryBtn: "رفض الكل",
            savePreferencesBtn: "✓ حفظ اختياراتي",
            closeIconLabel: "إغلاق",
            sections: [
              {
                title: "كيف نستخدم ملفات تعريف الارتباط",
                description:
                  "ملفات الارتباط الضرورية مطلوبة لتشغيل التطبيق. يمكنك تغيير اختياراتك في أي وقت عبر زر <strong>الكوكيز</strong> في أسفل الصفحة.",
              },
              {
                title: "🔒 ملفات الارتباط الضرورية",
                description:
                  "تخزن تفضيلاتك المحلية: اللغة، الثيم، لوحة الألوان، سجل السحوبات. لا يتم إرسال أي بيانات لجهات خارجية.",
                linkedCategory: "necessary",
              },
              {
                title: "📊 Google Analytics (مجهول)",
                description:
                  "يقيس عدد الزوار بشكل مجهول: الصفحات، الدولة، نوع الجهاز. <strong>لا توجد بيانات شخصية</strong>. مدة الاحتفاظ: 13 شهرًا.",
                linkedCategory: "analytics",
              },
            ],
          },
        },
        es: {
          consentModal: {
            title: "🍪 Cookies",
            description:
              "Usamos <strong>Google Analytics</strong> anonimizado para medir el tráfico. Puedes rechazarlo sin afectar tu experiencia.",
            acceptAllBtn: "Aceptar todo",
            acceptNecessaryBtn: "Rechazar",
            showPreferencesBtn: "Personalizar ›",
          },
          preferencesModal: {
            title: "⚙️ Preferencias de cookies",
            acceptAllBtn: "Aceptar todo",
            acceptNecessaryBtn: "Rechazar todo",
            savePreferencesBtn: "✓ Guardar mis preferencias",
            closeIconLabel: "Cerrar",
            sections: [
              {
                title: "Cómo usamos las cookies",
                description:
                  "Puedes cambiar tus preferencias en cualquier momento con el botón <strong>Cookies</strong> en la parte inferior.",
              },
              {
                title: "🔒 Cookies necesarias",
                description:
                  "Guardan tus preferencias: idioma, tema, paleta, historial. Sin envío a terceros.",
                linkedCategory: "necessary",
              },
              {
                title: "📊 Google Analytics (anónimo)",
                description:
                  "Mide la audiencia de forma anónima. <strong>Sin datos personales</strong>. Conservación: 13 meses.",
                linkedCategory: "analytics",
              },
            ],
          },
        },
        it: {
          consentModal: {
            title: "🍪 Cookie",
            description:
              "Usiamo <strong>Google Analytics</strong> anonimizzato per misurare il traffico. Puoi rifiutare senza impatti sull'esperienza.",
            acceptAllBtn: "Accetta tutto",
            acceptNecessaryBtn: "Rifiuta",
            showPreferencesBtn: "Personalizza ›",
          },
          preferencesModal: {
            title: "⚙️ Preferenze cookie",
            acceptAllBtn: "Accetta tutto",
            acceptNecessaryBtn: "Rifiuta tutto",
            savePreferencesBtn: "✓ Salva le mie preferenze",
            closeIconLabel: "Chiudi",
            sections: [
              {
                title: "Come usiamo i cookie",
                description:
                  "Puoi modificare le tue preferenze in qualsiasi momento tramite il pulsante <strong>Cookies</strong> in fondo alla pagina.",
              },
              {
                title: "🔒 Cookie necessari",
                description:
                  "Salvano le preferenze locali: lingua, tema, palette, cronologia. Nessun dato inviato a terzi.",
                linkedCategory: "necessary",
              },
              {
                title: "📊 Google Analytics (anonimo)",
                description:
                  "Misura il pubblico in modo anonimo. <strong>Nessun dato personale</strong>. Conservazione: 13 mesi.",
                linkedCategory: "analytics",
              },
            ],
          },
        },
      },
    },
  });

  // Exposé globalement pour que App.tsx puisse synchroniser la langue
  win.updateCCLang = (appLang: string) => {
    CC.setLanguage(CC_LANG_MAP[appLang] || "fr");
  };
}

export default function CookieConsentInit() {
  return (
    <Script
      src="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js"
      strategy="afterInteractive"
      onLoad={initCookieConsent}
    />
  );
}
