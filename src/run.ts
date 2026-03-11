class Deck {
    start_run: (run: Run) => void;
}

class Run {
    hand_size = 8;
    hands = 4;
    discards = 3;
    joker_slots = 5;
    consumable_slots = 2;
    ante = 1;
    round = 1;

    four_fingers_owned = false;
    shortcut_owned = false;
    
    hands: { [id: string]: HandType }
    // TODO: make deck
    deck: Deck;

    constructor (deck: Deck) {
	this.deck = deck;
	deck.start_run(this);
    }
}


enum Suit {
    SPADE,
    HEART,
    CLUB,
    DIAMOND,
}

enum Enhancment {
    NONE = 0,
    BONUS,
    MULT,
    WILD,
    GLASS,
    STEEL,
    STONE,
    GOLD,
    LUCKY,
}

enum Edition {
    NONE = 0,
    FOIL,
    HOLOGRAPHIC,
    POLYCHROME,
    NEGATIVE,
}

enum Seal {
    NONE = 0,
    GOLD,
    RED,
    BLUE,
    PURPLE,
}

enum Rank {
    TWO = 2,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN,
    KING,
    ACE,
}

class Card {
    // Add stuff later.
    // Taro, planet, booster pack, vouchers, playing cards, jokers, etc.
    // all inherit from this.
}

class PlayingCard extends Card {
    rank: Rank;
    suit: Suit;
    enhancment: Enhancment;
    seal: Seal;
    edition: Edition;
}

class Joker extends Card {
}

class Consumable extends Card {
}

class Hand {
    cards_selected: PlayingCard[];
    cards_without_stone: PlayingCard[];
    total_cards: number;
    rank_sets: {[rank: Rank]: Set<PlayingCard>}
    suit_sets: {[suit: Suit]: Set<PlayingCard>}
    cards_scored: PlayingCard[];

    // Does not initialized cards_scored
    constructor (run, cards: PlayingCard[]) {
        this.cards_selected = cards;
	this.cards_without_stone = cards.filter(card => card.enhancement !== Enhancement.STONE);

	this.total_cards = cards.length;

        this.rank_sets = {};
	this.suit_sets = {};
	
	for (const card of cards_without_stone) {
	    if (!this.rank_sets[card.rank]) this.rank_sets[card.rank] = new Set<PlayingCard>();
	    if (!this.suit_sets[suit.rank]) this.suit_sets[card.suit] = new Set<PlayingCard>();

	    this.rank_sets[card.rank].add(card);
	    this.suit_sets[card.suit].add(card);
	}
    }
}

type MatchFunction = (hand: Hand) => Set<PlayingCard> | null;

interface HandType {
    name: string;
    score: { chips: number; mult: number; };
    delta: { chips: number; mult: number; };
    match: MatchFunction;
}

const hands = {
    flush_five: {
        name: "Flush Five",
        score: { chips: 160, mult: 16 },
        delta: { chips: 50, mult: 3 },
        match: matchBoth(matchFlush, match5OAK),
    },
    flush_house: {
        name: "Flush House",
        score: { chips: 140, mult: 14 },
        delta: { chips: 40, mult: 4 },
        match: matchBoth(matchFlush, matchFullHouse),
    },
    five_of_a_kind: {
        name: "Five of a Kind",
        score: { chips: 120, mult: 12 },
        delta: { chips: 35, mult: 3 },
        match: match5OAK,
    },
    straight_flush: {
        name: "Straight Flush",
        score: { chips: 100, mult: 8 },
        delta: { chips: 40, mult: 4 },
        match: matchBoth(matchFlush, matchStraight),
    },
    four_of_a_kind: {
        name: "Four of a Kind",
        score: { chips: 60, mult: 7 },
        delta: { chips: 30, mult: 3 },
        match: match4OAK;
    },
    full_house: {
        name: "Full House",
        score: { chips: 40, mult: 4 },
        delta: { chips: 25, mult: 2 },
        match: matchFullHouse;
    },
    flush: {
        name: "Flush",
        score: { chips: 35, mult: 4 },
        delta: { chips: 15, mult: 2 },
        match: matchFlush;
    },
    straight: {
        name: "Straight",
        score: { chips: 30, mult: 4 },
        delta: { chips: 30, mult: 3 },
        match: matchStraight;
    },
    three_of_a_kind: {
        name: "Three of a Kind",
        score: { chips: 30, mult: 3 },
        delta: { chips: 20, mult: 2 },
        match: match3OAK;
    },
    two_pair: {
        name: "Two Pair",
        score: { chips: 20, mult: 2 },
        delta: { chips: 20, mult: 1 },
	match: matchTwoPair;
    },
    pair: {
        name: "Pair",
        score: { chips: 10, mult: 2 },
        delta: { chips: 15, mult: 1 },
	match: matchPair;
    },
    high_card: {
        name: "High Card",
        score: { chips: 5, mult: 1 },
        delta: { chips: 10, mult: 1 },
	match: matchHighCard;
    },
};
