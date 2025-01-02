import React from 'react';
import { Accordion } from 'react-bootstrap';
import InfoPopover from './InfoPopover';

const CustomHeader = ({ title, summary, infoText }: { title: string, summary?: string, infoText?: string }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <div>
        {title}
        {infoText && (<InfoPopover text={infoText} />)}
      </div>
      {summary && <span className="text-muted text-end mx-3">{summary}</span>}
    </div>
  )
}

const Section = ({ title, summary, infoText, children }: { title: string, summary?: string, infoText?: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Accordion.Item eventKey={title}>
      <Accordion.Header onClick={() => setIsOpen(!isOpen)}>
        <CustomHeader title={title} summary={summary} infoText={infoText} />
      </Accordion.Header>
      <Accordion.Body>
        {isOpen && children}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Section;
