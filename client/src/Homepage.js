import React from "react";

function Homepage() {
    
    return (

        <div className="container">

            {/* Header */}
            <div className="row align-items-center my-5">
                {/* Image */}
                <div className="col-lg-7">
                    <img className="img-fluid rounded mb-4 mb-lg-0" src="http://placehold.it/900x400" alt=""></img>
                </div>
                
                {/* Text */}
                <div className="col-lg-5">
                    <h1 className="font-weight-light">Business Name or Tagline</h1>
                    <p>This is a template that is great for small businesses. It doesn't have too much fancy flare to it, but it makes a great use of the standard Bootstrap core components. Feel free to use this template for any project you want!</p>
                    <a className="btn btn-success" href="http://hello.com/">Call to Action!</a>
                </div>
               
            </div> {/* End header */}
                

            {/* Row of cards */}
            <div className="row">

                {/*Card 1*/}
                <div className="col-md-4 mb-5">
                    <div className="card h-100">
                    <div className="card-body">
                        <h2 className="card-title">Card One</h2>
                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
                    </div>
                    <div className="card-footer">
                        <a href="http://hello.com/" className="btn btn-success btn-sm">More Info</a>
                    </div>
                    </div>
                </div>
                
                {/*Card 2*/}
                <div className="col-md-4 mb-5">
                    <div className="card h-100">
                    <div className="card-body">
                        <h2 className="card-title">Card Two</h2>
                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod tenetur ex natus at dolorem enim! Nesciunt pariatur voluptatem sunt quam eaque, vel, non in id dolore voluptates quos eligendi labore.</p>
                    </div>
                    <div className="card-footer">
                        <a href="http://hello.com/" className="btn btn-success btn-sm">More Info</a>
                    </div>
                    </div>
                </div>
                
                {/*Card 3*/}
                <div className="col-md-4 mb-5">
                    <div className="card h-100">
                    <div className="card-body">
                        <h2 className="card-title">Card Three</h2>
                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
                    </div>
                    <div className="card-footer">
                        <a href="http://hello.com/" className="btn btn-success btn-sm">More Info</a>
                    </div>
                    </div>
                </div>
                
            </div> {/* End row of cards */}
        </div>
    );
}

export default Homepage;