import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import SearchBook from './SearchBook'
import {Link} from "react-router-dom";
import './App.css'

class BooksApp extends React.Component {
  state = {
    books:[],
    searchQuery: ""
  }
  
  componentWillMount = () => {
    BooksAPI.getAll().then(books =>{
      this.setState({books: books})
    });
  };

  onChangeShelf = (event, book) => {
    BooksAPI.update(book, event.target.value).then(
      result => {
        BooksAPI.getAll().then(
           books => {
             this.setState({books: books})
           }
        )
      }
    )
  };

  render() {
    return (
      <div className="app">
      <p> Book Apps</p>
      <Route path='/search' render={() => (
          <SearchBook />
        )}/>
      
      <Route exact path = '/' render = {({history}) => (
          <BookList books = {this.state.books} onChangeShelf={this.onChangeShelf}
          />
        )
      }
      />  
      <div className="open-search">
          <Link className="" to="/search">
                    Search a book
          </Link>
      </div>
      </div>
    )
  }
}

export default BooksApp
