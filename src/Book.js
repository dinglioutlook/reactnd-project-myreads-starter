import React from 'react'
import * as BooksAPI from './BooksAPI'

// 
class Book extends React.Component{
    render() {
        return(                         
        <div className="book">
            <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: "url(" + this.props.book.imageLinks.thumbnail + ")"}}></div>
                <div className="book-shelf-changer">
                    <select value = {this.props.book.shelf} onChange = {(event) => { this.props.onChangeShelf(event, this.props.book)}}>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>

            <div className="book-title">{this.props.book.title}</div>
            <div className="book-authors">{this.props.book.authors}</div>
        </div>
        )
    }
}

export default Book