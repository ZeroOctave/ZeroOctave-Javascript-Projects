// This function allows you to create a new element for the webpage
function createListItem(text) {
    let li = document.createElement('li');
    li.textContent = text;
    return li;
}

// The appendChildren function allows you to add created lists to the webpage by appending children
function appendChildren(parent, children) {
    children.forEach(function (child) {
        parent.appendChild(child);
    });
}

// placing the required element id in a variable
const myList = document.getElementById('my-list');

// define api url to retrieve data in json format
const url = 'http://ip-api.com/json/';

/*
Error Handling:
1. validate whether the GET response is a valid ipv4 address
2. variable validateIP uses a regular expression to check for valid ipv4
3. error item will be appended if the retrieved data has an invalid ipv4
*/
const validateIP = /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/;

let errorItem = [
    createListItem('IP version incorrect, data cannot be retrieved!')
];

/*
1. Using a fetch to retrieve required data in json format
2. we created an array of items we would like to append to our webpage
3. repeat appending items using js forEach function.
4. If fetch fails, log error
*/

const retrieveData = () => {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        let ip = `IPv4: ${data.query}`,
            isp = `ISP: ${data.isp}`,
            org = `ORG: ${data.org}`,
            city = `City: ${data.city}`,
            zip = `ZIP: ${data.zip}`,
            region = `Region: ${data.region}`,
            country = `Country: ${data.country}`;

        let ipValidation = validateIP.test(data.query);

        // display error if ipv4 is invalid
        if (!ipValidation) {
            appendChildren(myList, errorItem);
        } else {
            for (var dataList of [ip,isp,org,city,zip,region,country]) {
                let items =
                [
                    createListItem(dataList)
                ]
            items.forEach((li) => {
                myList.appendChild(li);
            });
        }
    }

    })
    .catch((error) => {
        console.log(error);
    });
};

retrieveData();
