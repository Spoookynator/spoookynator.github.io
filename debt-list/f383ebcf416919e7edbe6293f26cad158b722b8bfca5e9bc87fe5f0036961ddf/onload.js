function hideurl() {
   // var stateObj = { foo: "bar" };
   // history.pushState(stateObj, "", "/debt-list");
}

function getData() {
    var url = "https://sheets.googleapis.com/v4/spreadsheets/1q9msnFq9Zao2LXCa6NkbfefPoKHDeMp1an3npUkbxtA/values/Data!A:J?key=AIzaSyAFdMkfvs9m4qa7GtMPrQB597CgRLv0mqQ";                                                             
    axios.get(url)
      .then(function (response) {

        const apiResponse = response.data.values

        const headers = apiResponse[0]; // first array contains the header names
        const rows = apiResponse.slice(1); // remaining arrays contain values
        
        // use reduce() to convert the array of arrays to a JSON object
        const result = rows.reduce((acc, row) => {
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = row[index];
          });
          acc.push(obj);
          return acc;
        }, []);
        
        // the `result` variable now contains the data in JSON format
        displayResults(JSON.stringify(result)); 
                                                                                                    
      })
      .catch(function (error) {
        console.log(error); 
      });   
}


function displayResults(apiResponse) {
  headers = ["ID", "Date", "Borrower", "Amount", "Due", "ReturnAmount"]

  values = apiResponse;
  debts = JSON.parse(values)

  headerDiv = document.createElement("div")
  headerDiv.classList.add("entry")
  for (const item of headers) {
    subDiv = document.createElement("div")
          subDiv.innerHTML = item
          headerDiv.appendChild(subDiv)
          subDiv.classList.add("sub-entry")
          subDiv.classList.add(item)
  }
  document.body.appendChild(headerDiv)

  debts.forEach(element => {
      testDiv = document.createElement("div")
      console.log(element);
      for (const item of headers) {
          subDiv = document.createElement("div")
          subDiv.innerHTML = element[item]
          subDiv.classList.add("sub-entry")
          subDiv.classList.add(item)
          testDiv.appendChild(subDiv)
      }
      if (element["Payed"] == "Yes") {
        testDiv.classList.add("payed")
        testDiv.classList.add("hidden")

      }
      testDiv.classList.add("entry")
      document.body.appendChild(testDiv)
      console.log(debts);
  });
  
 
}
