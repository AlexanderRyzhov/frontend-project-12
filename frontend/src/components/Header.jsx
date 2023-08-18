import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../contexts/AuthContext';
import routes from '../routes';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuthContext();
  return (
    <Navbar className="bg-white">
      <Container>
        <Navbar.Brand as={Link} to={routes.rootPage()}>Hexlet Chat</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {(auth.user) ? <Button variant="outline-primary" onClick={() => auth.signOut()}>{t('header.signOut')}</Button> : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
