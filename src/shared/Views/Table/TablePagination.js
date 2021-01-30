import React, { useEffect, useState } from "react";
import TablePagination from "@material-ui/core/TablePagination";


const Pagination = (props) => {
    return <TablePagination
        component="div"
        backIconButtonProps={{ "aria-label": "previous page", }}
        nextIconButtonProps={{ "aria-label": "next page", }}
        {...props} />
}

export default Pagination;