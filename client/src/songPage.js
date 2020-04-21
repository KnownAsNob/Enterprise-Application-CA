import React from "react";

import Comment from './commentItem';

import {
    Label,
    Input
} from "reactstrap";

class SongPage extends React.Component {
    
    constructor(props){
        super();
        this.state = {
            libraryStatus: "",
            libraryErrorMsg: "",
            comments: "",
            values: {
                username: "",
                songID: "",
                commentText: ""
            }
        };
    }

    componentDidMount () {
        /*const { handle } = this.props.match.params;
        console.log(this.props.location.state.songInfo);
        console.log(this.props.location.state.user);
        console.log(this.props);*/

        //Check if song in library
        this.checkLibrary();
        this.fetchComments();

        console.log(this.props.location);

        this.setState({
            values: {
                username: this.props.location.state.user.username,
                songID: this.props.location.state.songInfo.mbid,
                commentText: ""
            }
        })
    }

    editLibrary = async () => {
        console.log("Changing user's library...");
        console.log(this.state.libraryStatus);
        console.log(this.props.location);
        
        //Check user is logged in
        if(this.props.loggedIn === "LOGGED_IN") {
            
            const res = await fetch("http://localhost:9000/songInfo/changeLibrary/" + this.props.location.state.songInfo.mbid + 
            "/" + this.props.location.state.user.username +
            "/" + this.state.libraryStatus, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }).then(res => res.json());

            console.log(res);
            (res.action === "ADDED") ?
                this.setState({libraryStatus: "Remove from your library!"})
            :
                this.setState({libraryStatus: "Add to your library!"})

        }

        else {
            this.setState({libraryErrorMsg: "You must be logged in!"});
        }  
    };

    checkLibrary = async () => {
        
        console.log("Checking user's library...");
        //console.log(this.props.location.state);

        //Check user logged in
        if(this.props.location.state.loggedIn === "LOGGED_IN") {
            
            console.log("User logged in");
            const res = await fetch("http://localhost:9000/songInfo/checkLibrary/" + this.props.location.state.songInfo.mbid + "/" + this.props.location.state.user.username, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }).then(res => res.json());

            console.log(res);
            
            //Set button text (State)
            (res.inLib === "YES") ?
                this.setState({libraryStatus: "Remove from library!"})
            :
                this.setState({libraryStatus: "Add to your library!"});
        }

        else {
            this.setState({libraryStatus: "Add to your library!"});
        }  
    };

    fetchComments = async () => {
        console.log("Fetching comments...");

        const res = await fetch("http://localhost:9000/songInfo/" + this.props.location.state.songInfo.mbid + "/comments", 
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                },
                credentials: "include"
            }).then(res => res.json());

        (res.comments === "None") ? 
            console.log("No comments") 
        :
            this.setState(prevState => ({
                comments: [...prevState.comments, res.comments]
            }));
    }

    handleInputChange = e => this.setState({
        values: { ...this.state.values, [e.target.name]: e.target.value }     
    });

    submitComment = async e => {
        e.preventDefault();
        console.log("Comment submitted");

        //console.log(this.state.values);
        //console.log(this.props.location.state);

        const res = await fetch("http://localhost:9000/songInfo/postcomment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state.values),
                credentials: "include"
            }).then(res => res.json());

            console.log(res);

            if(res.status === "Added")
            {
                window.location.reload();
            }
                

        //console.log(this.state.values.commentText);
        //console.log(this.props.location.state);
    }

    handleUserStatus = () => {
        let loggedIn = this.props.location.state.loggedIn;

        if(loggedIn === "LOGGED_IN")
        {
            return (
                <div className="col-md-12 mb-12 write-comment">
                    <form onSubmit={this.submitComment}>  
                        <Label for="commentTextBox" id="commentLabel">Enter your comment:</Label>
                        <Input type="textarea" 
                                name="commentText"
                                id="commentTextBox" 
                                placeholder="Write here!"
                                value={this.state.values.commentText}
                                onChange={this.handleInputChange}
                        />
                        <button  className="btn btn-success btn-sm" id="commentSubmitButton" type="submit">Submit</button>
                    </form>
                </div>
            );
        }

        else 
        {
            return <h2>Sign in to post a comment!</h2>; 
        }
    }

    render() {

        return (

            <div className="container">
                <h1>{this.props.location.state.songInfo.artist} ○ {this.props.location.state.songInfo.name}</h1>

                <div className = "row">
                    {/* Image */}
                    <div className="col-md-4 mb-5 song-info-block">
                        <img alt="Song art" className = "album-art-img" src="https://www.foot.com/wp-content/uploads/2017/06/placeholder-square.jpg"></img>
                    </div>
                    {/* Song information */}
                    <div className="col-md-4 mb-5 song-info-block">
                        <h3><b>Title: </b>{this.props.location.state.songInfo.name}</h3>
                        <h3><b>Artist: </b>{this.props.location.state.songInfo.artist}</h3>
                        <h3><b>Plays: </b>{this.props.location.state.songInfo.listeners}</h3>
                        
                        <p>{this.state.libraryErrorMsg}</p>
                        <a href={this.props.location.state.songInfo.url} className="btn btn-success btn-lg">Play!</a>
                        <button className="btn btn-info btn-lg" onClick={this.editLibrary}>{this.state.libraryStatus}</button>
                    </div>
                    {/* Comment section */}
                    <div className="col-md-12 mb-12 comment-block">
                        <h3>What are your thoughts?</h3>
                        
                        {this.state.comments !== "" ? (

                            <pre>
                                {this.state.comments[0].map(comment => <Comment details = {comment} ></Comment>)}
                            </pre>
                        ) : (
                            <h4>No comments yet!</h4>
                        )}

                    </div>
                    {/* Write comment section */}
                    {<this.handleUserStatus />}
                </div>
            </div>
        )
    }
}

export default SongPage;