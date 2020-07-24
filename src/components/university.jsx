import React, { Component } from "react";
class University extends Component {
  state = {};
  render() {
    return (
      <ul className="dropdown-menu" id="dropdown">
        <li>
          <a href="#books">Books</a>
        </li>
        <li>
          <a href="#podcasts">Podcasts</a>
        </li>
        <li>
          <a href="#">Tech I Like</a>
        </li>
        <li>
          <a href="#">About me</a>
        </li>
        <li>
          <a href="#addBlog">Add a Blog</a>
        </li>
      </ul>
    );
  }
}

export default University;
