import { css } from "styled-components";

export const sizes = {
  mobile: 767,
  tablet: 899,
  smallDesktop: 1199,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export default media;
