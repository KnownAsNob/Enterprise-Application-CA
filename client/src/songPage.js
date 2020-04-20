import React from "react";

class SongPage extends React.Component {
    
    constructor(props){
        super();
        /*this.state = {
            values: {
                username: "",
                email: "",
                password: "",
                password2: ""
            },
            isSubmitting: false,
            isError: false
        };*/
    }

    componentDidMount () {
        //const { handle } = this.props.match.params;
        console.log(this.props.location.state.songInfo);

        console.log(this.props.location.state.user);
        console.log(this.props);

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
                        
                        <a href={this.props.location.state.songInfo.url} className="btn btn-success btn-lg">Play</a>
                        <button className="btn btn-info btn-lg" onClick={this.moreInformation}>Add to your library</button>
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