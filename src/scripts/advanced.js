new Vue({
  el: '#app',
  data: {
    books: [],
    booksFound: [],
    checkedCategories: [],
    checkedLanguages: [],
    matureContent: false,
    bookLength: "",
    showAll: false,
  },
    methods:{
      findBooks: function(){
        // Filter by category
        let filteredCategories= this.books.filter(book => book.volumeInfo?.categories?.filter(category => this.checkedCategories.includes(category)).length > 0);
        // Filter by language
        let filteredLanguages = filteredCategories.filter(book => this.checkedLanguages.includes(book.volumeInfo.language));
        // Filter if mature content
        if(!this.matureContent){
          filteredLanguages = filteredLanguages.filter(book => book.volumeInfo.maturityRating === 'NOT_MATURE');
        }
        // Filter by length
        let filteredLength = [];
        if(this.bookLength === 'short'){
          filteredLength = filteredLanguages.filter(book => book.volumeInfo.pageCount <= 300)
        }else if (this.bookLength === 'medium'){
          filteredLength = filteredLanguages.filter(book => book.volumeInfo.pageCount > 300 && book.volumeInfo.pageCount <= 600)
        }else if (this.bookLength === 'long'){
          filteredLength = filteredLanguages.filter(book => book.volumeInfo.pageCount > 600)
        }
        // Filter by rating
        const filteredRank = filteredLength.sort(function(a, b){
          const ratingA = a.volumeInfo?.averageRating ?? 0;
          const ratingB = b.volumeInfo?.averageRating ?? 0;
          if ( ratingA > ratingB ){
            return -1;
          }
          if ( ratingA < ratingB ){
            return 1;
          }
          return 0;
        });
        this.booksFound = filteredRank;
        console.log(filteredRank);
      }
    },
  beforeCreate() {
    axios
      .get('https://www.googleapis.com/books/v1/volumes?q=search-terms&key=AIzaSyDb5RvxGkCOKziqW5juAkV4IT3aW25dN_Y&maxResults=40')
      .then(res => {
        this.books = res.data.items
      })
  }
});