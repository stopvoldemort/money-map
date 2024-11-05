import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const TextArea = ({ label }: { label: string }) => {
  return (
    <FloatingLabel
      controlId="floatingTextarea"
      label={label}
      className="mb-3"
    >
      <Form.Control as="text" placeholder={label} />
    </FloatingLabel>
  );
}

export default TextArea;