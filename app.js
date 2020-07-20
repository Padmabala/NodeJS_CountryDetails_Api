const path = require('path');
const fs = require("fs");
const getDetails = require('./getDetails');
const { clear } = require('console');

const done = () => {
    console.log("Stored the response in response.json file")
}
const getData = async () => {
    try {
        let data;
        data = await getDetails()
        if (data.statusCode != 200) {
            let count = 0;
            let timerId = setInterval(async () => {
                data = await getDetails()
                if (data.statusCode === 200 || count === 5) {
                    if (data.statusCode === 200) {
                        const { body, statusCode } = data
                        fs.writeFile(path.join(__dirname, 'response.json'), body, done)
                    }
                    clearInterval(timerId)
                }
                count += 1
            }, 1000)
        }
        else {
            const { body, statusCode } = data
            fs.writeFile(path.join(__dirname, 'response.json'), body, done)
        }
    }
    catch (error) {
        console.log(error)
    }

}
getData()