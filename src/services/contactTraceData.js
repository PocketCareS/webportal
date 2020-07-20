
const tracingData = [
    {
        _id:"ds;lkfjsd;klskdjflksdjf",
        countTwo:"4",
        countTen:"23",
        avgDistance:"3.5",
        zipcode:"22222",
        date:"23 May 2020"
    },
    {
        _id:"ds;jfslgkjdl;klskdjflksdjf",
        countTwo:"5",
        countTen:"13",
        avgDistance:"5.5",
        zipcode:"22221",
        date:"12 May 2020"
    },
    {
        _id:"wekrjke;lkfjsd;klskdjflksdjf",
        countTwo:"6",
        countTen:"21",
        avgDistance:"9.5",
        zipcode:"22221",
        date:"12 May 2020"
    },
    {
        _id:"skdruirt;lkfjsd;klskdjflksdjf",
        countTwo:"5",
        countTen:"23",
        avgDistance:"83.5",
        zipcode:"22222",
        date:"23 May 2020"
    },
    {
        _id:"235m4nln;lkfjsd;klskdjflksdjf",
        countTwo:"4",
        countTen:"23",
        avgDistance:"3.5",
        zipcode:"22222",
        date:"23 May 2020"
    },
    {
        _id:"23k4j2lk3j;lkfjsd;klskdjflksdjf",
        countTwo:"7",
        countTen:"53",
        avgDistance:"3.5",
        zipcode:"23234",
        date:"23 May 2020"
    },
    {
        _id:"23kl4jlk23;lkfjsd;klskdjflksdjf",
        countTwo:"6",
        countTen:"23",
        avgDistance:"3.5",
        zipcode:"54552",
        date:"9 May 2020"
    },
    {
        _id:"234kj2lk34j;lkfjsd;klskdjflksdjf",
        countTwo:"41",
        countTen:"2",
        avgDistance:"5.5",
        zipcode:"324234",
        date:"29 May 2020"
    },
    {
        _id:"23k23lkj;lkfjsd;klskdjflksdjf",
        countTwo:"4",
        countTen:"3",
        avgDistance:"5.5",
        zipcode:"454545",
        date:"23 May 2020"
    },
    {
        _id:".lkj3lk2j3;lkfjsd;klskdjflksdjf",
        countTwo:"41",
        countTen:"13",
        avgDistance:"3.5",
        zipcode:"23232",
        date:"24 May 2020"
    }

];

export function getAllData(){
    return tracingData;
}

export function getData(id){
    return tracingData.find(d=> d._id === id);
}