// SearchBarの部分の描画
import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = () => {
    };
  }

  render () {
    return (
      <section className="belt">
        <div className="menu-action search-bar">
          <form>
            <input id="search-box"/>
            <img className="search-icon" src="./images/search_icon.png"/>
          </form>
        </div>
      </section>
    );
  }
}
