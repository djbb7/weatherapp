import React from 'react';
import ReactDOM from 'react-dom';

// const apiURL = process.env.ENDPOINT;

const apiURL = '';

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${apiURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: "",
    };
  }

  async componentWillMount() {
    const data = await getWeatherFromApi();
    const icon = data.weather[0].icon
    this.setState({icon: icon.slice(0, -1)});
  }

  render() {
    const { icon } = this.state;

    return (
      <div className="icon">
        { icon && <img src={`/img/${icon}.svg`} /> }
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
