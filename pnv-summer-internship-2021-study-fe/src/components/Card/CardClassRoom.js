import React from 'react';
function CardClassRoom(props) {
    const { data:{className, ownerName, backgroundImage,topic, code, createdAt, id}}=props;
    return (
        <div className="main__content">
            <div className="main__wrapper1">
                <div className="main__bgImage" style={{backgroundImage:`url(${backgroundImage})`}}>
                    <div className="main__emptyStyles" />
                </div>
                <div className="main__text">
                    <h1 className="main__heading main__overflow">
                        <b>{className}</b>                             
                    </h1>
                    <div className="main__section main__overflow">
                        {topic}
                    </div>
                    <div className="main__wrapper2">
                        <em className="main__code">Class Code : {code}</em>
                    </div>
                    <div className="main__wrapper2">
                        <em className="main__code">{ownerName}</em>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardClassRoom;