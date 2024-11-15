import { Container } from 'react-bootstrap';

const FieldsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container className="p-3 mb-3 bg-light rounded position-relative" style={{ border: '1px solid #dee2e6' }}>
      {children}
    </Container>
  );
};

export default FieldsContainer;
