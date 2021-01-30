import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const NoDataFound = () => {
    return <TableBody>
        <TableRow>
            <TableCell colSpan={6} >
                No Data Found
                </TableCell>
        </TableRow>
    </TableBody>
}

export default NoDataFound;