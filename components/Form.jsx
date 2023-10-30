import React from "react";

export default function Form(props) {
  const [dateOnScreen, setDateOnScreen] = React.useState({
    dayOnScreen: "- -",
    monthOnScreen: "- -",
    yearOnScreen: "- -",
  });

  let currentDate = new Date();
  let theDay = currentDate.getDate() - props.Date.day;
  let theMonth = currentDate.getMonth() + 1 - props.Date.month;
  let theYear = currentDate.getFullYear() - props.Date.year;

  let errorMessageOfDay = "This field is required";
  let errorMessageOfMonth = "This field is required";
  let errorMessageOfYear = "This field is required";

  if (props.Date.day > 31) {
    errorMessageOfDay = "Must be a valid day";
  }

  if (props.Date.month > 12) {
    errorMessageOfMonth = "Must be a valid month";
  }

  if (props.Date.year > currentDate.getFullYear()) {
    errorMessageOfYear = "Must be in the past";
  }

  function handleOutput() {
    props.handleError();

    if (theDay < 0) {
      theDay += 30;
      theMonth = currentDate.getMonth() - props.Date.month;
    }

    if (theMonth < 0) {
      theMonth += 12;
      theYear = currentDate.getFullYear() - 1 - props.Date.year;
    }

    setDateOnScreen(() => {
      return {
        yearOnScreen: theYear,
        monthOnScreen: theMonth,
        dayOnScreen: theDay,
      };
    });

    if (!props.errors.errorDate) {
      console.log(props.errors.errorDate);
      console.log(props.errors.errorDay);
      props.setDate({
        year: "",
        month: "",
        day: "",
      });
    }
  }

  return (
    <>
      <form>
        <div className="day-box box">
          <label htmlFor="day">DAY</label>
          <input
            name="day"
            placeholder="DD"
            type="text"
            id="day"
            onChange={props.handleDate}
            value={props.Date.day}
          />
          {props.errors.errorDay && (
            <p className="error__message">{errorMessageOfDay}</p>
          )}
        </div>
        <div className="month-box box">
          <label htmlFor="month">MONTH</label>
          <input
            name="month"
            placeholder="MM"
            type="text"
            id="month"
            onChange={props.handleDate}
            value={props.Date.month}
          />
          {props.errors.errorMonth && (
            <p className="error__message">{errorMessageOfMonth}</p>
          )}
        </div>

        <div className="year-box box">
          <label htmlFor="year">YEAR</label>
          <input
            name="year"
            placeholder="YYYY"
            type="text"
            id="year"
            onChange={props.handleDate}
            value={props.Date.year}
          />
          {props.errors.errorYear && (
            <p className="error__message">{errorMessageOfYear}</p>
          )}
        </div>
      </form>

      <div className="wrapper">
        <button onClick={handleOutput}>
          <img src="./images/icon-arrow.svg" alt="arrow-picture" />
        </button>
      </div>

      <div className="output__screen">
        <h1>
          <span>
            {!props.errors.errorDate ? dateOnScreen.yearOnScreen : "- -"}
          </span>
          years
        </h1>
        <h1>
          <span>
            {!props.errors.errorDate ? dateOnScreen.monthOnScreen : "- -"}
          </span>
          months
        </h1>
        <h1>
          <span>
            {!props.errors.errorDate ? dateOnScreen.dayOnScreen : "- -"}
          </span>
          days
        </h1>
      </div>
    </>
  );
}
