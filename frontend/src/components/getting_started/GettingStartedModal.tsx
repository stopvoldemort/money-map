import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import GettingStartedForm from "./GettingStartedForm";

const INTRO_PAGE = "intro"
const FORM_PAGE = "form"

const GettingStartedModal = ({ showModal, setShowModal }: { showModal: boolean, setShowModal: (show: boolean) => void }) => {
  const [page, setPage] = useState(INTRO_PAGE);
  const closeModal = () => {
    setShowModal(false);
  }
  return (
    <Modal show={showModal} onHide={closeModal} size="lg">
      <Modal.Header>
        <Modal.Title>Getting started</Modal.Title>
      </Modal.Header>
      {page === INTRO_PAGE &&
        <>
          <Modal.Body>
            Welcome to My Money Map! This tool helps you calculate your financial trajectory, and answer questions like:
            <ul>
              <li>How much should I save for retirement?</li>
              <li>How much should I save for my kids' education?</li>
              <li>Can I afford to buy a house?</li>
            </ul>
            Note: MONEY MAP DOES NOT SAVE OR SELL YOUR DATA. This is an open and free tool.
            <br /><br />
            To get started, it'll help to know a few things about your household, which will allow us to pre-populate the tool with some default values.
            Click "Get started" to answer a couple questions.
            <br /><br />
            If you'd like to skip these questions, and go straight to the tool, you can do so by clicking "Skip".
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Skip</Button>
            <Button variant="primary" onClick={() => setPage(FORM_PAGE)}>Get started</Button>
          </Modal.Footer>
        </>
      }
      {page === FORM_PAGE && <GettingStartedForm closeModal={closeModal} />}
    </Modal>
  )
}

export default GettingStartedModal;