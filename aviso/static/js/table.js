/* tableGen */

'use strict';

function tableGen() {
    function table() {
    }

    /* radio button selector */
   table.prototype.addSelector = function(dataGrid) {
        let selector = document.createElement("div");
        dataGrid.appendChild(selector);
        selector.classList.add("table");
        selector.classList.add("detail_option");

        let row = document.createElement("div");
        row.classList.add("row");
        selector.appendChild(row);

        this.addRadio("detail", "more", "More", row, false);
        this.addRadio("detail", "less", "Less", row, true);
    };

    /* add a radio button */
    table.prototype.addRadio = function(name, value, text, parentNode, checked) {
        let label = document.createElement("label");
        let input = document.createElement("input");
        input.type = "radio";
        input.name = name;
        input.value = value;
        input.checked = checked ? "checked" : "";
        label.textContent = text;


        let column = document.createElement("div");
        column.classList.add("col");
        column.classList.add("detail_col");

        input.addEventListener("click", this.toggleState);
        column.appendChild(input);
        column.appendChild(label);

        parentNode.appendChild(column);
    };

    /* header row for table */
    table.prototype.addHeader = function (tableHeader, table) {
        let header = document.createElement("div");
        header.classList.add("thead");
        table.appendChild(header);
        let row = document.createElement("div");
        row.classList.add("row");
        header.appendChild(row);

        for (let th = 0; th < tableHeader.length; th++) {
            let column = document.createElement("div");
            column.classList.add("col");
            row.appendChild(column);
            column.textContent = tableHeader[th];
        }
    };

    /* populate table data */
    table.prototype.addTableData = function(tableData, table) {
        let tbody = document.createElement("div");
        tbody.classList.add("tbody");
        table.appendChild(tbody);
        
        for (let r = 0; r < tableData.length; r++) {
            let row = document.createElement("div");
            row.classList.add("row");
            tbody.appendChild(row);
            for (let c = 0; c < tableData[r].length; c++) {
                let column = document.createElement("div");
                column.classList.add("col");
                row.appendChild(column);
                if (tableData[r][c] instanceof Array) {
                    column.textContent = tableData[r][c][0];    
                    let hiddenColumn = document.createElement("div");
                    hiddenColumn.textContent = tableData[r][c][1];    
                    hiddenColumn.classList.add("detail");
                    column.appendChild(hiddenColumn);
                } else {
                    column.textContent = tableData[r][c];    
                }
            }
        }
    };

    /* toggle the state of the radio buttons to view more/less details */
    table.prototype.toggleState = (e) => {
        var rows = document.getElementsByClassName("detail");
        for (let i = 0; i < rows.length; i++) {
            rows[i].style.visibility = rows[i].style.visibility == "" || e.target.value === "more" ? 
                "visible" : "hidden";
        }
    };

    return new table(); 
}
window.tableGen = tableGen;
