class Deck {
    start_run: (run: Run) => void;
}

const red_deck = new Deck((run: Run) => {
    run.discards++;
});
