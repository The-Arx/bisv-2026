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
    TWO,
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
    rank: Rank;
    suit: Suit;
    enhancment: Enhancment;
    seal: Seal;
    edition: Edition;
}

class Hand {
    cards_selected: Card[];
    total_cards: number;
    rank_sets: {[rank: Rank]: Set<Card>}
    cards_scored: Card[];

    // Does not initialized cards_scored
    constructor (cards: Card[]) {
        rank_sets = {};
        cards_selected = cards;
	total_cards = cards.size;
	for (const card of cards) {
	    rank_sets[card.rank].add(card);
	}
    }
}

type MatchFunction = (hand: Hand) => Set<Card> | null;

interface HandType {
    name: string;
    score: { chips: number; mult: number; };
    delta: { chips: number; mult: number; };
    match: MatchFunction;
}


function matchBoth(f1: MatchFunction, f2: MatchFunction): MatchFunction {
    return (hand: Hand) => {
        const m1 = f1(hand);
        const m2 = f2(hand);
        return m1 && m2 ? new Set([...m1, ...m2]) : null;
    };
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

class Run {
    hand_size = 8
    hands = 4
    discards = 3
    joker_slots = 5
    consumable_slots = 2
    ante = 1
    round = 1

    hands: { [id: string]: HandType }
    deck
}