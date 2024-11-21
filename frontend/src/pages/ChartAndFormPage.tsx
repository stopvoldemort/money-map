import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ChartComponent from "../components/results/ChartComponent";
import FormComponent from "../components/form/FormComponent";
import { default_response } from "../../default_response";

const ChartAndFormPage: React.FC = () => {
  const [chartData, setChartData] = useState(default_response);

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
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
    onSuccess: (data: any) => {
      console.log("Response:", data);
      setChartData(data);
    },
    onError: (error: any) => {
      console.error("Error making request:", error);
    },
  });

  const handleUpdate = (formData: any) => {
    console.log("Form Data:", formData);
    mutation.mutate(formData);
  };

  return (
    <Container fluid className="px-0">
      <Row>
        <Col md={8} className="form-container">
          <FormComponent
            onUpdate={handleUpdate}
            // isLoading={mutation.isPending}
          />
        </Col>
        <Col md={4} className="chart-container">
          <ChartComponent data={chartData} />
        </Col>
      </Row>
    </Container>
  );
};

export default ChartAndFormPage;
