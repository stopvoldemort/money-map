import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Navbar, Nav, Card, Alert, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import ChartComponent from "../components/results/ChartComponent";
import FormComponent from "../components/form/FormComponent";
import { FormValuesType } from "../components/form/types";
import { initialValues } from "../components/form/initialValues";
import NetIncomeChartComponent from "../components/results/NetIncomeChartComponent";
import { NET_WORTH_CHART_TYPE, NET_INCOME_CHART_TYPE } from "../constants";
import { dummyNetIncomeValues } from "../components/results/dummyNetIncomeValues";
import { ChartData } from "../components/results/shared";
declare const FORM_VERSION: string;



const ChartAndFormPage: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [chartType, setChartType] = useState(NET_WORTH_CHART_TYPE);
  if (import.meta.env.DEV) {
    console.log(`Using form version ${FORM_VERSION}`)
  }

  const values = useMemo(() => {
    return initialValues
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formKey]); // We pass the formKey as a dependency so that changing it triggers a re-render

  const mutation = useMutation({
    mutationFn: async (formData: FormValuesType) => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
      setLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/simulations/run`,
        formData
      );
      return data;
    },
    onSuccess: (data: ChartData[]) => {
      if (import.meta.env.DEV) {
        console.log("Response:", data);
      }
      setLoading(false);
      setChartData(data);
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

  const handleUpdate = (formData: FormValuesType) => {
    if (import.meta.env.DEV) {
      console.log("Form Data:", formData);
    }
    mutation.mutate(formData);
  };

  const handleClearForm = () => {
    setFormKey(prev => prev + 1);
    handleUpdate(initialValues);
  };

  useEffect(() => {
    handleUpdate(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Row className="my-3">
        <h1>My Money Map</h1>
        <p>A tool to help you understand your finances and plan for the future.</p>
      </Row>
      <Container fluid>
        <ToggleButtonGroup type="radio" name="options" defaultValue={NET_WORTH_CHART_TYPE} className="mb-2">
          <ToggleButton variant="outline-primary" id="tbg-radio-1" value={NET_WORTH_CHART_TYPE} name="Net Worth" onClick={() => setChartType(NET_WORTH_CHART_TYPE)}>
            Net Worth
          </ToggleButton>
          <ToggleButton variant="outline-primary" id="tbg-radio-2" value={NET_INCOME_CHART_TYPE} name="Net Income" onClick={() => setChartType(NET_INCOME_CHART_TYPE)}>
            Net Income
          </ToggleButton>
        </ToggleButtonGroup>
        <Row style={{ height: "400px", marginLeft: "-3rem", marginRight: "-3rem" }}>
          {chartType === NET_WORTH_CHART_TYPE && (
            <ChartComponent
              data={chartData}
            />
          )}
          {chartType === NET_INCOME_CHART_TYPE && (
            <NetIncomeChartComponent
              // data={chartData}
              data={dummyNetIncomeValues}
            />
          )}
        </Row>
        {errorMessage && <Row className="my-3">
          <Alert variant="danger">{errorMessage}</Alert>
        </Row>}
        <Row className="my-3">
          <FormComponent
            key={formKey}
            initialValues={values}
            onUpdate={handleUpdate}
            onClear={handleClearForm}
            loading={loading}
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
                I'm a software engineer who had some questions about his finances (could I afford a home?
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
