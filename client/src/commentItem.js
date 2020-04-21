import React from "react";

class Comment extends React.Component {
    
    constructor(props){
        super();
        this.state = {
            libraryStatus: "",
            libraryErrorMsg: ""
        };
    }

    render() {

        //console.log("Comment information: ");
        //console.log(this.props.details);

        return ( 
            <div className = "comment">
                <p><i>Posted by {this.props.details.username} on {this.props.details.datePosted}</i></p>
                <p>{this.props.details.commentText}</p>
            </div>
        )
    }
}

export default Comment;