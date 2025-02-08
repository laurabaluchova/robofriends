import React, { useState, useEffect } from "react";
import CardList from "../Components/CardList";
import SearchBox from "../Components/SearchBox";
import Scroll from "../Components/Scroll";
import ErrorBoundary from "../Components/ErrorBoundary";


const App = () => {
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchField] = useState("");

    const onSearchChange = (e) => {
        setSearchField(e.target.value);        
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const users = await response.json();
            setRobots(users);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, []);

      const filteredRobots = robots?.filter(robot => 
        robot?.name?.toLowerCase().includes(searchfield.toLowerCase())
      ) ?? [];

        return (
            <>
            {
                robots.length > 0 ? (
                  <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                      <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                      </ErrorBoundary>
                    </Scroll>
                  </div>
                ) : 
                  <p>Loading...</p>
                
              }
              </>
        );


};
// class App extends Component {
//     constructor() {
//         super()
//         this.state = {
//             robots: [],
//             searchfield: ""
//         }
//     }

    // componentDidMount() {
    //     fetch("https://jsonplaceholder.typicode.com/users")
    //     .then(response => response.json())
    //     .then(users => this.setState({robots: users}));
    //     }    

    // onSearchChange = (event) => {
    //     this.setState({searchfield: event.target.value})
        
    // }

//     render() {
//         const { robots, searchfield } = this.state;
//         const filteredRobots = robots.filter(robot => {
//             return robot.name.toLowerCase().includes(searchfield.toLowerCase())})
//         return (
//             <div className="tc">
//                 <h1 className="f1">RoboFriends</h1>
//                 <SearchBox searchChange = {this.onSearchChange}/>
//                 <Scroll>
//                     <ErrorBoundary>
//                          <CardList robots={filteredRobots}/>
//                     </ErrorBoundary>
//                 </Scroll>
//             </div>
//         );
//     }
// }

export default App;