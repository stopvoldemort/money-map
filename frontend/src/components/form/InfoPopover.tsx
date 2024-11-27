import { OverlayTrigger, Popover } from 'react-bootstrap';
import { QuestionCircle } from 'react-bootstrap-icons';


const InfoPopover = ({ text }: { text: string }) => {
  return (
    <OverlayTrigger
      placement="auto-end"
      overlay={
        <Popover id="popover-basic">
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
