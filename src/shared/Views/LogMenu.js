import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { TrendingUpOutlined } from "@material-ui/icons";

const LongMenu = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            showAlert() {
                setopen(false);
                setanchorEl(null);
            }
        }),
    )

    const [open, setopen] = useState(false);
    const [anchorEl, setanchorEl] = useState(null);

    const handleClick = (event) => {
        setopen(TrendingUpOutlined);
        setanchorEl(event.currentTarget);
    };

    const handleClose = (close) => {
        setopen(false);
        setanchorEl(null);
    };

    return (
        <React.Fragment>
            <IconButton
                className="billinghistorymoreicon"
                aria-label="Click here to open dropdown menu"
                aria-owns={Boolean(anchorEl) ? "long-menu" : undefined}
                aria-haspopup="true"
                onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                classes={{ paper: "LongMenuWrapper" }}
                id="long-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    style: { width: 200 },
                }}          >
                {props.children}
            </Menu>
        </React.Fragment>
    )
})


export default LongMenu;