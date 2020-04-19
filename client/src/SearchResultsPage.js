import React from "react";

export default class SearchResultsPage extends React.Component {
    state = {
        isLoading: true,
        searchText: "",
        searchResults: []
    };

    handleSearch = async e => {

        let searchText = this.props.location.state.searchText;
        //let results = ApiData.filter(item => item.title.includes(searchText));

        const res = await fetch("http://localhost:9000/apiRun/search/" + searchText, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        this.setState({
            isLoading: false,
            searchText: searchText,
            //searchResults: results
            searchResults: "Results go here..."
        });
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
            <h1>Your Search Results</h1>
            <ul>
            <li>Search: "{this.state.searchText}"</li>
            <li>Count: {this.state.searchResults.length}</li>
            </ul>
            {this.state.searchResults.length > 0 ? (
            <p>{this.state.searchResults}</p>
            /*<pre>
            <small>{JSON.stringify(this.state.searchResults, null, 2)}</small>

            </pre>*/
            ) : (
                <p>NO RESULTS FOUND</p>
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
});*/
