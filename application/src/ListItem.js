import React from 'react';

const ListItem = (props) => {

    console.log(props.data);

    return (
        <div className="list-item">
            <div className = "list-item-header">
                <h3>{props.data.Name}</h3>
                <p>${props.data.Price}</p>
            </div>
            <div className = "list-item-body">
                <p>{props.data.Comment}</p>
                <p>{props.data.Category}</p>
            </div>
        </div>
    );
}

export default ListItem;