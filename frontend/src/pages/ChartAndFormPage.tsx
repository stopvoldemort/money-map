import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChartComponent from '../components/ChartComponent';
import FormComponent from '../components/FormComponent';
import { default_response } from '../../default_response';

const ChartAndFormPage: React.FC = () => {
    const [chartData, setChartData] = useState(default_response);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUpdate = (formData: any) => {
        console.log("Form Data:", formData);
        fetch('/api/simulations/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("Response Data: ", responseData)
                setChartData(responseData);
            })
    };

    return (
        <Container fluid className="px-0">
            <Row>
                <Col md={8} className="form-container">
                    <FormComponent onUpdate={handleUpdate} />
                </Col>
                <Col md={4} className="chart-container">
                    <ChartComponent data={chartData} />
                </Col>
            </Row>
        </Container>
    );
};

export default ChartAndFormPage;