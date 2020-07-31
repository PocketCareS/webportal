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

export function convertToCSV(objArray) {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  var str = "";

  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line != "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }

  console.log("csv: " + str);
  return str;
}

export function exportCSVFile(headers, items, fileTitle) {
  if (headers) {
    items.unshift(headers);
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(items);

  var csv = convertToCSV(jsonObject);

  var exportedFilenmae = fileTitle + ".csv" || "export.csv";

  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

var headers = {
  model: "Phone Model".replace(/,/g, ""), // remove commas to avoid errors
  chargers: "Chargers",
  cases: "Cases",
  earphones: "Earphones",
};

const itemsNotFormatted = [
  {
    model: "Samsung S7",
    chargers: "55",
    cases: "56",
    earphones: "57",
    scratched: "2",
  },
  {
    model: "Pixel XL",
    chargers: "77",
    cases: "78",
    earphones: "79",
    scratched: "4",
  },
  {
    model: "iPhone 7",
    chargers: "88",
    cases: "89",
    earphones: "90",
    scratched: "6",
  },
];

var itemsFormatted = [];

// format the data
itemsNotFormatted.forEach((item) => {
  itemsFormatted.push({
    model: item.model.replace(/,/g, ""), // remove commas to avoid errors,
    chargers: item.chargers,
    cases: item.cases,
    earphones: item.earphones,
  });
});

var fileTitle = "orders"; // or 'my-unique-title'
