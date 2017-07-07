'use strict';

(function () {
    var getTableData = new XMLHttpRequest();

    getTableData.onreadystatechange = function() {
        if (getTableData.readyState === 4) {
            buildTable();
        }
    }

    function buildTable() {
        let tableInfo = JSON.parse(getTableData.responseText);
        let tableHeader = tableInfo.tableHeader;
        let tableData = tableInfo.data;

        let columnView = document.getElementById("view");
        tableGen().addColumnView(columnView, tableHeader);

        let dataGrid = document.getElementById("datagrid");
        tableGen().addSelector(dataGrid);

        let table = document.createElement("div");
        table.classList.add("table");
        dataGrid.appendChild(table);

        tableGen().addHeader(tableHeader, table);
        tableGen().addTableData(tableData, table);

    }

    getTableData.open("GET", "static/files/data.json", true);
    getTableData.send();

})();
