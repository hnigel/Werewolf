export function AntidoteIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Bottle cap */}
      <rect x="9" y="2" width="6" height="3" rx="1" fill="#16a34a" />
      {/* Bottle neck */}
      <rect x="10" y="5" width="4" height="3" fill="#16a34a" opacity="0.8" />
      {/* Bottle body */}
      <path
        d="M7 10C7 8.9 7.9 8 9 8H15C16.1 8 17 8.9 17 10V19C17 20.66 15.66 22 14 22H10C8.34 22 7 20.66 7 19V10Z"
        fill="#16a34a"
        opacity="0.3"
      />
      <path
        d="M7 10C7 8.9 7.9 8 9 8H15C16.1 8 17 8.9 17 10V19C17 20.66 15.66 22 14 22H10C8.34 22 7 20.66 7 19V10Z"
        stroke="#16a34a"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Cross symbol */}
      <rect x="11" y="12" width="2" height="7" rx="0.5" fill="#4ade80" />
      <rect x="9" y="14" width="6" height="2" rx="0.5" fill="#4ade80" />
    </svg>
  );
}

export function PoisonIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Skull */}
      <path
        d="M12 3C8.13 3 5 6.13 5 9.5C5 12.1 6.6 14.3 8.88 15.2V17C8.88 17.55 9.33 18 9.88 18H14.12C14.67 18 15.12 17.55 15.12 17V15.2C17.4 14.3 19 12.1 19 9.5C19 6.13 15.87 3 12 3Z"
        fill="#9333ea"
        opacity="0.3"
      />
      <path
        d="M12 3C8.13 3 5 6.13 5 9.5C5 12.1 6.6 14.3 8.88 15.2V17C8.88 17.55 9.33 18 9.88 18H14.12C14.67 18 15.12 17.55 15.12 17V15.2C17.4 14.3 19 12.1 19 9.5C19 6.13 15.87 3 12 3Z"
        stroke="#9333ea"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Eyes */}
      <circle cx="9.5" cy="9.5" r="1.5" fill="#c084fc" />
      <circle cx="14.5" cy="9.5" r="1.5" fill="#c084fc" />
      {/* Jaw */}
      <rect x="9.5" y="18" width="1.5" height="3" rx="0.5" fill="#9333ea" />
      <rect x="13" y="18" width="1.5" height="3" rx="0.5" fill="#9333ea" />
    </svg>
  );
}
