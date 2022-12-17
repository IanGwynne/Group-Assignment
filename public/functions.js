

    let table = document.querySelector('table tbody');
    let pageNumber = 0;
    let take = 5;
    let firstBox="none",secondBox="0";
    //Need to figure out how to do this with ejs i guess.
    
    function dropBoxChange()
    {
      let checkedFilter = 
      document.querySelector('#filterList option:checked');
      let List = document.getElementById('List');
      List.innerHTML="";
      fetch(`/all?firstBox=${firstBox}`)
      .then(response => response.json())
      .then(result => {

          for(let i = 0; i < result.length; i++)   {
              if(checkedFilter.value=="Country")
              List.innerHTML+=`<option value="${result[i].country}">${result[i].country}</option>`;
              else if(checkedFilter.value=="City")
              List.innerHTML+=`<option>${result[i].city}</option>`;
              else if(checkedFilter.value=="Cuisine")
              List.innerHTML+=`<option>${result[i].cuisine}</option>`;
              else
              List.innerHTML=`<option value = "None">-- No Filter -- </option>`;
            }
        })
    }

    function getData() {
        fetch(`/users?page=${pageNumber}&take=${take}&firstBox=${firstBox}&secondBox=${secondBox}`)
        .then(response => response.json())
        .then(data => {
            table.innerHTML = "";
            console.log(data[0].name);
            let pages = document.getElementById("countResults");
            pages.innerHTML = "Displaying " + (data.length*(pageNumber+1) - 4)  + " - " +  data.length*(pageNumber+1);
            for(let i = 0; i < data.length; i++) {
                console.log(data.length);
                table.innerHTML += `
                    <tr>
                        <td>${data[i].name}</td>
                        <td>${data[i].country}</td>
                        <td>${data[i].city}</td>
                        <td>${data[i].cuisine}</td>
                    </tr>
                `;
            }
        });
    }
    getData();
    dropBoxChange();
    document.querySelector("#previous").addEventListener("click", event => {
        // this needs to decrement the page number and re-fetch the data
        if(pageNumber != 0)
          pageNumber--;
        getData();
    });

    document.querySelector("#next").addEventListener("click", event => {
        // this needs to increment the page number and re-fetch the data
        pageNumber++;
        getData();
    });

    document.querySelector("#tableList").addEventListener("change", event => {
        // reset pageNumber to 0 to make it easier to work with
        // this needs to update the take and re-fetch the data
      pageNumber = 0;
      let perPage = document.querySelector('#tableList option:checked').value
      take = perPage;

      getData();
    });

    document.querySelector('#apply').addEventListener("click", event => {
        pageNumber = 0;
      // needs to grab the currently selected thing from the second filter box
      //firstBox = document.querySelector('#filterList option:checked').value;
      secondBox = document.querySelector('#List option:checked').value;
      getData();
      document.getElementById("clear").disabled = false;
    })

    document.querySelector("#filterList").addEventListener("change", event => {
        firstBox = document.querySelector('#filterList option:checked').value;
        dropBoxChange();
    });
    
    document.querySelector("#clear").addEventListener("click", event => {
        firstBox = "none";
    getData();
    document.getElementById("clear").disabled = true;
    });