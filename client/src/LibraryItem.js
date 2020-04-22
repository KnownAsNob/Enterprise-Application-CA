import React from "react";

class LibraryItem extends React.Component {
    
    constructor(props){
        super();
        this.state = {
            libraryStatus: "",
            libraryErrorMsg: ""
        };
    }

    render() {

        //console.log("Comment information: ");
        console.log(this.props.details.artist);

        return ( 
            <div className = "comment">
                <p>Artist: {this.props.details.artist}</p>
                <p>Title: {this.props.details.title}</p>
            </div>
        )
    }
}

export default LibraryItem;