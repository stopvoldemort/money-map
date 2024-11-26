import React from 'react';
import { Accordion } from 'react-bootstrap';
import InfoPopover from './InfoPopover';


const Section = ({ title, infoText, children }: { title: string, infoText?: string, children: React.ReactNode }) => {
  return (
    <Accordion.Item eventKey={title} >
      <Accordion.Header>
        {title}
        {infoText && (<InfoPopover text={infoText} />)}
      </Accordion.Header>
      <Accordion.Body>
        {children}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Section;
