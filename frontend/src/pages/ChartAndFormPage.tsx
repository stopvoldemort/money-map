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
declare const FORM_VERSION: string;

const ChartAndFormPage: React.FC = () => {
  const [scenarioResults, setScenarioResults] = useState<ScenarioResults[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(true);
  const [chartType, setChartType] = useState(NET_WORTH_CHART_TYPE);
  const { activeScenarioId, scenarios, addScenarioFromGettingStartedForm } = useScenarioContext();

  if (import.meta.env.DEV) {
    console.log(`Using form version ${FORM_VERSION}`)
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

  return (
    <>
      <Navbar>
        <Navbar.Brand><Nav.Link href="/">My Money Map</Nav.Link></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav.Link className="mx-2" href="#how-it-works">How it works</Nav.Link>
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
              Net Income (Beta)
            </ToggleButton>
            <ToggleButton variant="outline-secondary" id="tbg-radio-3" value={COMPARE_SCENARIOS_CHART_TYPE} onClick={() => setChartType(COMPARE_SCENARIOS_CHART_TYPE)}>
              Compare Scenarios
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Row style={{ height: "400px", marginLeft: "-3rem", marginRight: "-3rem" }}>
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
            loading={loading}
            activeScenarioId={activeScenarioId}
          />
        </Row>
        <Row className="my-5" id="how-it-works">
          <Card className="px-0">
            <Card.Header as="h2">How It Works</Card.Header>
            <Card.Body className="text-start">
              <p>My Money Map helps you visualize your financial future by:</p>
              <ul>
                <li>Simulating investment growth across different account types</li>
                <li>Projecting retirement savings</li>
                <li>Showing the impact of different saving and investment strategies</li>
                <li>Comparing debt payoff schedules</li>
              </ul>
              <p>
                Click to expand the sections above to enter your current financial info and
                assumptions about what your future income and expenses will be. Note that:
              </p>
              <ul>
                <li><strong>Nothing you enter here will be saved</strong>, either by Money Map or even in your browser.</li>
                <li>You can ignore inflation when entering your values, unless directed otherwise. My Money Map calculates everything in current dollars. This means, for example, that Money Map will assume that your income and any recurring expenses will grow with inflation.</li>
                <li>My Money Map accounts for taxes.</li>
              </ul>
              <p>
                The tool is currently in development. The code is available on <a href="https://github.com/stopvoldemort/money-map" target="_blank" rel="noopener noreferrer">GitHub</a>.
              </p>
            </Card.Body>
          </Card>
        </Row>

        <Row className="my-5" id="about-me">
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
