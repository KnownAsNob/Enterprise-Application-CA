import React from "react";
import { withRouter } from "react-router-dom";

class SongCard extends React.Component {
  
    constructor(props){
      super();
      this.state = {
        
      }
      //this.moreInformation = this.moreInformation.bind(this);
    }

    moreInformation = () => {
        this.props.history.push({
            pathname: "/song",
            state: {
                songInfo: this.props.info
                //loggedIn: this.props.loggedIn,
                //user: this.props.user
            }
        });
    }

    render() {

        return (
            <div className="col-md-4 mb-5">
                <div className="card h-100">
                    <div className="card-body">
                        <img alt="Song art" className = "card-img-top" src={this.props.info.image[1]}></img>
                        <h2 className="card-title">{this.props.info.name}</h2>
                        <h2 className="card-artist">{this.props.info.artist}</h2>
                        <p className="song-card-text">Total plays: {this.props.info.listeners}</p>
                    </div>
                    <div className="card-footer">

                        <button className="btn btn-success btn-sm" onClick={this.moreInformation}>More</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SongCard);

