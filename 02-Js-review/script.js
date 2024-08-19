const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

//Destructuring
/*
const book = getBook(4);
const { title, author, genres, pages, publicationDate, hasMovieAdaptation } =
  book;
const [primaryGenre, secondaryGenre, ...other] = genres;
console.log(title, author, primaryGenre, secondaryGenre, other);

const newGenres = [...genres, "epic fantasy", "dark humor"];
console.log(newGenres);

const getYear = (str) => str.split("-")[0];

const updateBook = { ...book, moviePublicationDate: "2001", pages: 1210 };

updateBook;

const summary = `${title} is a ${pages}-page long book, was written by ${author} and published in ${getYear(
  publicationDate
)}. The book has ${hasMovieAdaptation ? "" : "not "}been adapted as a movie.`;
summary;

const date = "2012.12.1";
console.log(date.split(".")[0]);

console.log(true && "some string");
console.log(false && "some string");
console.log(hasMovieAdaptation && "This book has a movie");

// falsy values: null, undefined, 0, -0, NaN, false, ""
console.log("jonas" && "brothers");
console.log(0 && "jonas");

const spanishTranslated = book.translations.spanish || "Not translated";
console.log(spanishTranslated);

const countWrong = book.reviews.librarything.reviewsCount || "no data";
countWrong;

const count = book.reviews.librarything.reviewsCount ?? "no data";
count;

function getTotalReviewCount(book) {
  const goodreads = book.reviews.goodreads?.reviewsCount ?? 0;
  const librarything = book.reviews.librarything?.reviewsCount ?? 0;
  return goodreads + librarything;
}

console.log(getTotalReviewCount(book));
console.log(book);


function getTotalReviewCount(book) {
  const goodreads = book.reviews.goodreads?.reviewsCount ?? 0;
  const librarything = book.reviews.librarything?.reviewsCount ?? 0;
  return goodreads + librarything;
}

const books = getBooks();
books;

const titles = books.map((book) => book.title);
titles;

const esencialData = books.map((book) => ({
  title: book.title,
  author: book.author,
  reviewCount: getTotalReviewCount(book),
}));
esencialData;

const longBooks = books
  .filter((book) => book.pages > 500)
  .filter((book) => book.hasMovieAdaptation);
longBooks;

const adventureBooks = books
  .filter((book) => book.genres.includes("adventure"))
  .map((book) => book.title);

adventureBooks;

const pagesAllBooks = books.reduce((acc, book) => acc + book.pages, 0);
pagesAllBooks;

const arr = [9, 45, 3, 4, 8, 0];
const sorted = arr.slice().sort((a, b) => b - a);
arr;
sorted;

const sortedByPages = books
  .slice()
  .sort((a, b) => b.pages - a.pages)
  .map((book) => book.title);
sortedByPages;

//Add new book
const newBook = {
  id: 6,
  title: "Barry Trotter",
  author: "Not J. K. Rowling",
};

const addBook = [...books, newBook];
addBook;

//Delete book
const deleteBook = books.filter((book) => book.id != 6);
deleteBook;

//Update book
const updateBook = deleteBook.map((book) =>
  book.id === 2 ? { ...book, author: "Stanisław Lem" } : book
);
updateBook;
*/

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json(res);
  console.log(data);
}

// fetch("https://jsonplaceholder.typicode.com/posts")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

await getData();

console.log(
  "////////////////////////////////////////////////////////////////////////////////"
);

const [numbers, setNumbers] = useState([]);

for (let i = 0; i < 3; i++) {
  const random = Math.floor(Math.random() * 10);
  console.log(numbers);
  setNumbers(numbers.map((n) => n != random));
  numbers.map(() =>
    numbers.filter((n) => n != setNumbers(random)) ? random : i--
  );
}

const random = [];

for (let i = 0; i < 3; i++) {
  const drawNumber = Math.floor(Math.random() * story.rows.length);
  const r = random.find((n) => n === drawNumber);

  if (i === 0 && drawNumber === 0) {
    i--;
  } else {
    if (!r) {
      random.push(drawNumber);
    } else {
      i--;
    }
  }
}

for (let i = 0; i < userInput; i++) {
  const drawNumber = Math.floor(Math.random() * userInput);
  const randomNumber = randomNumbers.find((n) => n === drawNumber);

  if (i === 0 && drawNumber === 0) {
    i--;
  } else {
    if (!r) {
      setRandomNumbers((n) => [...n, drawNumber]);
    } else {
      i--;
    }
  }
}
