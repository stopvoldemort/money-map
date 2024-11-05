import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChartComponent from '../components/ChartComponent';
import FormComponent from '../components/FormComponent';

const dummyData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        label: 'Monthly Data',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
}
const ChartAndFormPage: React.FC = () => {
    const [chartData, setChartData] = useState(dummyData);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUpdate = (data: any) => {
        console.log(data);
        setChartData(dummyData);
    };

    return (
        <Container fluid className="px-0">
            <Row>
                <Col md={8} className="form-container">
                    <FormComponent onUpdate={handleUpdate} />
                </Col>
                <Col md={4} className="chart-container">
                    <ChartComponent chartData={chartData} />
                </Col>
            </Row>
        </Container>
    );
};

export default ChartAndFormPage;