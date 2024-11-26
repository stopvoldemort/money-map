import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ChartComponent, { NetWorthChartData } from "../components/results/ChartComponent";
import FormComponent from "../components/form/FormComponent";
import { FormValuesType } from "../components/form/types";


const ChartAndFormPage: React.FC = () => {
  const [chartData, setChartData] = useState<NetWorthChartData[]>([]);

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
    mutation.mutate(formData);
  };

  return (
    <Container fluid className="px-0">
      <Row>
        <Col md={8} className="form-container">
          <FormComponent
            onUpdate={handleUpdate}
          />
        </Col>
        <Col md={4} className="chart-container">
          <ChartComponent
            data={chartData}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ChartAndFormPage;
