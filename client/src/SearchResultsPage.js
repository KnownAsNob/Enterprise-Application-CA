import React from "react";

import SongCard from './songCard';

export default class SearchResultsPage extends React.Component {
    state = {
        isLoading: true,
        searchText: "",
        searchResults: []
    };

    handleSearch = async e => {

        let searchText = this.props.location.state.searchText;
        //let results = ApiData.filter(item => item.title.includes(searchText));

        const res = await fetch("http://localhost:9000/api/search/" + searchText, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then(res => res.json())

        //Update state
        this.setState(prevState => ({
            searchResults: [...prevState.searchResults, res.results.trackmatches.track],
            isLoading: false,
            searchText: searchText
            //searchResults: [...prevState.searchResults, res.results.trackmatches.track[1]]
        }))
    };

    componentDidMount() {
        this.handleSearch();
    }

    componentDidUpdate(prevProps) {
        let prevSearch = prevProps.location.state.searchText;
        let newSearch = this.props.location.state.searchText;
        if (prevSearch !== newSearch) {
            this.handleSearch();
        }
    }

    render() {
        
        let toRender = this.state.isLoading ? (
            <div className="container">
                <h1>Loading...</h1>
            </div>
        ) : (
        <>
            <div className="container">
                <h1>{this.state.searchResults[0].length} results for "{this.state.searchText}"</h1>
                
                {this.state.searchResults.length > 0 ? (
                
                <pre>
                    <div className = "row">
                        {this.state.searchResults[0].map(searchResults => <SongCard info = {searchResults}></SongCard>)}
                    </div>
                </pre>
                ) : (
                    <p>We couldn't find anything for "{this.state.searchText}"!</p>
                )}
            </div>
            </>
        );

        return <div style={{ margin: "20px 0px 0px 20px" }}>{toRender}</div>;
    }
}


/*const res = await fetch("http://localhost:9000/apiRun/search" + searchText, {
method: "POST",
body: JSON.stringify(this.state.values),
headers: {
"Content-Type": "application/json"
}
});
<p>{this.state.searchResults}</p>
<small>{JSON.stringify(this.state.searchResults, null, 2)}</small>*/
