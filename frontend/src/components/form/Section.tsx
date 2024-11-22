import React from 'react';
import { Accordion, OverlayTrigger, Popover } from 'react-bootstrap';
import { QuestionCircle } from 'react-bootstrap-icons';


const Section = ({ title, infoText, children }: { title: string, infoText?: string, children: React.ReactNode }) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        {infoText}
      </Popover.Body>
    </Popover>
  );

  return (
    <Accordion.Item eventKey={title} >
      <Accordion.Header>
        {title}
        {infoText && (
          <OverlayTrigger
            placement="right"
            overlay={popover}
          >
            <QuestionCircle className="ms-2" />
          </OverlayTrigger>
        )}
      </Accordion.Header>
      <Accordion.Body>
        {children}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Section;
