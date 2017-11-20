import React from "react";
import {Link} from "react-router-dom";
import Book from "./Book";

class BookList extends React.Component{
    
    render(){
        let shelf_name = ["Currently Reading", "Want to Read", "Read", "None"]
        let shelf_types = ["currentlyReading", "wantToRead", "read", "none"] 

        const shelf = shelf_types.map(
            (t, i) => {
                let books = (this.props.books !== undefined && this.props.books instanceof Array) &&  (this.props.books.filter((b) => b.shelf === t))
                return (
                    <div key = {t} className = "book-shelf-detail">
                        <p> Book shelf Name : {shelf_name[i]}</p>
                        <ol className="books-grid">
                            {books !== undefined && 
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
            );

        return (
            <div className="book-list">
                {shelf}
            </div>
        )
    }
}

export default BookList