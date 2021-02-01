new Vue({
  el: '#app',
  data: {
    books: [],
    searchString: "",
    checkedCategories: [],
    checkedLanguages: [],
    matureContent: false,
  },
  computed: {
    filteredBooks: function () {
      // language
      // category
      // averageRating
      // maturity rating
      // pageCount
    }
  },
  beforeCreate() {
    axios
      .get('https://www.googleapis.com/books/v1/volumes?q=search-terms&key=AIzaSyDb5RvxGkCOKziqW5juAkV4IT3aW25dN_Y')
      .then(res => {
        console.log(res.data.items[0]);
        this.books = res.data.items
      })
  }
});