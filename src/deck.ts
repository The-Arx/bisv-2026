class Deck {
    start_run: (run: Run) => void;
    play_hand_hook: (run: Run) => void;
    end_round_hook: (run: Run) => void;
}

const decks = {
    red: {
	start_run: (run: Run) => {
	    run.discards.starting++;
	    run.discards.remaining++;
	},
    },
    blue: {
	start_run: (run: Run) => {
	    run.hands.starting++;
	    run.hands.remaining++;
	},
    },
    yellow: {
	start_run: (run: Run) => {
	    run.money += 10;
	},
    },
    green: {
	end_round_hook: (run: Run) => {
	    money += run.hands.remaining * 2 + run.discards.remainng;
	    // TODO: Fix this so that there is a collect money button and this doesn't just give you the money immediately
	    // Technically this isn't necessary because collecting the money and just getting it is the same.
	    
	    // TODO: Find some way to skip interest.
	},
    },
    black: {
	start_run: (run: Run) => {
	    run.joker_slots++;
	    run.hands.starting--;
	},
    },
    magic: {
	start_run: (run: Run) => {
	    // TODO: add vouchers and tarot stuff.
	},
    },
    nebula: {
	start_run: (run: Run) => {
	    // TODO: add voucher stuff.
	    run.consumable_slots--;
	},
    },
    ghost: {
	// TODO: add spectral cards and make them appear in shop.
    },
    abandoned: {
	start_run: (run: Run) => {
	    // TODO: Modify cards in deck to remove face cards.
	},
    },
    checkered: {
	start_run: (run: Run) => {
	    // TODO: Add deck modification
	},
    },
    zodiac: {
	start_run: (run: Run) => {
	    // TODO: Add vouchers
	},
    },
    painted: {
	start_run: (run: Run) => {
	    run.hands.starting += 2;
	    run.joker_slots--;
	},
    },
    anaglyph: {
	end_round_hook: (run: Run) => {
	    // TODO: make skip tags.
	},
    },
    plasma: {
	start_run: (run: Run) => {
	    // TODO: blinds. Make base blind size 2x.
	},
	play_hand_hook: (run: Run) => {
	    run.chips = run.mult = (run.chips + run.mult)/2;
	},
    },
    erratic: {
	start_run (run: Run) => {
	    // TODO: changing deck cards.
	},
    },
};
