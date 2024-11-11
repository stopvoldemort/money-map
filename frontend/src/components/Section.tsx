import React from 'react';
import { Accordion } from 'react-bootstrap';

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <Accordion.Item eventKey={title} >
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body>
        {children}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Section;
