const selection = document.querySelector(".container");
const pricePerMovie = document.querySelector("select");
const seats = document.querySelectorAll(".row .seat");
const seatCount = document.getElementById("count");
const priceTotal = document.getElementById("total");

populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  pricePerMovie.selectedIndex = localStorage.getItem("selectedMovieIndex");
  seatCount.innerHTML = `${selectedSeats.length}`;
  priceTotal.innerHTML = `${localStorage.getItem("selectedMoviePrice") *
    selectedSeats.length}`;
};

populateUI();

//Save selected movie data
setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
};

updateSeatsAndPrice = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  seatCount.innerHTML = `${selectedSeats.length}`;
  priceTotal.innerHTML = `${pricePerMovie.value * selectedSeats.length}`;

  const indexSelSeats = [...selectedSeats].map(seat =>
    [...seats].indexOf(seat)
  );
  localStorage.setItem("selectedSeats", JSON.stringify(indexSelSeats));
};

pricePerMovie.addEventListener("change", evt => {
  setMovieData(evt.target.selectedIndex, evt.target.value);
  updateSeatsAndPrice();
});

selection.addEventListener("click", evt => {
  if (
    evt.target.classList.contains("seat") &&
    !evt.target.classList.contains("booked")
  ) {
    evt.target.classList.toggle("selected");
    updateSeatsAndPrice();
  }
});
