 shelf_types.map((s, t) => {
                        <div key={t} className = "list-book-content">
                            <h2 className = "list-book-title">
                                {shelf_name[t]}
                            </h2>
                            
                        </div>
                    })



  onshelfchange = (event, book) => {
    BooksAPI.update(book, event.target.value).then(
      result => {
        BooksAPI.getAll().then(
          books => {
            let bookbyShelf = _.groupBy(books, "shelf");
            let bookById = _.groupBy(books, "id");
            this.setState({booklist: bookbyShelf});
          }
        );

      }
    );
  };

  onSearchBook = (query) => {
    this.setState({searchQuery:query});
    BooksAPI.search(query, 20).then(
      books => {
        this.setState({bookResultSet: books});
      }
    );
  };

              onChangeShelf={
              (event, book) => {
                this.onChangeShelf(event, book);
              } 
            }

