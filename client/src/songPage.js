import React from "react";

class SongPage extends React.Component {
    
    constructor(props){
        super();
        this.state = {
            libraryStatus: "",
            libraryErrorMsg: ""
        };
    }

    componentDidMount () {
        /*const { handle } = this.props.match.params;
        console.log(this.props.location.state.songInfo);
        console.log(this.props.location.state.user);
        console.log(this.props);*/

        //Check if song in library
        this.checkLibrary();
    }

    editLibrary = () => {
        console.log("Changing user's library...");
        
        //Check user is logged in
        if(this.props.loggedIn === "LOGGED_IN") {
            console.log("Okay")
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
                this.setState({libraryStatus: "This song is in your library!"})
            :
                this.setState({libraryStatus: "Add to your library!"});
        }

        else {
            this.setState({libraryStatus: "Add to your library!"});
        }  
    };

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
                        <div className = "comment">
                            <p><i>Posted by nelly97 on 12/12/2020</i></p>
                            <p>This song is great</p>
                            {this.checkLogin}
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default SongPage;