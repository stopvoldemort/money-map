import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'react-bootstrap-icons';
import { Collapse } from 'react-bootstrap';

const CollapsibleDetails = ({ label, children }: { label: string, children: React.ReactNode }) => {
  const [showDetails, setShowDetails] = useState(false);

  return <div>
    <div
      onClick={() => setShowDetails(!showDetails)}
      role="button"
      className="d-flex align-items-center mb-2"
      style={{ cursor: 'pointer' }}
    >
      {showDetails ? <ChevronDown /> : <ChevronRight />}
      <span className="ms-1 small">{label}</span>
    </div>
    <Collapse in={showDetails}>
      <div>
        {children}
      </div>
    </Collapse>
  </div>
}

export default CollapsibleDetails;
