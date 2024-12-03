import { OverlayTrigger, Popover } from 'react-bootstrap';
import { QuestionCircle } from 'react-bootstrap-icons';


const InfoPopover = ({ text }: { text: string }) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={
        // Fixed position addresses a bootstrap bug where the popover
        // flickers
        <Popover id="popover-basic" style={{ position: "fixed" }}>
          <Popover.Body>
            {text}
          </Popover.Body>
        </Popover>
      }
    >
      <QuestionCircle className="ms-2" />
    </OverlayTrigger>
  );
};

export default InfoPopover;
