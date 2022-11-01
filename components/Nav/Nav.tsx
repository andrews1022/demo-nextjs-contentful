import Link from "next/link";

// styled components
import * as S from "./Nav.styles";

const Nav = () => (
  <S.Header>
    <nav className="nav">
      <ul>
        <li>
          <Link href="/">Next.js Contentful Blog</Link>
        </li>
      </ul>
    </nav>
  </S.Header>
);

export default Nav;
