import React from 'react'
import {Link} from "react-router-dom"
import Book from "./Book"
import * as BooksAPI from './BooksAPI'

class SearchBook extends React.Component {
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
      };

      onSearchBook = query =>{
        this.setState({searchQuery: query});
        BooksAPI.search(query, 5).then(books =>{
          this.setState({books: books});
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
                                        <Book book={book} onChangeShelf={this.onChangeShelf}/>
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
                        onChange ={(event) => this.onSearchBook(event.target.value)}    
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