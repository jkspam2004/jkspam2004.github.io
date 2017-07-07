/* tableGen */

'use strict';

function tableGen() {
    function table() {
    }

    table.prototype.addColumnView = function(view, tableHeader) {
        let selector = document.createElement("div");
        let len = tableHeader.length;
        for (let i = 1; i <= len; i++) {
            this.addCheckbox(i, "columnView", tableHeader[i - 1], view, true);
        }
    };

    /* checkboxes to toggle hiding columns */
    table.prototype.addCheckbox = function(num, name, value, parentNode, checked) {
        let input = document.createElement("input");
        let label = document.createElement("label");
        input.type = "checkbox";
        input.checked = checked ? "checked" : "";
        input.dataset.col = num;
        input.name = name;
        value = value.toLowerCase();
        value = value.replace(/(^|\s)[a-z]/g, function(f) {return f.toUpperCase();});
        input.value = value;
        label.textContent = value;

        input.addEventListener("change", this.checkColumn);

        parentNode.appendChild(input);
        parentNode.appendChild(label);
    };

    /* toggle columns to hide */
    table.prototype.checkColumn = function(e) {
        const colNum = parseInt(e.target.dataset.col);
        const columns = document.querySelectorAll(`div.tbody div.row div.col:nth-child(${colNum})`);
        const header = document.querySelector(`div.thead div.row div.col:nth-child(${colNum})`);

        columns.forEach((column) => {
            e.target.checked ? column.classList.remove("hide") :  column.classList.add("hide");
        });

        e.target.checked ? header.classList.remove("hide") :  header.classList.add("hide");
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
            let dataCol = document.querySelector(`input[data-col="${th + 1}"]`);
            let column = document.createElement("div");

            dataCol.checked ? column.classList.add("col") : column.classList.add("hide");

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
                let dataCol = document.querySelector(`input[data-col="${c + 1}"]`);

                dataCol.checked ? column.classList.add("col") : column.classList.add("hide");

                row.appendChild(column);

                // hide the extra row by default
                if (tableData[r][c] instanceof Array) {
                    let hiddenColumn = document.createElement("div");
                    column.textContent = tableData[r][c][0];
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
