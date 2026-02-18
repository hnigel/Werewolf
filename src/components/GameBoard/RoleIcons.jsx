// Role SVG icons keyed by role id (+ 'civilian' for the default zone)

function WerewolfIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Wolf head */}
      {/* Ears */}
      <path d="M5 3L8 10" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 3L16 10" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      {/* Head */}
      <path
        d="M6 11C6 7.5 8.69 6 12 6C15.31 6 18 7.5 18 11V15C18 18.31 15.31 21 12 21C8.69 21 6 18.31 6 15V11Z"
        fill="#ef4444" opacity="0.25"
      />
      <path
        d="M6 11C6 7.5 8.69 6 12 6C15.31 6 18 7.5 18 11V15C18 18.31 15.31 21 12 21C8.69 21 6 18.31 6 15V11Z"
        stroke="#ef4444" strokeWidth="1.5" fill="none"
      />
      {/* Eyes */}
      <circle cx="9.5" cy="12" r="1.2" fill="#fca5a5" />
      <circle cx="14.5" cy="12" r="1.2" fill="#fca5a5" />
      {/* Nose / snout */}
      <ellipse cx="12" cy="16" rx="2" ry="1.2" fill="#ef4444" opacity="0.5" />
      <circle cx="12" cy="15.5" r="0.8" fill="#fca5a5" />
    </svg>
  );
}

function WolfKingIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Crown */}
      <path d="M7 6L9 3L12 5.5L15 3L17 6" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 6H17V8H7V6Z" fill="#f59e0b" opacity="0.4" />
      {/* Wolf head */}
      <path
        d="M6.5 12C6.5 9 8.8 8 12 8C15.2 8 17.5 9 17.5 12V16C17.5 18.76 15.26 21 12 21C8.74 21 6.5 18.76 6.5 16V12Z"
        fill="#ef4444" opacity="0.25"
      />
      <path
        d="M6.5 12C6.5 9 8.8 8 12 8C15.2 8 17.5 9 17.5 12V16C17.5 18.76 15.26 21 12 21C8.74 21 6.5 18.76 6.5 16V12Z"
        stroke="#ef4444" strokeWidth="1.5" fill="none"
      />
      {/* Eyes */}
      <circle cx="9.5" cy="13" r="1.2" fill="#fca5a5" />
      <circle cx="14.5" cy="13" r="1.2" fill="#fca5a5" />
      {/* Nose */}
      <circle cx="12" cy="16.5" r="0.8" fill="#fca5a5" />
    </svg>
  );
}

function WitchIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Hat */}
      <path d="M12 1L7 11H17L12 1Z" fill="#a855f7" opacity="0.35" />
      <path d="M12 1L7 11H17L12 1Z" stroke="#a855f7" strokeWidth="1.3" fill="none" />
      {/* Hat brim */}
      <ellipse cx="12" cy="11.5" rx="7" ry="2" fill="#a855f7" opacity="0.3" />
      <ellipse cx="12" cy="11.5" rx="7" ry="2" stroke="#a855f7" strokeWidth="1.3" fill="none" />
      {/* Face */}
      <circle cx="12" cy="17" r="4.5" fill="#a855f7" opacity="0.15" />
      <circle cx="12" cy="17" r="4.5" stroke="#a855f7" strokeWidth="1.3" fill="none" />
      {/* Eyes */}
      <circle cx="10.5" cy="16.5" r="0.8" fill="#c084fc" />
      <circle cx="13.5" cy="16.5" r="0.8" fill="#c084fc" />
      {/* Smile */}
      <path d="M10.5 18.5Q12 20 13.5 18.5" stroke="#c084fc" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function SeerIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Crystal ball */}
      <circle cx="12" cy="11" r="7.5" fill="#3b82f6" opacity="0.15" />
      <circle cx="12" cy="11" r="7.5" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
      {/* Eye in ball */}
      <path
        d="M7.5 11C7.5 11 9.5 8 12 8C14.5 8 16.5 11 16.5 11C16.5 11 14.5 14 12 14C9.5 14 7.5 11 7.5 11Z"
        fill="#3b82f6" opacity="0.25"
      />
      <path
        d="M7.5 11C7.5 11 9.5 8 12 8C14.5 8 16.5 11 16.5 11C16.5 11 14.5 14 12 14C9.5 14 7.5 11 7.5 11Z"
        stroke="#3b82f6" strokeWidth="1.2" fill="none"
      />
      <circle cx="12" cy="11" r="2" fill="#60a5fa" />
      <circle cx="12" cy="11" r="0.8" fill="#bfdbfe" />
      {/* Base */}
      <path d="M8.5 19H15.5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 18.5V19.5" stroke="#3b82f6" strokeWidth="1" />
      <path d="M14 18.5V19.5" stroke="#3b82f6" strokeWidth="1" />
      <path d="M9.5 16L10 19" stroke="#3b82f6" strokeWidth="1.2" />
      <path d="M14.5 16L14 19" stroke="#3b82f6" strokeWidth="1.2" />
    </svg>
  );
}

function HunterIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Crosshair / target */}
      <circle cx="12" cy="12" r="8" stroke="#f97316" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="4" stroke="#f97316" strokeWidth="1.2" fill="#f97316" fillOpacity="0.15" />
      <circle cx="12" cy="12" r="1.2" fill="#fb923c" />
      {/* Crosshair lines */}
      <line x1="12" y1="2" x2="12" y2="6" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="18" x2="12" y2="22" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="12" x2="6" y2="12" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="12" x2="22" y2="12" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GuardIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Shield */}
      <path
        d="M12 2L4 6V12C4 17.52 7.56 22.12 12 23C16.44 22.12 20 17.52 20 12V6L12 2Z"
        fill="#0ea5e9" opacity="0.2"
      />
      <path
        d="M12 2L4 6V12C4 17.52 7.56 22.12 12 23C16.44 22.12 20 17.52 20 12V6L12 2Z"
        stroke="#0ea5e9" strokeWidth="1.5" fill="none" strokeLinejoin="round"
      />
      {/* Inner chevron */}
      <path d="M12 7L8 9.5V13C8 16 9.8 18.5 12 19.2C14.2 18.5 16 16 16 13V9.5L12 7Z"
        fill="#0ea5e9" opacity="0.2"
      />
      <path d="M12 7L8 9.5V13C8 16 9.8 18.5 12 19.2C14.2 18.5 16 16 16 13V9.5L12 7Z"
        stroke="#38bdf8" strokeWidth="1" fill="none"
      />
    </svg>
  );
}

function IdiotIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Face */}
      <circle cx="12" cy="13" r="8.5" fill="#eab308" opacity="0.15" />
      <circle cx="12" cy="13" r="8.5" stroke="#eab308" strokeWidth="1.5" fill="none" />
      {/* Eyes - one open, one winking */}
      <circle cx="9" cy="11.5" r="1.5" fill="#facc15" />
      {/* Winking eye */}
      <path d="M13 11.5Q14.5 10 16 11.5" stroke="#facc15" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Tongue out */}
      <path d="M9.5 16Q12 19 14.5 16" stroke="#eab308" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M11 17.2Q12 19.5 13 17.2" fill="#facc15" stroke="#eab308" strokeWidth="0.8" />
    </svg>
  );
}

function CupidIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Heart */}
      <path
        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
        fill="#ec4899" opacity="0.25"
      />
      <path
        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
        stroke="#ec4899" strokeWidth="1.5" fill="none"
      />
      {/* Arrow */}
      <line x1="3" y1="5" x2="21" y2="14" stroke="#f9a8d4" strokeWidth="1.3" />
      <path d="M21 14L18 11.5V14.5L21 14Z" fill="#f9a8d4" />
      {/* Arrow feathers */}
      <path d="M3 5L5 3.5" stroke="#f9a8d4" strokeWidth="1" strokeLinecap="round" />
      <path d="M3 5L5 6.5" stroke="#f9a8d4" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function CivilianIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Head */}
      <circle cx="12" cy="8" r="4" fill="#94a3b8" opacity="0.25" />
      <circle cx="12" cy="8" r="4" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
      {/* Body */}
      <path
        d="M5 21V19C5 16.24 7.24 14 10 14H14C16.76 14 19 16.24 19 19V21"
        stroke="#94a3b8" strokeWidth="1.5" fill="none" strokeLinecap="round"
      />
      <path
        d="M5 21V19C5 16.24 7.24 14 10 14H14C16.76 14 19 16.24 19 19V21"
        fill="#94a3b8" opacity="0.15"
      />
    </svg>
  );
}

// Map role id → icon component
const ROLE_ICON_MAP = {
  1: WerewolfIcon,
  2: WolfKingIcon,
  3: WitchIcon,
  4: SeerIcon,
  5: HunterIcon,
  6: GuardIcon,
  7: IdiotIcon,
  8: CupidIcon,
};

export default function RoleIcon({ roleId, size = 20 }) {
  const Icon = ROLE_ICON_MAP[roleId];
  if (!Icon) return null;
  return <Icon size={size} />;
}

export { CivilianIcon };
