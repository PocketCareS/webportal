/*
 * Copyright 2020 University at Buffalo
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
