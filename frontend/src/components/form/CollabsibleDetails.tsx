import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'react-bootstrap-icons';
import { Collapse } from 'react-bootstrap';
import InfoPopover from './InfoPopover';
const CollapsibleDetails = ({ label, mobileLabel, infoText, children }: { label: string, mobileLabel?: string, infoText?: string, children: React.ReactNode }) => {
  const [showDetails, setShowDetails] = useState(false);

  return <div>
    <div
      onClick={() => setShowDetails(!showDetails)}
      role="button"
      className="d-flex align-items-center mb-2"
      style={{ cursor: 'pointer' }}
    >
      {showDetails ? <ChevronDown /> : <ChevronRight />}
      <span className="ms-1 small d-block d-sm-none">{mobileLabel || label}</span>
      <span className="ms-1 small d-none d-sm-block">{label}</span>
      {infoText && (
        <InfoPopover text={infoText} />
      )}
    </div>
    <Collapse in={showDetails}>
      <div>
        {children}
      </div>
    </Collapse>
  </div>
}

export default CollapsibleDetails;
