import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

const Loader = () => <div className='custom-loader'><CircularProgress
    className="SpinnCirc"
    size={50}
    thickness={3}
    color="secondary"
/>
</div>

export default Loader;