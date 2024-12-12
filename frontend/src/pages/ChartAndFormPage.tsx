import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Navbar, Nav, Card } from "react-bootstrap";
import ChartComponent, { NetWorthChartData } from "../components/results/ChartComponent";
import FormComponent from "../components/form/FormComponent";
import { FormValuesType } from "../components/form/types";
import { initialValues } from "../components/form/initialValues";
declare const FORM_VERSION: string;

const ChartAndFormPage: React.FC = () => {
  const [chartData, setChartData] = useState<NetWorthChartData[]>([]);
  const [formKey, setFormKey] = useState(0);

  const values = useMemo(() => {
    let values = initialValues;
    const savedFormJSON = localStorage.getItem(FORM_VERSION)
    if (savedFormJSON && FORM_VERSION !== "dev") {
      console.log("Using saved values")
      values = JSON.parse(savedFormJSON)
    }
    return values;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formKey]); // We pass the formKey as a dependency so that changing it triggers a re-render

  const mutation = useMutation({
    mutationFn: async (formData: FormValuesType) => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "";
      if (backendUrl === "") {
        console.log("VITE_BACKEND_URL is not set");
        console.log("FRONTEND ENV:", import.meta.env);
      }
      const { data } = await axios.post(
        `${backendUrl}/api/simulations/run`,
        formData
      );
      return data;
    },
    onSuccess: (data: NetWorthChartData[]) => {
      console.log("Response:", data);
      setChartData(data);
    },
    onError: (error: AxiosError) => {
      console.error("Error making request:", error);
    },
  });

  const handleUpdate = (formData: FormValuesType) => {
    console.log("Form Data:", formData);
    localStorage.setItem(FORM_VERSION, JSON.stringify(formData));
    mutation.mutate(formData);
  };

  const handleClearForm = () => {
    localStorage.removeItem(FORM_VERSION);
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
      <Row className="my-5">
        <h1>My Money Map</h1>
        <p>A tool to help you understand your finances and plan for the future.</p>
      </Row>
      <Container fluid>
        <Row className="my-5" style={{ height: "400px" }}>
          <ChartComponent
            data={chartData}
          />
        </Row>
        <Row className="my-5">
          <FormComponent
            key={formKey}
            initialValues={values}
            onUpdate={handleUpdate}
            onClear={handleClearForm}
          />
        </Row>
        <Row className="my-5" id="how-it-works">
          <Card>
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
                assumptions about what your future income and expenses will be.
                Nothing you enter here will be saved.
              </p>
              <p>
                The tool is currently in development. The code is available on <a href="https://github.com/stopvoldemort/money-map" target="_blank" rel="noopener noreferrer">GitHub</a>.
              </p>
            </Card.Body>
          </Card>
        </Row>

        <Row className="my-5" id="about-me">
          <Card>
            <Card.Header as="h2">About Me</Card.Header>
            <Card.Body className="text-start">
              <Card.Text>
                I'm a software engineer who had some questions about his finances (could I afford a home?
                how much should I save for retirement?), but didn't want to hire a financial planner.
                I hope that this tool will mean that you don't have to hire one either.
              </Card.Text>
              <Card.Text>
                (Nothing against financial planners.)
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
