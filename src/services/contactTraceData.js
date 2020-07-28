const tracingData = [
  {
    id: "ds;lkfjsd;klskdjflksdjf",
    duration: "21",
    totalDuration: "21",
    totalEncounters: "1",
    date: "23 May 2020",
  },
  {
    id: "ds;jfslgkjdl;klskdjflksdjf",
    duration: "10",
    totalDuration: "29",
    totalEncounters: "3",
    date: "12 May 2020",
  },
  {
    id: "wekrjke;lkfjsd;klskdjflksdjf",
    duration: "18",
    totalDuration: "89",
    totalEncounters: "2",
    date: "12 May 2020",
  },
  {
    id: "skdruirt;lkfjsd;klskdjflksdjf",
    duration: "15",
    totalDuration: "45",
    totalEncounters: "3",
    date: "23 May 2020",
  },
  {
    id: "235m4nln;lkfjsd;klskdjflksdjf",
    duration: "18",
    totalDuration: "56",
    totalEncounters: "3",
    date: "23 May 2020",
  },
  {
    id: "23k4j2lk3j;lkfjsd;klskdjflksdjf",
    duration: "10",
    totalDuration: "78",
    totalEncounters: "8",
    date: "23 May 2020",
  },
  {
    id: "23kl4jlk23;lkfjsd;klskdjflksdjf",
    duration: "45",
    totalDuration: "230",
    totalEncounters: "10",
    date: "9 May 2020",
  },
  {
    id: "234kj2lk34j;lkfjsd;klskdjflksdjf",
    duration: "34",
    totalDuration: "156",
    totalEncounters: "5",
    date: "29 May 2020",
  },
  {
    id: "23k23lkj;lkfjsd;klskdjflksdjf",
    duration: "23",
    totalDuration: "120",
    totalEncounters: "6",
    date: "23 May 2020",
  },
  {
    id: ".lkj3lk2j3;lkfjsd;klskdjflksdjf",
    duration: "40",
    totalDuration: "230",
    totalEncounters: "3",
    date: "24 May 2020",
  },
];

export function getAllData() {
  return tracingData;
}

export function getData(id) {
  return tracingData.find((d) => d._id === id);
}
