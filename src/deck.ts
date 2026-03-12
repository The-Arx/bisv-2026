class Deck {
    // Returns whether the function calling the hook should do an early return.
    start_run: (run: Run) => bool;
    play_hand_hook: (run: Run) => bool;
    end_round_hook: (run: Run) => bool;
}

const decks = {
    red: {
	start_run: (run: Run) => {
	    run.discards.starting++;
	    run.discards.remaining++;

	    return false;
	},
    },
    blue: {
	start_run: (run: Run) => {
	    run.hands.starting++;
	    run.hands.remaining++;

	    return false;
	},
    },
    yellow: {
	start_run: (run: Run) => {
	    run.money += 10;
	    
	    return false;
	},
    },
    green: {
	end_round_hook: (run: Run) => {
	    money += run.hands.remaining * 2 + run.discards.remainng;
	    // TODO: Fix this so that there is a collect money button and this doesn't just give you the money immediately
	    // Technically this isn't necessary because collecting the money and just getting it is the same.
	    
	    // TODO: Find some way to skip interest.


	    // TODO: Think about what this should return.
	},
    },
    black: {
	start_run: (run: Run) => {
	    run.joker_slots++;
	    run.hands.starting--;

	    return false;
	},
    },
    magic: {
	start_run: (run: Run) => {
	    // TODO: add vouchers and tarot stuff.

	    return false;
	},
    },
    nebula: {
	start_run: (run: Run) => {
	    // TODO: add voucher stuff.
	    run.consumable_slots--;

	    return false;
	},
    },
    ghost: {
	// TODO: add spectral cards and make them appear in shop.

	return false;
    },
    abandoned: {
	start_run: (run: Run) => {
	    // TODO: Modify cards in deck to remove face cards.

	    return false;
	},
    },
    checkered: {
	start_run: (run: Run) => {
	    // TODO: Add deck modification

	    return false;
	},
    },
    zodiac: {
	start_run: (run: Run) => {
	    // TODO: Add vouchers

	    return false;
	},
    },
    painted: {
	start_run: (run: Run) => {
	    run.hands.starting += 2;
	    run.joker_slots--;

	    return false;
	},
    },
    anaglyph: {
	end_round_hook: (run: Run) => {
	    // TODO: make skip tags.

	    return false;
	},
    },
    plasma: {
	start_run: (run: Run) => {
	    // TODO: blinds. Make base blind size 2x.

	    return false;
	},
	play_hand_hook: (run: Run) => {
	    run.chips = run.mult = (run.chips + run.mult)/2;

	    // TODO: Think about whether this is actually true.
	    return false;
	},
    },
    erratic: {
	start_run (run: Run) => {
	    // TODO: changing deck cards.

	    return false;
	},
    },
};
