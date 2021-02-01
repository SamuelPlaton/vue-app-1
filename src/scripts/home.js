new Vue({
  el: '#app',
  data: {
    books: [],
    searchString: "",
  },
  computed: {
    filteredBooks: function () {
      if(this.searchString.length === 0){
        return this.books;
      }
      return this.books.filter(book => book.volumeInfo.title.toLowerCase().includes(this.searchString.toLowerCase()));
    }
  },
  beforeCreate() {
    axios
      .get('https://www.googleapis.com/books/v1/volumes?q=search-terms&key=AIzaSyDb5RvxGkCOKziqW5juAkV4IT3aW25dN_Y')
      .then(res => {
        this.books = res.data.items
        console.log(res.data.items)
      })
  }
});