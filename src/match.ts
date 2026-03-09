function matchNOAK (n: number, hand: Hand) {
    for (const rank_set of hand.rank_sets) {
        if (rank_set.size >= n) {
	    return rank_set;
	}
    }

    return null;
}

function match5OAK (hand: Hand) {
    return matchNOAK(5, hand);
}

function match4OAK (hand: Hand) {
    return matchNOAK(4, hand);
}

function matchFullHouse (hand: Hand)
function matchFlush (hand: Hand)
function matchStraight (hand: Hand)

function match3OAK (hand: Hand) {
    return matchNOAK(3, hand);
}

function matchTwoPair (hand: Hand) {
    pair1 = new Set<Card>;
    for (const rank_set of hand.rank_sets) {
        if (rank_set.size >= 2) {
	    if (pair.size === 0) {
		pair1 = rank_set;
	    } else {
		return new Set([...pair1, ...rank_set]);
	    }
	}
    }

    return null;
}

function matchPair (hand: Hand) {
    return matchNOAK(2, hand);
}

function matchHighCard (hand: Hand) {
    return Math.max(...hand.cards.map(o => o.rank));
}
