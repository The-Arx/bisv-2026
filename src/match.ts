function matchBoth(f1: MatchFunction, f2: MatchFunction): MatchFunction {
    return (hand: Hand) => {
        const m1 = f1(hand);
        const m2 = f2(hand);
        return m1 && m2 ? new Set([...m1, ...m2]) : null;
    };
}

function matchNOAK (n: number): MatchFunction {
    return (hand: Hand) => {
	for (const rank_set of Object.values(hand.rank_sets)) {
            if (rank_set.size >= n) {
		return rank_set;
	    }
	}

	return null;
    }
}

const matchFullHouse = matchBoth(match3OAK, matchTwoPair);

function matchFlush (hand: Hand) {
    for (const suit_set of Object.values(hand.suit_sets)) {
	if (suit_set.size >= (four_fingers_owned ? 4 : 5)) {
	    return suit_set;
	}
    }

    return null;
}

function findStraights (hand: Hand) {
    const tolerance: number = shortcut_owned ? 2 : 1;

    let straights: Set<PlayingCard>[] = [];
    let prev_num: number | null = null;
    let current_cards: Set<PlayingCard> | null = null;

    // Make a sorted list of every number that appears.
    const numbers: number[] = Object.keys(hand.rank_sets).map(Number).sort((a, b) => a - b);
    // If ace appears, then that should also go to the front.
    if (hand.rank_sets[Rank.ACE]) numbers.unshift(1);

    for (const num of numbers) {
	current_rank: Rank = Rank(num === 1 ? 14 : num);
	current_cards = hand.rank_sets[current_rank];
	if (prev_num === null || num - prev_num > tolerance) {
	    // If it is the beginning, or the gap is too big, start a new straight.
	    straights.push(current_cards);
	} else {
	    // Continue the current straight.
	    let cur_i = straights.length - 1; // Current straight index.
	    for (const card of current_cards) {
		straights[cur_i].add(card);
	    }
	}
	
	prev_num = num;
    }

    return straights;
}

function matchStraight (hand: Hand) {
    for (const straight of findStraights(hand)) {
	if (straight.size >= (four_fingers_owned ? 4 : 5)) {
	    return straight;
	}
    }

    return null;
}

function matchTwoPair (hand: Hand) {
    pair1: Set<PlayingCard> | null = null;
    for (const rank_sets of Object.values(hand.rank_sets)) {
        if (rank_sets.size >= 2) {
	    if (!pair1) {
		pair1 = cards;
	    } else {
		return new Set([...pair1, ...rank_sets]);
	    }
	}
    }

    return null;
}

const match5OAK = matchNOAK(5);
const match4OAK = matchNOAK(4);
const match3OAK = matchNOAK(3);
const matchPair = matchNOAK(2);

function matchHighCard (hand: Hand) {
    let best: PlayingCard | null = null;
    for (const card of hand.cards_without_stone) {
	if (!best || card.rank > best.rank) best = card;
    }

    return best ? new Set<PlayingCard>([best]) : null;
}
