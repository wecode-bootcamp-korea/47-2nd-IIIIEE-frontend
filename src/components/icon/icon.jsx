import icon from './icon';

const Icon = name => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1_6045)">
        <path d={icon[name]} fill="#1A1A1A" />
      </g>
      <defs>
        <clipPath id="clip0_1_6045">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Icon;
