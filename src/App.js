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
    searchQuery: "",
    search_books: []
  }
  
  componentDidMount = () => {
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

             if (this.state.searchQuery.length !== 0){
               this.onSearchBook(this.state.searchQuery)
             }
           }
        )
      }
    )
  };

  onSearchBook = (query) =>{
        this.setState({searchQuery: query});
        let all_books = this.state.books;

        if (query.length === 0){
            this.setState({search_books:[]});
            return;
        }

        BooksAPI.search(query, 5).then(books =>{
          // merge books with all the users books
            if(books && books instanceof Array && (books.length !== 0)) 
            { 
                let search_book = books.map((_book) => {
                    let update_book = all_books.filter((exist_book) => {
                        return _book.id === exist_book.id;
                    });

                    if(update_book[0] == undefined)
                    {
                        _book.shelf = 'none';
                    }

                    return update_book[0] ? update_book[0] : _book
                });
                this.setState({ search_books: search_book })
            }
            else 
            {
                this.setState( { search_books: [] })
            }
            })
      }

  render() {
    return (
      <div className="app">
      <p> Book Apps</p>
      <Route path='/search' render={() => (
          <SearchBook onChangeShelf={this.onChangeShelf} books = {this.state.search_books} onSearchBook={this.onSearchBook}/>
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
