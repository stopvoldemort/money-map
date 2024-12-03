import React from 'react';
import { Accordion } from 'react-bootstrap';
import InfoPopover from './InfoPopover';

const Section = ({ title, infoText, children }: { title: string, infoText?: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Accordion.Item eventKey={title}>
      <Accordion.Header onClick={() => setIsOpen(!isOpen)}>
        {title}
        {infoText && (<InfoPopover text={infoText} />)}
      </Accordion.Header>
      <Accordion.Body>
        {isOpen && children}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Section;
