import logo from "./logo.svg";
import "./App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  let city1 = useRef();
  const city2 = useRef();
  const city3 = useRef();
  const submitted = useRef();
  const [data, setData] = useState();
  const [citiesData, setCitiesData] = useState({
    city1: "",
    city2: "",
    city3: "",
  });
  const [loading, setLoading] = useState(false);
  const headers = {
    "Content-type": "application/json",
  };
  let cities = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    cities.push(city1.current.value);
    cities.push(city2.current.value);
    cities.push(city3.current.value);
    console.log(cities);
    setLoading(true);
    try {
      const resp = await axios.post(
        "https://weatherbackend-3err.onrender.com/weatherupdate",
        {
          cities: cities,
        }
      );
      setData(resp.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="App">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First City</Form.Label>
          <Form.Control
            onChange={() =>
              setCitiesData({ ...citiesData, city1: city1.current.value })
            }
            value={citiesData.city1}
            ref={city1}
            type="text"
            placeholder=""
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Second City</Form.Label>
          <Form.Control
            onChange={() =>
              setCitiesData({ ...citiesData, city2: city2.current.value })
            }
            value={citiesData.city2}
            ref={city2}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Third City</Form.Label>
          <Form.Control
            onChange={() =>
              setCitiesData({ ...citiesData, city3: city3.current.value })
            }
            value={citiesData.city2}
            ref={city3}
            type="text"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p class="display-4">Please write the correct spelling of the cities</p>
      <div>
        {data &&
          Object.keys(data.weather).map((city, idx) => {
            return (
              <h2
                class="display-2"
                key={idx}
              >{`${city}'s weather = ${data.weather[city]}`}</h2>
            );
          })}
      </div>
    </div>
  );
}

export default App;
