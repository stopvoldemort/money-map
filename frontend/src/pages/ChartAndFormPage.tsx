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
  const [formKey, setFormKey] = useState(0);

  const values = useMemo(() => {
    let values = initialValues;
    const savedFormJSON = localStorage.getItem(FORM_VERSION)
    if (savedFormJSON) {
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
          onClear={handleClearForm}
        />
      </Row>
    </Container >
  );
};

export default ChartAndFormPage;
