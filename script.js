var listDataEle = document.getElementById("listData");
var inputName = document.getElementById("name");
var listDataDiv = document.getElementById("listData");

async function SubmitForm() {
  console.log("submit");
  var text = String(inputName.value.toString());
  console.log(text.length);
  if (text.length > 0) {
    await fetch(`https://api.nationalize.io?name=${text}`, {
      method: "get",
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res) {
          var tbl = document.createElement("table");
          tbl.style.width = "100%";
          tbl.setAttribute("border", "1");
          var tableBody = document.createElement("TBODY");
          var trhead = document.createElement("TR");
          var tblHead = document.createElement("thead");

          var thCountry = document.createElement("th");
          thCountry.appendChild(document.createTextNode("Country Code"));

          var thProbability = document.createElement("th");
          thProbability.appendChild(document.createTextNode("Probability"));

          trhead.appendChild(thCountry);
          trhead.appendChild(thProbability);
          tblHead.appendChild(trhead);
          tbl.append(tblHead);

          res.country.forEach((countr) => {
            var tdCountry = document.createElement("td");
            var tdProbability = document.createElement("td");
            var tr = document.createElement("TR");
            tableBody.appendChild(tr);
            tdCountry.appendChild(document.createTextNode(countr.country_id));
            tdProbability.appendChild(
              document.createTextNode(countr.probability)
            );
            tr.appendChild(tdCountry);
            tr.appendChild(tdProbability);
          });
          tbl.append(tableBody);
          listDataDiv.appendChild(tbl);
        } else {
          listDataDiv.appendChild(document.createTextNode("No results found"));
        }
      })
      .catch((errr) => console.log(errr.message));
    inputName.value = "";
  }
  return false;
}
