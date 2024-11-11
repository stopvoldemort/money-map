import { useState, useEffect, useRef } from 'react';
import { Button, Container, Row, Col, Collapse } from 'react-bootstrap';
import { YEARS } from '../../constants';
import { FieldInputProps } from 'formik';
const YearGrid = (props: FieldInputProps<number[]>) => {
  // Generate the list of years
  const years: number[] = [];
  for (let year = YEARS.START; year <= YEARS.END; year++) {
    years.push(year);
  }

  // State to keep track of selected years
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  // Handle toggling of year selection
  const toggleYear = (year: number) => {
    setSelectedYears((prevSelectedYears: number[]) => {
      const isSelected = prevSelectedYears.includes(year);
      const newSelectedYears = isSelected
        ? prevSelectedYears.filter((y) => y !== year)
        : [...prevSelectedYears, year];

      // Format as a proper input event object for Formik
      props.onChange({
        type: 'change',
        target: {
          type: 'input',
          name: props.name,
          value: newSelectedYears
        }
      });

      return newSelectedYears;
    });
  };

  // Render the year buttons grouped by decades
  const renderYearButtons = () => {
    const startDecade = Math.floor(YEARS.START / 10) * 10;
    const endDecade = Math.floor(YEARS.END / 10) * 10;
    const decades: number[][] = [];

    // Generate full decades
    for (let decadeStart = startDecade; decadeStart <= endDecade; decadeStart += 10) {
      const decade = Array.from({ length: 10 }, (_, i) => decadeStart + i);
      decades.push(decade);
    }

    return decades.map((decade, decadeIndex) => (
      <Row key={decadeIndex} className="gx-1" style={{ marginBottom: '2px' }}>
        {decade.map((year) => {
          const isSelected = selectedYears.includes(year);
          const isDisabled = year < YEARS.START || year > YEARS.END;
          return (
            <Col key={year} style={{ width: '10%', flex: '0 0 10%', paddingLeft: '1px', paddingRight: '1px' }}>
              <Button
                variant={isSelected ? 'primary' : 'outline-primary'}
                onClick={() => toggleYear(year)}
                aria-pressed={isSelected}
                className="w-100"
                disabled={isDisabled}
              >
                {year}
              </Button>
            </Col>
          );
        })}
      </Row>
    ));
  };

  const getSummaryText = () => {
    // sort selected years
    const count = selectedYears.length;
    if (count === 0) {
      return 'No years selected';
    }
    const sortedSelectedYears = [...selectedYears].sort((a, b) => a - b);
    if (count < 4) {
      return sortedSelectedYears.join(', ');
    }
    // determine if the years are consecutive, and if so, return the range
    const isConsecutive = sortedSelectedYears.every((year, index) => year === sortedSelectedYears[0] + index);
    if (isConsecutive) {
      return `${sortedSelectedYears[0]} - ${sortedSelectedYears[sortedSelectedYears.length - 1]}`;
    }
    return `${count} years selected`;
  };

  return (
    <Container className="position-relative" ref={containerRef}>
      <div className="d-flex justify-content-start">
        <Button
          variant="light"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            backgroundColor: 'white',
            border: '1px solid #dee2e6'
          }}
          className="mb-2 year-selector-btn"
          aria-expanded={isExpanded}
          active
        >
          {getSummaryText()} {isExpanded ? '▼' : '▶'}
        </Button>
      </div>
      <Collapse in={isExpanded}>
        <div
          className="position-absolute bg-white shadow rounded p-2"
          style={{ zIndex: 1000, width: '800px' }}
        >
          {renderYearButtons()}
        </div>
      </Collapse>
    </Container>
  );
};

export default YearGrid;
