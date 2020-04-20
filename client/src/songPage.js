import React from "react";

class SongPage extends React.Component {
    constructor(props) {
        super();
        
    }

    componentDidMount () {
        //const { handle } = this.props.match.params;
        console.log(this.props.location.state.songInfo);
        //console.log(this.props);
        console.log("Printed");
    }

    render() {

        return (
            <div className="container">
                <h1>Hello</h1>
            </div>
        )
    }
}

export default SongPage;
