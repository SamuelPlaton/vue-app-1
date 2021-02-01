new Vue({
  el: '#app',
  data: {
    books: [],
    searchString: "",
    categorySelected: "",
  },
  computed: {
    filteredBooks: function () {
      // Filter by title
      let titleFiltered = [];
      if(this.searchString.length === 0){
        titleFiltered = this.books;
      }else{
        titleFiltered = this.books.filter(book => book.volumeInfo.title.toLowerCase().includes(this.searchString.toLowerCase()));
      }
      // Then filter by category
      let categoryFiltered = [];
      if(this.categorySelected.length === 0){
        categoryFiltered = titleFiltered;
      }else{
        categoryFiltered = titleFiltered.filter(book => book.volumeInfo?.categories?.includes(this.categorySelected))
      }
      return categoryFiltered;
    }
  },
  beforeCreate() {
    axios
      .get('https://www.googleapis.com/books/v1/volumes?q=search-terms&key=AIzaSyDb5RvxGkCOKziqW5juAkV4IT3aW25dN_Y&maxResults=40')
      .then(res => {
        console.log(res.data.items[0]);
        this.books = res.data.items
      })
  }
});