import React from 'react'

const ToolTipTable = ({ text }) => {
    return <span className="TooltipTable">
        <i className="material-icons"
            style={{ paddingRight: 5 }}>
            info
    </i>{text}</span> 
}

export default ToolTipTable