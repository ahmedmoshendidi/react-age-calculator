import React from "react";
import Form from "../components/Form";
export default function App() {
  const [date, setDate] = React.useState({
    day: "",
    month: "",
    year: "",
  });

  const currentYear = new Date().getFullYear();

  const [error, setError] = React.useState({
    errorDay: false,
    errorMonth: false,
    errorYear: false,
    errorDate: false,
  });

  function handleErrors() {
    setError({
      errorDay: false,
      errorMonth: false,
      errorYear: false,
      errorDate: false,
    });
    if (!date.day || date.day > 31 || date.day < 1) {
      setError((prevData) => {
        return {
          ...prevData,
          errorDay: true,
          errorDate: true,
        };
      });
    }

    if (!date.month || date.month > 12 || date.month < 1) {
      setError((prevData) => {
        return {
          ...prevData,
          errorMonth: true,
          errorDate: true,
        };
      });
    }

    if (!date.year || date.year > currentYear || date.year < -1) {
      setError((prevData) => {
        return {
          ...prevData,
          errorYear: true,
          errorDate: true,
        };
      });
    }
  }

  function handleChange(event) {
    setDate((prevDate) => {
      return {
        ...prevDate,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <div className="container">
      <Form
        Date={date}
        handleDate={handleChange}
        errors={error}
        handleError={handleErrors}
        setDate={setDate}
      />
    </div>
  );
}
