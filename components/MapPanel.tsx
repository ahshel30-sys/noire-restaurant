import { ExternalLink, MapPin } from "lucide-react";
import { site } from "@/lib/content";

const mapHref = `https://www.openstreetmap.org/?mlat=${site.coordinates.lat}&mlon=${site.coordinates.lng}#map=16/${site.coordinates.lat}/${site.coordinates.lng}`;

export default function MapPanel() {
  return (
    <div className="map-panel" data-reveal>
      <div className="map-panel__canvas">
        <svg
          className="map"
          viewBox="0 0 1200 520"
          role="img"
          aria-labelledby="map-title map-desc"
          preserveAspectRatio="xMidYMid slice"
        >
          <title id="map-title">Illustrative map of the NOIRÉ demo location in Zamalek, Cairo</title>
          <desc id="map-desc">
            A stylised map showing the Nile, the island of Zamalek and the fictional NOIRÉ location
            at 12 Corniche El Nil. This is an illustration, not a live map.
          </desc>

          <rect width="1200" height="520" fill="#0d0b08" />

          <g className="map__grid" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => (
              <line key={`v-${index}`} x1={index * 72} y1="0" x2={index * 72} y2="520" />
            ))}
            {Array.from({ length: 8 }, (_, index) => (
              <line key={`h-${index}`} x1="0" y1={index * 72} x2="1200" y2={index * 72} />
            ))}
          </g>

          <g className="map__river" aria-hidden="true">
            <path
              d="M-40 80 C130 120 150 230 270 280 C390 330 340 440 430 560 L-40 560 Z"
              fill="#0a1112"
            />
            <path
              d="M1240 30 C1080 110 1120 200 1010 260 C900 320 960 420 880 560 L1240 560 Z"
              fill="#0a1112"
            />
            <path
              d="M-20 110 C130 150 150 240 280 300 C390 352 350 450 430 550"
              fill="none"
              stroke="#22302e"
              strokeWidth="1"
            />
            <path
              d="M1220 60 C1090 120 1120 210 1015 270 C930 320 965 430 900 550"
              fill="none"
              stroke="#22302e"
              strokeWidth="1"
            />
          </g>

          <g className="map__island" aria-hidden="true">
            <path
              d="M310 40 C440 10 700 10 850 70 C980 122 1000 230 920 310 C840 390 700 430 550 420 C400 410 300 350 280 240 C265 160 270 70 310 40 Z"
              fill="#12100c"
              stroke="#3a3021"
              strokeWidth="1"
            />
            <path
              d="M330 70 C460 42 680 42 820 96 C930 140 950 232 880 300 C800 376 680 402 550 394 C420 386 330 334 310 242 C296 166 300 96 330 70 Z"
              fill="none"
              stroke="#4a3b26"
              strokeWidth="0.6"
              strokeDasharray="3 7"
            />
          </g>

          <g className="map__roads" aria-hidden="true">
            <path d="M160 520 C280 430 340 350 430 300 C540 240 690 240 820 200 C950 160 1030 120 1120 30" />
            <path d="M300 470 C430 410 520 360 620 320 C740 270 860 270 980 230" />
            <path d="M420 500 C480 430 520 380 600 340 C690 295 790 300 900 260" />
            <path d="M520 450 C570 400 620 360 700 330 C790 296 880 300 980 270" />
            <path d="M250 380 C350 350 430 310 500 260 C580 202 660 180 760 160" />
            <path d="M430 160 C500 200 540 250 570 320 C600 390 600 450 580 510" />
            <path d="M650 140 C700 200 710 250 710 320 C710 390 680 460 660 520" />
            <path d="M840 130 C860 200 840 270 800 330 C760 390 730 450 720 520" />
          </g>

          <g className="map__blocks" aria-hidden="true">
            <rect x="470" y="120" width="70" height="46" rx="1" />
            <rect x="560" y="96" width="52" height="68" rx="1" />
            <rect x="640" y="150" width="44" height="52" rx="1" />
            <rect x="500" y="230" width="60" height="40" rx="1" />
            <rect x="590" y="220" width="44" height="60" rx="1" />
            <rect x="680" y="250" width="66" height="44" rx="1" />
            <rect x="760" y="180" width="50" height="50" rx="1" />
            <rect x="380" y="280" width="44" height="40" rx="1" />
            <rect x="440" y="340" width="52" height="38" rx="1" />
            <rect x="820" y="300" width="48" height="42" rx="1" />
          </g>

          <g className="map__labels" aria-hidden="true">
            <text x="86" y="300" transform="rotate(-78 86 300)" className="map__label map__label--water">
              The Nile
            </text>
            <text x="1104" y="220" transform="rotate(78 1104 220)" className="map__label map__label--water">
              The Nile
            </text>
            <text x="560" y="60" className="map__label map__label--place">
              Zamalek
            </text>
            <text x="430" y="470" className="map__label map__label--small">
              Corniche El Nil
            </text>
            <text x="740" y="118" className="map__label map__label--small">
              El Nil Street
            </text>
            <text x="90" y="478" className="map__label map__label--small">
              30.0601° N · 31.2204° E
            </text>
          </g>

          <g className="map__marker" transform="translate(600 275)" aria-hidden="true">
            <circle className="map__pulse" r="38" fill="none" stroke="#c9a96e" strokeWidth="1" />
            <circle r="17" fill="none" stroke="#c9a96e" strokeWidth="0.8" opacity="0.6" />
            <circle r="4.5" fill="#c9a96e" />
            <path d="M0 -17 L5 -7 L0 0 L-5 -7 Z" fill="#0d0b08" stroke="#c9a96e" strokeWidth="0.8" />
            <text x="0" y="-52" textAnchor="middle" className="map__label map__label--noire">
              NOIRÉ
            </text>
          </g>

          <g className="map__compass" transform="translate(1100 432)" aria-hidden="true">
            <circle r="26" fill="none" stroke="#4a3b26" strokeWidth="0.8" />
            <path d="M0 -20 L5 4 L0 0 L-5 4 Z" fill="#c9a96e" />
            <text x="0" y="-32" textAnchor="middle" className="map__label map__label--small">
              N
            </text>
          </g>
        </svg>

        <div className="map-panel__tag">
          <span>Illustrative map</span>
          <span>Demo location</span>
        </div>

        <div className="map-panel__card">
          <p className="eyebrow eyebrow--champagne">Find us</p>
          <p className="map-panel__address">
            <MapPin size={15} strokeWidth={1.3} aria-hidden="true" />
            <span>
              {site.address.line1}, {site.address.line2}
            </span>
          </p>
          <a className="text-link" href={mapHref} target="_blank" rel="noreferrer">
            Open in OpenStreetMap
            <ExternalLink size={13} strokeWidth={1.4} aria-hidden="true" />
          </a>
        </div>
      </div>
      <p className="map-panel__note">
        <span>This is a fictional location and an illustrated map — not a live map.</span>
        <span>Coordinates 30.0601° N, 31.2204° E</span>
      </p>
    </div>
  );
}
