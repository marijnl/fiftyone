import { SvgIcon, SvgIconProps } from "@mui/material";

export default function Export(props: SvgIconProps) {
  return (
    <SvgIcon
      width="20"
      height="18"
      viewBox="0 0 20 18"
      {...props}
      sx={{ fill: "none", width: 16, ...(props.sx || {}) }}
    >
      <path
        d="M6.66673 13.1666L10.0001 16.4999M10.0001 16.4999L13.3334 13.1666M10.0001 16.4999V8.99994M17.4001 14.0749C18.1246 13.5655 18.6679 12.8384 18.9511 11.9992C19.2344 11.1601 19.2429 10.2525 18.9754 9.40813C18.7079 8.56381 18.1783 7.82669 17.4635 7.30375C16.7486 6.78081 15.8858 6.49925 15.0001 6.49994H13.9501C13.6994 5.52317 13.2305 4.61598 12.5785 3.84668C11.9265 3.07737 11.1085 2.46599 10.1861 2.05857C9.26363 1.65115 8.26077 1.4583 7.25301 1.49454C6.24524 1.53078 5.25883 1.79517 4.36803 2.2678C3.47723 2.74043 2.70525 3.40898 2.11022 4.22314C1.51519 5.03729 1.11261 5.97582 0.932784 6.96807C0.752958 7.96032 0.800575 8.98044 1.07205 9.95163C1.34352 10.9228 1.83178 11.8198 2.50007 12.5749"
        stroke="currentColor"
        stroke-width="1.67"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
}
