"use client";
import { Translation } from "@/lib/translations";

interface LegalModalProps {
  type: "mentions" | "privacy" | "cgu" | null;
  onClose: () => void;
  theme: string;
  lang: string;
  t: Translation;
}

const ac = "var(--pal-mid)";

type LangContent = Record<string, React.ReactNode>;

function buildContent(year: number): Record<string, LangContent> {
  return {
    FR: {
      mentions: (
        <>
          <h3>Éditeur du site</h3>
          <p>Le site <strong>sahelmahel.com</strong> est édité par SahelMahel, Paris, France.</p>
          <p>Contact : <a href="mailto:contact@sahelmahel.com" style={{ color: ac }}>contact@sahelmahel.com</a></p>
          <h3>Hébergement</h3>
          <p>Ce site est hébergé par un prestataire tiers. Pour toute question relative à l'hébergement, contactez-nous par email.</p>
          <h3>Propriété intellectuelle</h3>
          <p>L'ensemble des contenus présents sur ce site (textes, images, code) est la propriété exclusive de SahelMahel. Toute reproduction est interdite sans autorisation préalable.</p>
          <h3>Responsabilité</h3>
          <p>SahelMahel s'efforce d'assurer l'exactitude des informations diffusées sur ce site. Toutefois, nous ne pouvons garantir l'exactitude, la complétude ou l'actualité des informations.</p>
        </>
      ),
      privacy: (
        <>
          <h3>Données collectées</h3>
          <p>Ce site ne collecte <strong>aucune donnée personnelle</strong> identifiable (nom, email, téléphone) directement.</p>
          <p>Avec votre consentement, nous utilisons <strong>Google Analytics 4</strong> pour mesurer l'audience du site de manière anonymisée.</p>
          <h3>Cookies</h3>
          <p>Ce site utilise des cookies techniques nécessaires à son fonctionnement (thème, langue, historique local) et, avec votre consentement, des cookies analytiques via Google Analytics.</p>
          <p>Vous pouvez retirer votre consentement à tout moment en cliquant sur « Cookies » en bas de page.</p>
          <h3>Durée de conservation</h3>
          <p>Les données analytiques sont conservées pendant <strong>13 mois</strong> conformément aux recommandations de la CNIL.</p>
          <h3>Vos droits (RGPD)</h3>
          <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression. Contact : <a href="mailto:contact@sahelmahel.com" style={{ color: ac }}>contact@sahelmahel.com</a></p>
          <h3>Responsable du traitement</h3>
          <p>SahelMahel — Paris, France</p>
        </>
      ),
      cgu: (
        <>
          <h3>Accès au service</h3>
          <p><strong>Qui paye ?</strong> est une application web gratuite permettant d'effectuer des tirages au sort entre plusieurs personnes. L'accès est libre et sans inscription.</p>
          <h3>Utilisation</h3>
          <p>L'application est fournie « telle quelle », à titre informatif et ludique. SahelMahel ne saurait être tenu responsable de l'usage fait des résultats des tirages au sort.</p>
          <h3>Disponibilité</h3>
          <p>SahelMahel s'efforce d'assurer la disponibilité du service 24h/24 et 7j/7, sans pouvoir toutefois garantir une disponibilité sans interruption.</p>
          <h3>Propriété intellectuelle</h3>
          <p>Tous les droits de propriété intellectuelle relatifs à l'application appartiennent à SahelMahel. Toute reproduction ou utilisation commerciale est interdite sans accord préalable.</p>
          <h3>Droit applicable</h3>
          <p>Les présentes CGU sont soumises au droit français. Tout litige relève de la compétence des tribunaux français.</p>
          <p style={{ opacity: 0.5, fontSize: "11px", marginTop: "16px" }}>Dernière mise à jour : juin {year}</p>
        </>
      ),
    },
    EN: {
      mentions: (
        <>
          <h3>Site editor</h3>
          <p>The site <strong>sahelmahel.com</strong> is published by SahelMahel, Paris, France.</p>
          <p>Contact: <a href="mailto:contact@sahelmahel.com" style={{ color: ac }}>contact@sahelmahel.com</a></p>
          <h3>Hosting</h3>
          <p>This site is hosted by a third-party provider. For any hosting-related questions, please contact us by email.</p>
          <h3>Intellectual property</h3>
          <p>All content on this site (text, images, code) is the exclusive property of SahelMahel. Any reproduction is prohibited without prior authorization.</p>
          <h3>Liability</h3>
          <p>SahelMahel strives to ensure the accuracy of information published on this site but cannot guarantee its completeness or currency.</p>
        </>
      ),
      privacy: (
        <>
          <h3>Data collected</h3>
          <p>This site does not directly collect any <strong>identifiable personal data</strong> (name, email, phone).</p>
          <p>With your consent, we use <strong>Google Analytics 4</strong> to measure audience anonymously (pages visited, country, device type).</p>
          <h3>Cookies</h3>
          <p>This site uses technical cookies required for its operation (theme, language, local history) and, with your consent, analytics cookies via Google Analytics.</p>
          <p>You can withdraw your consent at any time by clicking "Cookies" at the bottom of the page.</p>
          <h3>Data retention</h3>
          <p>Analytics data is retained for <strong>13 months</strong> in accordance with CNIL guidelines.</p>
          <h3>Your rights (GDPR)</h3>
          <p>Under the GDPR, you have the right to access, correct and delete your data. Contact: <a href="mailto:contact@sahelmahel.com" style={{ color: ac }}>contact@sahelmahel.com</a></p>
          <h3>Data controller</h3>
          <p>SahelMahel — Paris, France</p>
        </>
      ),
      cgu: (
        <>
          <h3>Service access</h3>
          <p><strong>Who pays?</strong> is a free web app for randomly selecting who pays among a group of friends. Access is free and requires no registration.</p>
          <h3>Use</h3>
          <p>The app is provided "as is" for informational and entertainment purposes. SahelMahel shall not be held liable for any use made of the draw results.</p>
          <h3>Availability</h3>
          <p>SahelMahel strives to ensure 24/7 availability of the service but cannot guarantee uninterrupted availability.</p>
          <h3>Intellectual property</h3>
          <p>All intellectual property rights relating to the application belong to SahelMahel. Any reproduction or commercial use is prohibited without prior agreement.</p>
          <h3>Applicable law</h3>
          <p>These terms are governed by French law. Any dispute falls under the jurisdiction of French courts.</p>
          <p style={{ opacity: 0.5, fontSize: "11px", marginTop: "16px" }}>Last updated: June {year}</p>
        </>
      ),
    },
    AR: {
      mentions: (
        <>
          <h3>ناشر الموقع</h3>
          <p>موقع <strong>sahelmahel.com</strong> منشور من طرف SahelMahel، باريس، فرنسا.</p>
          <p>للتواصل: <a href="mailto:contact@sahelmahel.com" style={{ color: ac }}>contact@sahelmahel.com</a></p>
          <h3>الاستضافة</h3>
          <p>يستضاف هذا الموقع لدى مزود خدمة خارجي. لأي استفسار يتعلق بالاستضافة، تواصل معنا عبر البريد الإلكتروني.</p>
          <h3>الملكية الفكرية</h3>
          <p>جميع محتويات هذا الموقع (نصوص، صور، كود) هي ملك حصري لـ SahelMahel. يُحظر أي استنساخ دون إذن مسبق.</p>
          <h3>المسؤولية</h3>
          <p>تسعى SahelMahel إلى ضمان دقة المعلومات المنشورة، غير أنه لا يمكن ضمان اكتمالها أو حداثتها.</p>
        </>
      ),
      privacy: (
        <>
          <h3>البيانات المجمّعة</h3>
          <p>لا يجمع هذا الموقع <strong>أي بيانات شخصية</strong> قابلة للتعريف (اسم، بريد إلكتروني، هاتف) مباشرةً.</p>
          <p>بموافقتك، نستخدم <strong>Google Analytics 4</strong> لقياس الجمهور بشكل مجهول.</p>
          <h3>ملفات تعريف الارتباط</h3>
          <p>يستخدم الموقع ملفات ارتباط تقنية ضرورية للتشغيل (الثيم، اللغة، السجل المحلي)، وبموافقتك ملفات تحليلية عبر Google Analytics.</p>
          <p>يمكنك سحب موافقتك في أي وقت بالنقر على "الكوكيز" أسفل الصفحة.</p>
          <h3>مدة الاحتفاظ</h3>
          <p>تُحفظ بيانات التحليلات لمدة <strong>13 شهرًا</strong> وفق توصيات CNIL.</p>
          <h3>حقوقك (RGPD)</h3>
          <p>يحق لك الوصول إلى بياناتك وتصحيحها وحذفها. للمطالبة بهذه الحقوق: <a href="mailto:contact@sahelmahel.com" style={{ color: ac }}>contact@sahelmahel.com</a></p>
          <h3>المسؤول عن المعالجة</h3>
          <p>SahelMahel — باريس، فرنسا</p>
        </>
      ),
      cgu: (
        <>
          <h3>الوصول إلى الخدمة</h3>
          <p><strong>من يدفع؟</strong> تطبيق ويب مجاني للسحب العشوائي. الوصول مجاني ولا يتطلب تسجيلاً.</p>
          <h3>الاستخدام</h3>
          <p>يُقدَّم التطبيق "كما هو" لأغراض ترفيهية. لا تتحمل SahelMahel أي مسؤولية عن الاستخدام المقدم من نتائج السحوبات.</p>
          <h3>التوفر</h3>
          <p>تسعى SahelMahel لضمان توفر الخدمة على مدار الساعة، دون أن تضمن استمراريتها دون انقطاع.</p>
          <h3>القانون المطبّق</h3>
          <p>تخضع هذه الشروط للقانون الفرنسي. أي نزاع يخضع لاختصاص المحاكم الفرنسية.</p>
          <p style={{ opacity: 0.5, fontSize: "11px", marginTop: "16px" }}>آخر تحديث: يونيو {year}</p>
        </>
      ),
    },
    IT: {
      mentions: (
        <>
          <h3>Editore del sito</h3>
          <p>Il sito <strong>sahelmahel.com</strong> è pubblicato da SahelMahel, Parigi, Francia.</p>
          <p>Contatto: <a href="mailto:contact@sahelmahel.com" style={{ color: ac }}>contact@sahelmahel.com</a></p>
          <h3>Hosting</h3>
          <p>Questo sito è ospitato da un fornitore terzo. Per qualsiasi domanda sull'hosting, contattaci via email.</p>
          <h3>Proprietà intellettuale</h3>
          <p>Tutti i contenuti del sito (testi, immagini, codice) sono proprietà esclusiva di SahelMahel. Qualsiasi riproduzione è vietata senza autorizzazione.</p>
          <h3>Responsabilità</h3>
          <p>SahelMahel si impegna a garantire l'accuratezza delle informazioni pubblicate, ma non può garantirne la completezza o l'attualità.</p>
        </>
      ),
      privacy: (
        <>
          <h3>Dati raccolti</h3>
          <p>Questo sito non raccoglie direttamente <strong>dati personali identificabili</strong> (nome, email, telefono).</p>
          <p>Con il tuo consenso, utilizziamo <strong>Google Analytics 4</strong> per misurare il pubblico in modo anonimo.</p>
          <h3>Cookie</h3>
          <p>Questo sito utilizza cookie tecnici necessari al funzionamento (tema, lingua, cronologia locale) e, con il tuo consenso, cookie analitici tramite Google Analytics.</p>
          <p>Puoi revocare il consenso in qualsiasi momento cliccando su "Cookie" in fondo alla pagina.</p>
          <h3>Conservazione dei dati</h3>
          <p>I dati analitici sono conservati per <strong>13 mesi</strong> secondo le raccomandazioni della CNIL.</p>
          <h3>I tuoi diritti (GDPR)</h3>
          <p>Hai diritto di accesso, rettifica e cancellazione dei tuoi dati. Contatto: <a href="mailto:contact@sahelmahel.com" style={{ color: ac }}>contact@sahelmahel.com</a></p>
          <h3>Titolare del trattamento</h3>
          <p>SahelMahel — Parigi, Francia</p>
        </>
      ),
      cgu: (
        <>
          <h3>Accesso al servizio</h3>
          <p><strong>Chi paga?</strong> è un'app web gratuita per estrarre a sorte chi paga. L'accesso è libero e senza registrazione.</p>
          <h3>Utilizzo</h3>
          <p>L'app è fornita "così com'è" a scopo informativo e ludico. SahelMahel non è responsabile dell'uso fatto dei risultati delle estrazioni.</p>
          <h3>Disponibilità</h3>
          <p>SahelMahel si impegna a garantire la disponibilità del servizio 24/7, senza poter tuttavia garantire un'operatività continua.</p>
          <h3>Proprietà intellettuale</h3>
          <p>Tutti i diritti di proprietà intellettuale sull'applicazione appartengono a SahelMahel. Qualsiasi riproduzione o uso commerciale è vietato senza previo accordo.</p>
          <h3>Legge applicabile</h3>
          <p>Le presenti condizioni sono soggette alla legge francese. Qualsiasi controversia è di competenza dei tribunali francesi.</p>
          <p style={{ opacity: 0.5, fontSize: "11px", marginTop: "16px" }}>Ultimo aggiornamento: giugno {year}</p>
        </>
      ),
    },
    ES: {
      mentions: (
        <>
          <h3>Editor del sitio</h3>
          <p>El sitio <strong>sahelmahel.com</strong> es editado por SahelMahel, París, Francia.</p>
          <p>Contacto: <a href="mailto:contact@sahelmahel.com" style={{ color: ac }}>contact@sahelmahel.com</a></p>
          <h3>Alojamiento</h3>
          <p>Este sitio está alojado por un proveedor externo. Para cualquier pregunta sobre el alojamiento, contáctanos por email.</p>
          <h3>Propiedad intelectual</h3>
          <p>Todos los contenidos del sitio (textos, imágenes, código) son propiedad exclusiva de SahelMahel. Cualquier reproducción está prohibida sin autorización previa.</p>
          <h3>Responsabilidad</h3>
          <p>SahelMahel se esfuerza por garantizar la exactitud de la información publicada, pero no puede garantizar su integridad o actualidad.</p>
        </>
      ),
      privacy: (
        <>
          <h3>Datos recopilados</h3>
          <p>Este sitio no recopila directamente <strong>datos personales identificables</strong> (nombre, email, teléfono).</p>
          <p>Con tu consentimiento, usamos <strong>Google Analytics 4</strong> para medir la audiencia de forma anónima.</p>
          <h3>Cookies</h3>
          <p>Este sitio utiliza cookies técnicas necesarias para su funcionamiento (tema, idioma, historial local) y, con tu consentimiento, cookies analíticas mediante Google Analytics.</p>
          <p>Puedes retirar tu consentimiento en cualquier momento haciendo clic en "Cookies" al pie de la página.</p>
          <h3>Conservación de datos</h3>
          <p>Los datos analíticos se conservan durante <strong>13 meses</strong> según las recomendaciones de la CNIL.</p>
          <h3>Tus derechos (RGPD)</h3>
          <p>Tienes derecho de acceso, rectificación y supresión de tus datos. Contacto: <a href="mailto:contact@sahelmahel.com" style={{ color: ac }}>contact@sahelmahel.com</a></p>
          <h3>Responsable del tratamiento</h3>
          <p>SahelMahel — París, Francia</p>
        </>
      ),
      cgu: (
        <>
          <h3>Acceso al servicio</h3>
          <p><strong>¿Quién paga?</strong> es una aplicación web gratuita para sortear quién paga. El acceso es libre y sin registro.</p>
          <h3>Uso</h3>
          <p>La aplicación se ofrece "tal cual" con fines informativos y lúdicos. SahelMahel no se hace responsable del uso de los resultados de los sorteos.</p>
          <h3>Disponibilidad</h3>
          <p>SahelMahel se esfuerza por garantizar la disponibilidad del servicio 24/7, sin poder garantizar una disponibilidad ininterrumpida.</p>
          <h3>Propiedad intelectual</h3>
          <p>Todos los derechos de propiedad intelectual de la aplicación pertenecen a SahelMahel. Cualquier reproducción o uso comercial está prohibido sin acuerdo previo.</p>
          <h3>Ley aplicable</h3>
          <p>Las presentes condiciones están sujetas a la ley francesa. Cualquier litigio es competencia de los tribunales franceses.</p>
          <p style={{ opacity: 0.5, fontSize: "11px", marginTop: "16px" }}>Última actualización: junio {year}</p>
        </>
      ),
    },
  };
}

export default function LegalModal({ type, onClose, lang, t }: LegalModalProps) {
  if (!type) return null;

  const year = new Date().getFullYear();
  const isArabic = lang === "AR";

  const titles: Record<string, string> = {
    mentions: t.modalMentionsTitle,
    privacy: t.modalPrivacyTitle,
    cgu: t.modalCguTitle,
  };

  // TZM utilise le contenu français
  const contentLang = lang === "TZM" ? "FR" : lang;
  const allContent = buildContent(year);
  const langContent = allContent[contentLang] ?? allContent["FR"];
  const body = langContent[type];

  return (
    <div
      className="legal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={titles[type]}
    >
      <div
        className="legal-modal glass"
        onClick={(e) => e.stopPropagation()}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="plain-text font-bold text-base">{titles[type]}</h2>
          <button
            onClick={onClose}
            className="icon-btn plain-text hover:bg-white/10"
            aria-label="Fermer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="legal-content plain-text">{body}</div>
      </div>
    </div>
  );
}
