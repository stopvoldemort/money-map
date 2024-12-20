import { useState, useEffect, useRef } from "react";
import { Button, Container, Row, Col, Collapse } from "react-bootstrap";
import { YEARS } from "../../constants";
import { FieldInputProps } from "formik";
import InfoPopover from "../form/InfoPopover";
const YearsInput = (props: FieldInputProps<number[]>) => {
  // Generate the list of years
  const years: number[] = [];
  for (let year = YEARS.START; year <= YEARS.END; year++) {
    years.push(year);
  }

  // State to keep track of selected years
  const [selectedYears, setSelectedYears] = useState<number[]>(props.value || []);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lastClickedYear, setLastClickedYear] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  // Handle toggling of year selection
  const toggleYear = (year: number, event: React.MouseEvent) => {
    setSelectedYears((prevSelectedYears: number[]) => {
      let newSelectedYears = [...prevSelectedYears];
      const isSelected = prevSelectedYears.includes(year);

      if (event.shiftKey && lastClickedYear !== null) {
        const start = Math.min(lastClickedYear, year);
        const end = Math.max(lastClickedYear, year);
        const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);
        newSelectedYears = Array.from(new Set([...newSelectedYears, ...range]));
      } else {
        newSelectedYears = isSelected
          ? newSelectedYears.filter((y) => y !== year)
          : [...newSelectedYears, year];
      }

      // Format as a proper input event object for Formik
      props.onChange({
        type: "change",
        target: {
          type: "input",
          name: props.name,
          value: newSelectedYears,
        },
      });

      return newSelectedYears;
    });

    setLastClickedYear(year);
  };

  // Render the year buttons grouped by half decade
  const renderYearButtons = () => {
    const startDecade = Math.floor(YEARS.START / 5) * 5;
    const endDecade = Math.floor(YEARS.END / 5) * 5;
    const halfDecade: number[][] = [];

    // Generate half decade
    for (
      let decadeStart = startDecade;
      decadeStart <= endDecade;
      decadeStart += 5
    ) {
      const decade = Array.from({ length: 5 }, (_, i) => decadeStart + i);
      halfDecade.push(decade);
    }

    return halfDecade.map((decade, decadeIndex) => (
      <Row key={decadeIndex} className="gx-1" style={{ marginBottom: "2px" }}>
        {
          decade.map((year) => {
            const isSelected = selectedYears.includes(year);
            const isDisabled = year < YEARS.START || year > YEARS.END;
            return (
              <Col
                key={year}
                style={{
                  paddingLeft: "1px",
                  paddingRight: "1px",
                }}
              >
                <Button
                  variant={isSelected ? "primary" : "outline-primary"}
                  onClick={(event) => toggleYear(year, event)}
                  aria-pressed={isSelected}
                  className="w-100 p-0"
                  disabled={isDisabled}
                >
                  {year}
                </Button>
              </Col>
            );
          })
        }
      </Row >
    ));
  };

  const getSummaryText = () => {
    // sort selected years
    const count = selectedYears.length;
    if (count === 0) {
      return "No years selected";
    }
    const sortedSelectedYears = [...selectedYears].sort((a, b) => a - b);
    if (count < 4) {
      return sortedSelectedYears.join(", ");
    }
    // determine if the years are consecutive, and if so, return the range
    const isConsecutive = sortedSelectedYears.every(
      (year, index) => year === sortedSelectedYears[0] + index
    );
    if (isConsecutive) {
      return `${sortedSelectedYears[0]} - ${sortedSelectedYears[sortedSelectedYears.length - 1]
        }`;
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
            backgroundColor: "white",
            border: "1px solid #dee2e6",
          }}
          className="mb-2 year-selector-btn"
          aria-expanded={isExpanded}
          active
        >
          {getSummaryText()} {isExpanded ? "▼" : "▶"}
        </Button>
        <InfoPopover text="Select the years you expect the event to occur. You can select a range of years by holding down the shift key." />
      </div>
      <Collapse in={isExpanded}>
        <div
          className="position-absolute bg-white shadow rounded p-2"
          style={{ zIndex: 1000, width: "300px", left: "0" }}
        >
          <div className="d-flex justify-content-end mb-2">
            <span
              style={{ cursor: "pointer" }}
              className="me-1 text-muted"
              onClick={() => {
                setSelectedYears([]);
                props.onChange({
                  type: "change",
                  target: {
                    type: "input",
                    name: props.name,
                    value: [],
                  },
                });
              }}
            >clear</span>
          </div>
          {renderYearButtons()}
        </div>
      </Collapse>
    </Container>
  );
};

export default YearsInput;
