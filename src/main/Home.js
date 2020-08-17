import React from "react";
import Posts from "../Post/Posts";

const Home = () => (
    <div>
        <div className="jumbotron">
            {/* <h2>Home</h2> */}
            <p className="lead font-weight-bold font-italic">
                Hello home bound people ;), from past few months, we've been going through
                unprecedented situations due to the COVID-19. More or less COVID-19 had brought
                changes to our life.

                Here, you're free to share your experiences, be it a new hobby, or a new skill you've made
                during this time
            </p>
        </div>
        <div className="container">
            <Posts />
        </div>
    </div>
);

export default Home;
