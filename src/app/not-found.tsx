import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <style>{`
        @keyframes float-dice {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes shimmer-404 {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fade-up {
          0%   { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .not-found-float  { animation: float-dice 3s ease-in-out infinite; }
        .not-found-shimmer {
          background: linear-gradient(90deg, #7c3aed, #ec4899, #f97316, #ec4899, #7c3aed);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-404 2s linear infinite;
        }
        .not-found-fu1 { animation: fade-up 0.6s ease forwards; }
        .not-found-fu2 { animation: fade-up 0.6s 0.15s ease both; }
        .not-found-fu3 { animation: fade-up 0.6s 0.30s ease both; }
        .not-found-glass {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 14px 40px rgba(0,0,0,0.25);
        }
        .not-found-btn {
          background: linear-gradient(135deg, #7c3aed, #a855f7, #ec4899);
          background-size: 200% 200%;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(168,85,247,0.35);
          display: block;
          text-align: center;
          text-decoration: none;
        }
        .not-found-btn:hover {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(168,85,247,0.55);
        }
        .not-found-btn:active {
          transform: translateY(0) scale(0.98);
        }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: "384px",
          margin: "0 auto",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          textAlign: "center",
        }}
      >
        {/* Dé flottant */}
        <div
          className="not-found-float not-found-fu1"
          style={{ fontSize: "6rem", lineHeight: 1 }}
        >
          🎲
        </div>

        {/* 404 + titre */}
        <div className="not-found-fu2">
          <h1
            className="not-found-shimmer"
            style={{
              fontSize: "6rem",
              lineHeight: 1,
              margin: 0,
              fontWeight: 900,
            }}
          >
            404
          </h1>
          <p
            style={{
              color: "#fff",
              fontWeight: 900,
              fontSize: "1.5rem",
              marginTop: "8px",
            }}
          >
            Page introuvable
          </p>
        </div>

        {/* Carte glass */}
        <div className="not-found-glass not-found-fu2" style={{ borderRadius: "16px", padding: "16px 24px" }}>
          <p style={{ color: "rgba(196,181,253,0.8)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
            On a tiré au sort… et cette page n&apos;a pas été choisie. 😅<br />
            Elle n&apos;existe pas.
          </p>
        </div>

        {/* Bouton retour */}
        <Link
          href="/"
          className="not-found-btn not-found-fu3"
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "16px",
            color: "#fff",
            fontWeight: 900,
            fontSize: "1.125rem",
            letterSpacing: "0.025em",
          }}
        >
          🏠 Retour à l&apos;accueil
        </Link>
      </div>
    </>
  );
}
