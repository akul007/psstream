import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
{
  /* 
  It is a wrapper for datatable in which we are getting value, CustomDataTableConfig
   and onRowClick functionality as props
  */
}
function CustomDataTable({value=[],CustomDataTableConfig=[],onRowClick}){
  return (
    <div>
      <div className="card">
        <DataTable data-testid ="dataTable" value={value} responsiveLayout="scroll" onRowClick={onRowClick}>
          {CustomDataTableConfig.map((row,index) => <Column key={index} field={row.field} header={row.header}/>)}
        </DataTable>
      </div>
    </div>
  );
}

export default CustomDataTable;