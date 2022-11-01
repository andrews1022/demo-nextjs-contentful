// styled components
import * as S from "./Footer.styles";

const Footer = () => (
  <S.Footer>
    <p>
      &copy; {new Date().getFullYear()} all rights reserved <span> | </span> designed and built by
      andrew shearer
    </p>
  </S.Footer>
);

export default Footer;
