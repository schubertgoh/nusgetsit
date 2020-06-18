import React, { Component } from "react";

class Dashboard extends Component {
  render() {
      return (
          <div>    
            <ul class="tabs">
              <li class="tab col s3"><a href="#test1"><span class="black-text">Communities you follow</span></a></li>
              <li class="tab col s3"><a href="#test2"><span class="black-text">Trending Communities</span></a></li>
              <li class="tab col s3"><a href="#test3"><span class="black-text">Explore Communities</span></a></li>             
            </ul>              
          </div>
        
    );
  }
}
export default Dashboard;