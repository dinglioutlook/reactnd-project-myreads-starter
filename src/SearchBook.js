import React from 'react'
import {Link} from "react-router-dom"
import BookList from "./BookList"
import Book from "./Book"
import * as BooksAPI from './BooksAPI'

class SearchBook extends React.Component {

    render(){
        return (
        <div className = "search-books">
            <div className="search-books-bar">
                <Link className="close-search-book" to="/">
                    Close
                </Link>
                <div className="search-book-input">
                    <input type = "text" placeholder ="Serach books by title or author" 
                        onChange ={(event) => this.props.onSearchBook(event.target.value)}    
                    />
                </div>
            </div>
            <div className="search-book-result">
                <ol className="books-grid">
                    <BookList books = {this.props.books} onChangeShelf={this.props.onChangeShelf} />   
                </ol>            
            </div>    
        </div>    
        )
    }
}

export default SearchBook