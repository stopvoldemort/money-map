import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { Container, Row, Navbar, Nav, Card, Alert, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import ChartComponent from "../components/results/ChartComponent";
import FormComponent from "../components/form/FormComponent";
import NetIncomeChartComponent from "../components/results/NetIncomeChartComponent";
import { NET_WORTH_CHART_TYPE, NET_INCOME_CHART_TYPE, COMPARE_SCENARIOS_CHART_TYPE } from "../constants";
import { ScenarioResults } from "../components/results/shared";
import { Scenario, useScenarioContext } from "../context/scenarioConstants";
import CompareScenariosChartComponent from "../components/results/CompareScenariosChartComponent";
import GettingStartedModal from "../components/getting_started/GettingStartedModal";
import { GettingStartedFormValues } from "../components/getting_started/types";
declare const GIT_VERSION: string;

const ChartAndFormPage: React.FC = () => {
  const [scenarioResults, setScenarioResults] = useState<ScenarioResults[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(true);
  const [chartType, setChartType] = useState(NET_WORTH_CHART_TYPE);
  const { activeScenarioId, scenarios, addScenarioFromGettingStartedForm } = useScenarioContext();

  if (import.meta.env.DEV) {
    console.log(`Using form version ${GIT_VERSION}`)
  }

  const mutation = useMutation({
    mutationFn: async (scenarios: Scenario[]) => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
      setLoading(true);
      console.log("submitting scenarios:", scenarios)
      const { data } = await axios.post(
        `${backendUrl}/api/simulations/run`,
        scenarios
      );
      return data;
    },
    onSuccess: (data: ScenarioResults[]) => {
      if (import.meta.env.DEV) {
        console.log("Response:", data);
      }
      setLoading(false);
      setScenarioResults(data);
      setErrorMessage(null);
    },
    onError: (error: AxiosError) => {
      if (import.meta.env.DEV) {
        console.error("Error making request:", error);
      }
      setLoading(false);
      setErrorMessage("An error occurred while running the simulation.");
    },
  });

  const handleSubmit = () => {
    mutation.mutate(scenarios);
  }

  const handleReset = () => {
    setErrorMessage(null);
    setShowModal(true);
  }

  return (
    <>
      <Navbar>
        <Navbar.Brand><Nav.Link className="mx-2" href="/">My Money Map</Nav.Link></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav.Link className="mx-2" href="#how-it-works">How it works</Nav.Link>
          <Nav.Link className="mx-2" href="#faq">FAQ</Nav.Link>
          <Nav.Link className="mx-2" href="#about-me">About me</Nav.Link>
        </Navbar.Collapse>
      </Navbar>
      <GettingStartedModal
        showModal={showModal}
        setShowModal={setShowModal}
        onSubmit={(gettingStartedFormValues: GettingStartedFormValues) => {
          const newScenarios = addScenarioFromGettingStartedForm(gettingStartedFormValues);
          mutation.mutate(newScenarios);
        }}
      />
      <Row className="my-3">
        <h1>My Money Map</h1>
        <p>A tool to help you understand your finances and plan for the future.</p>
      </Row>
      <Container fluid>
        <div className="d-flex justify-content-center position-relative mt-3">
          <ToggleButtonGroup type="radio" name="options" defaultValue={NET_WORTH_CHART_TYPE} className="mb-2">
            <ToggleButton variant="outline-secondary" id="tbg-radio-1" value={NET_WORTH_CHART_TYPE} onClick={() => setChartType(NET_WORTH_CHART_TYPE)}>
              Net Worth
            </ToggleButton>
            <ToggleButton variant="outline-secondary" id="tbg-radio-2" value={NET_INCOME_CHART_TYPE} onClick={() => setChartType(NET_INCOME_CHART_TYPE)}>
              Cash Flow
            </ToggleButton>
            <ToggleButton variant="outline-secondary" id="tbg-radio-3" value={COMPARE_SCENARIOS_CHART_TYPE} onClick={() => setChartType(COMPARE_SCENARIOS_CHART_TYPE)}>
              Compare Scenarios
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Row style={{ height: "400px" }} className="px-0 mx-0">
          {chartType === NET_WORTH_CHART_TYPE && (
            <ChartComponent data={scenarioResults} activeScenarioId={activeScenarioId} />
          )}
          {chartType === NET_INCOME_CHART_TYPE && (
            <NetIncomeChartComponent data={scenarioResults} activeScenarioId={activeScenarioId} />
          )}
          {chartType === COMPARE_SCENARIOS_CHART_TYPE && (
            <CompareScenariosChartComponent data={scenarioResults} />
          )}
        </Row>
        {
          errorMessage && <Row className="my-3">
            <Alert variant="danger">{errorMessage}</Alert>
          </Row>
        }
        <Row className="my-3">
          <FormComponent
            onSubmit={handleSubmit}
            onReset={handleReset}
            loading={loading}
            activeScenarioId={activeScenarioId}
          />
        </Row>
        <Row className="my-5 mx-1" id="how-it-works">
          <Card className="px-0">
            <Card.Header as="h2">How It Works</Card.Header>
            <Card.Body className="text-start">
              <p>My Money Map helps you visualize your financial future by:</p>
              <ul>
                <li>Projecting retirement savings</li>
                <li>Showing the impact of different saving and investment strategies</li>
                <li>Making it easy to compare different scenarios, like buying a house vs renting</li>
              </ul>
              <p>
                Click to expand the sections above to enter your current financial info and
                assumptions about what your future income and expenses will be.
              </p>
              <p>
                The tool is currently in development. The code is available on <a href="https://github.com/stopvoldemort/money-map" target="_blank" rel="noopener noreferrer">GitHub</a>.
              </p>
              <p>
                Note that I am not a financial planner, and this tool is not intended as financial advice. Use it at your own discretion.
              </p>
            </Card.Body>
          </Card>
        </Row>

        <Row className="my-5 mx-1" id="faq">
          <Card className="px-0">
            <Card.Header as="h2">FAQ</Card.Header>
            <Card.Body className="text-start">
              <b>Question: How do I save my data?</b>
              <br /> Your scenarios are automatically cached in your browser. You can close your browser and come back later, and your scenarios will still be there. You can remove them by clicking the "Reset" button.
              <br /> <br />
              The only exception is if the Money Map tool gets modified to the degree that it will no longer work with your saved scenarios. In that case, your cached scenarios will be automatically discarded, and you'll have to re-enter your data. I'll try to make sure that doesn't happen very often.
              <br /> <br />
              <b>Question: How does this tool handle inflation?</b>
              <br />
              You can ignore inflation when entering your values, unless directed otherwise. My Money Map calculates and displays everything in current dollars. This means, for example, that Money Map will assume that your income and any recurring expenses will grow with inflation.
              <br /> <br />
              <b>Question: How does this tool compare to other financial planning tools?</b>
              <br />
              There are several other tools out there that can help you project your financial future:
              <ul>
                <li><a href="https://projectionlab.com/" target="_blank" rel="noopener noreferrer">Projection Lab</a></li>
                <li><a href="https://maxifiplanner.com/" target="_blank" rel="noopener noreferrer">MaxiFi</a></li>
                <li><a href="https://www.boldin.com/" target="_blank" rel="noopener noreferrer">Boldin</a></li>
              </ul>
              My Money Map is different in a few ways:
              <ul>
                <li>It's free</li>
                <li>It's much simpler than these other tools</li>
                <li>It doesn't require you to link your bank or investment accounts</li>
              </ul>
              One other wonky difference is that Money Map doesn't rely on probabilistic models (e.g. Monte Carlo simulations) to model things like stock market returns,
              but instead uses deterministic calculations.
              In my opinion, trying to assign a probability distribution to our financial future provides a false sense of confidence.
              How can a model account for the likelihood that you or someone in your family will need expensive medical care?
              That your profession will be made obsolete by AI?
              That there will be a global pandemic or a war?
              It is the official view of Money Map that the best we can do is to inform ourselves about what the outcomes <i>would</i> be, given certain assumptions.
            </Card.Body>
          </Card>
        </Row >

        <Row className="my-5 mx-1" id="about-me">
          <Card className="px-0">
            <Card.Header as="h2">About Me</Card.Header>
            <Card.Body className="text-start">
              <Card.Text>
                I'm a software engineer who had some questions about his values (could I afford a home?
                how much should I save for retirement?), but didn't want to hire a financial planner.
                I hope that this tool will mean that you don't have to hire one either.
              </Card.Text>
              <Card.Text>
                Find me on{' '}
                <a href="https://www.linkedin.com/in/david-squires-63957051/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a> or email me at david.squires1@gmail.com.
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container >
    </>
  );
};

export default ChartAndFormPage;
