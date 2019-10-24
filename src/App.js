import React from 'react';
import './App.css';

// Static API key
const API_KEY = '3a94fcd3';

export class App extends React.Component {
  state = {
    sortByState: '',
    hideClass: 'hide',
    movies: [],
  }

  // Function is used to sort movies.
  onSort = (sortProp) => {
    this.setState({ sortByState: sortProp });
    const sort_datas = this.state.movies;    
    if (sort_datas && sort_datas.length > 0) {
      sort_datas.sort(function(a, b){
        if(a[sortProp] < b[sortProp]) { return -1; }
        if(a[sortProp] > b[sortProp]) { return 1; }
        return 0;
      });
    }

    const movies = sort_datas;
    this.setState({ movies });
  }

  // Function is used to search movies.
  onSearch = (e) => {
    fetch("http://www.omdbapi.com/?apikey=" + API_KEY + "&s="+e.target.value)
    .then(res => res.json())
    .then((result)=>{
      const movies = result.Search;
      this.setState({ movies });
    });
  }

  render() {
    const { movies } = this.state;
    return (
        <div className="App">
          <div id="app">
            <h1>Film Search</h1>
    
            <input id="search-input" type="text" placeholder="Search..." onChange={this.onSearch}/> &nbsp;
    
            <span>sort:</span>
            <input 
              id="title-input" 
              type="radio" 
              name="sort-group" 
              value="TITLE"
              checked={this.state.sortByState === 'Title'} 
              onChange={() => this.onSort('Title')} 
            />
            <label htmlFor="title-input">Title</label> 
    
            <input 
              id="date-input" 
              type="radio" 
              name="sort-group" 
              value="DATE" 
              checked={this.state.sortByState === 'Year'} 
              onChange={() => this.onSort('Year')} 
            />
            <label htmlFor="date-input">Date (Year)</label>
        
            <ul className="film-list">
               {/* Search result of movies. */}
              {movies && movies.length > 0 ? (
                  movies.map((obj) => (
                    <li key={obj.imdbID} >
                      <div className="table">
                        <div className="table-row">
                          <div className="table-cell width100"><img src={obj.Poster} alt={obj.Title} className="thumbnail" /></div>
                          <div className="table-cell">
                            <span>Title : {obj.Title}</span><br/>
                            <span>Type : {obj.Type}</span><br/>
                            <span>Year : {obj.Year}</span>
                          </div>
                        </div>
                      </div>              
                    </li>
                  ))
                ) : (
                  <li>No Movies</li>
              )}
            </ul>
          </div>
        </div>
    );
  }
}

export default App;