import React from "react";

const Info = ({toPrint ,clr}) => {
    return (
        <div className="info" style = {{color:{clr}}}>
            ⓘ {toPrint}
        </div>
    );
};

export default Info;