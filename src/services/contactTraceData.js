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

const tracingData = [
  {
    id: "ds;lkfjsd;klskdjflksdjf",
    duration: "19",
    totalDuration: "29",
    totalEncounters: "4",
    date: "23 July 2020",
    firstContactDate: "23 July 2020",
    firstContactDuration: "10",
    lastContactDate: "28 July 2020",
    lastContactDuration: "17",
    symptomsDate: "25 July 2020",
    symptomsReported: "fever",
    lastHealthReportDate: "28 July 2020",
  },
  {
    id: "ds;jfslgkjdl;klskdjflksdjf",
    duration: "15",
    totalDuration: "29",
    totalEncounters: "3",
    date: "22 July 2020",
    firstContactDate: "18 July 2020",
    firstContactDuration: "5",
    lastContactDate: "28 July 2020",
    lastContactDuration: "9",
    symptomsDate: "25 July 2020",
    symptomsReported: "fever,cough",
    lastHealthReportDate: "28 July 2020",
  },
  {
    id: "wekrjke;lkfjsd;klskdjflksdjf",
    duration: "21",
    totalDuration: "89",
    totalEncounters: "5",
    date: "21 July 2020",
    firstContactDate: "15 July 2020",
    firstContactDuration: "10",
    lastContactDate: "28 July 2020",
    lastContactDuration: "19",
    symptomsDate: "22 July 2020",
    symptomsReported: "No",
    lastHealthReportDate: "28 July 2020",
  },
  {
    id: "skdruirt;lkfjsd;klskdjflksdjf",
    duration: "22",
    totalDuration: "45",
    totalEncounters: "4",
    date: "23 July 2020",
    firstContactDate: "23 July 2020",
    firstContactDuration: "10",
    lastContactDate: "26 July 2020",
    lastContactDuration: "8",
    symptomsDate: "28 July 2020",
    symptomsReported: "No",
    lastHealthReportDate: "29 July 2020",
  },
  {
    id: "235m4nln;lkfjsd;klskdjflksdjf",
    duration: "21",
    totalDuration: "56",
    totalEncounters: "6",
    date: "23 July 2020",
    firstContactDate: "23 July 2020",
    firstContactDuration: "18",
    lastContactDate: "28 July 2020",
    lastContactDuration: "7",
    symptomsDate: "25 July 2020",
    symptomsReported: "fever,cough,sneeze",
    lastHealthReportDate: "28 July 2020",
  },
  {
    id: "23k4j2lk3j;lkfjsd;klskdjflksdjf",
    duration: "10",
    totalDuration: "78",
    totalEncounters: "8",
    date: "23 July 2020",
    firstContactDate: "23 July 2020",
    firstContactDuration: "10",
    lastContactDate: "28 July 2020",
    lastContactDuration: "1",
    symptomsDate: "25 July 2020",
    symptomsReported: "fever",
    lastHealthReportDate: "28 July 2020",
  },
  {
    id: "23kl4jlk23;lkfjsd;klskdjflksdjf",
    duration: "45",
    totalDuration: "230",
    totalEncounters: "10",
    date: "19 July 2020",
    firstContactDate: "23 July 2020",
    firstContactDuration: "30",
    lastContactDate: "28 July 2020",
    lastContactDuration: "4",
    symptomsDate: "25 July 2020",
    symptomsReported: "No",
    lastHealthReportDate: "28 July 2020",
  },
  {
    id: "234kj2lk34j;lkfjsd;klskdjflksdjf",
    duration: "34",
    totalDuration: "156",
    totalEncounters: "5",
    date: "29 May 2020",
    firstContactDate: "23 July 2020",
    firstContactDuration: "10",
    lastContactDate: "28 July 2020",
    lastContactDuration: "8",
    symptomsDate: "25 July 2020",
    symptomsReported: "fever",
    lastHealthReportDate: "28 July 2020",
  },
  {
    id: "23k23lkj;lkfjsd;klskdjflksdjf",
    duration: "23",
    totalDuration: "40",
    totalEncounters: "6",
    date: "23 May 2020",
    firstContactDate: "23 July 2020",
    firstContactDuration: "10",
    lastContactDate: "28 July 2020",
    lastContactDuration: "2",
    symptomsDate: "25 July 2020",
    symptomsReported: "fever",
    lastHealthReportDate: "28 July 2020",
  },
  {
    id: ".lkj3lk2j3;lkfjsd;klskdjflksdjf",
    duration: "40",
    totalDuration: "230",
    totalEncounters: "3",
    date: "24 May 2020",
    firstContactDate: "23 July 2020",
    firstContactDuration: "10",
    lastContactDate: "28 July 2020",
    lastContactDuration: "16",
    symptomsDate: "25 July 2020",
    symptomsReported: "fever",
    lastHealthReportDate: "28 July 2020",
  },
];

export function getAllData() {
  return tracingData;
}

export function getData(id) {
  return tracingData.find((d) => d._id === id);
}
