import React from "react";
import { Cards, Chart, CountryPicker } from "./components"; //set up Api
import styles from "./Statistics.module.css";
import { fetchData } from "./api";

class Statistics extends React.Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  handleCountryChange = async (country) => {
    const fetchedData =
      country === "" ? await fetchData() : await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    ); //setup api
  }
}
export default Statistics;