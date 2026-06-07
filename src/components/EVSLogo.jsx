export default function EVSLogo({ size = 48, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer arc top */}
      <path d="M15 50 A35 35 0 0 1 85 50" stroke="#8B6914" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* Outer arc bottom */}
      <path d="M20 58 A32 32 0 0 0 80 58" stroke="#8B6914" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* Inner arc top */}
      <path d="M20 50 A30 30 0 0 1 80 50" stroke="#C4972A" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Inner arc bottom */}
      <path d="M24 57 A28 28 0 0 0 76 57" stroke="#C4972A" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Flower petals */}
      <ellipse cx="50" cy="30" rx="5" ry="9" fill="#C4972A" transform="rotate(0 50 30)" />
      <ellipse cx="50" cy="30" rx="5" ry="9" fill="#A07720" transform="rotate(-25 50 42)" />
      <ellipse cx="50" cy="30" rx="5" ry="9" fill="#A07720" transform="rotate(25 50 42)" />
      <ellipse cx="50" cy="30" rx="4" ry="8" fill="#8B6914" transform="rotate(-45 50 45)" />
      <ellipse cx="50" cy="30" rx="4" ry="8" fill="#8B6914" transform="rotate(45 50 45)" />
      {/* EVS text */}
      <text
        x="50"
        y="56"
        textAnchor="middle"
        fontFamily="Open Sans"
        fontSize="15"
        fontWeight="bold"
        fill="#2C1810"
        letterSpacing="1"
      >
        EVS
      </text>
    </svg>
  );
}
