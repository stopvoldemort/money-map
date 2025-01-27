import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import GettingStartedForm from "./GettingStartedForm";
import { GettingStartedFormValues } from "./types";

const INTRO_PAGE = "intro"
const FORM_PAGE = "form"

const GettingStartedModal = ({ showModal, setShowModal, onSubmit }: { showModal: boolean, setShowModal: (show: boolean) => void, onSubmit: (values: GettingStartedFormValues) => void }) => {
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
              <li>How would buying a house affect when I can retire?</li>
            </ul>
            <b>MONEY MAP WILL NEVER STORE OR SELL YOUR DATA.</b> This is an open and free tool.
            <br /><br />
            It'll help to know a few things about your household, in order to fill out the tool with some default values.
            Click "Get started" to answer a couple questions.
            <br /><br />
            Or click "Skip" to go straight to the tool.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Skip</Button>
            <Button variant="primary" onClick={() => setPage(FORM_PAGE)}>Get started</Button>
          </Modal.Footer>
        </>
      }
      {page === FORM_PAGE && <GettingStartedForm closeModal={closeModal} onSubmit={onSubmit} />}
    </Modal>
  )
}

export default GettingStartedModal;