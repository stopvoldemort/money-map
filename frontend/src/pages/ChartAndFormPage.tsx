import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { Container, Row } from "react-bootstrap";
import ChartComponent, { NetWorthChartData } from "../components/results/ChartComponent";
import FormComponent from "../components/form/FormComponent";
import { FormValuesType } from "../components/form/types";
import { initialValues } from "../components/form/initialValues";
declare const FORM_VERSION: string;

const ChartAndFormPage: React.FC = () => {
  const [chartData, setChartData] = useState<NetWorthChartData[]>([]);

  const values = useMemo(() => {
    let values = initialValues;
    const savedFormJSON = localStorage.getItem(FORM_VERSION)
    if (savedFormJSON) {
      console.log("Using saved values")
      values = JSON.parse(savedFormJSON)
    }
    return values;
  }, []);

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

  useEffect(() => {
    handleUpdate(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid>
      <Row className="my-5" style={{ height: "400px" }}>
        <ChartComponent
          data={chartData}
        />
      </Row>
      <Row className="my-5">
        <FormComponent
          initialValues={values}
          onUpdate={handleUpdate}
        />
      </Row>
    </Container >
  );
};

export default ChartAndFormPage;
