import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../contexts/AuthContext';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuthContext();
  return (
    <Navbar className="bg-white">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {(auth.user) ? <Button variant="outline-primary" onClick={() => auth.signOut()}>{t('header.signOut')}</Button> : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
