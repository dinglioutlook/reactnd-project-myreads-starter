import React from 'react'
import {Link} from "react-router-dom"
import Book from "./Book"
import * as BooksAPI from './BooksAPI'

class SearchBook extends React.Component {
    state = {
        books:[],
        searchQuery: ""
      }

      componentDidMount = () => {
        BooksAPI.getAll().then(books =>{
          this.setState({books: books})
        });
      };    

      onSearchBook = (query, all_books) =>{
        this.setState({searchQuery: query});

        BooksAPI.search(query, 5).then(books =>{
          // merge books with all the users books
          var result = [];
          (books instanceof Array) &&
          (all_books instanceof Array) &&  
          all_books.forEach(function(e1){
            books.forEach(function(e2){
                  if(e1.title === e2.title){
                      result.push(e1);
                  }
              });
          });

          this.setState({books: result});
        })
      }

      shelf = () => {
        let books = this.state.books;
        return (
            <div className = "book-shelf-detail">
                <ol className="books-grid">
                    {books !== undefined && books instanceof Array &&  
                        books.map((book, index) => {
                                return (
                                    <li key={index}>
                                        <Book book={book} onChangeShelf={this.props.onChangeShelf}/>
                                    </li>
                                );
                    })}
                </ol>
            </div>
        )
    }  

    render(){
        return (
        <div className = "search-books">
            <div className="search-books-bar">
                <Link className="close-search-book" to="/">
                    Close
                </Link>
                <div className="search-book-input">
                    <input type = "text" placeholder ="Serach books by title or author" 
                        onChange ={(event) => this.onSearchBook(event.target.value, this.props.books)}    
                    />
                </div>
            </div>
            <div className="search-book-result">
                <ol className="books-grid">
                    {this.shelf()}   
                </ol>            
            </div>    
        </div>    
        )
    }
}

export default SearchBook