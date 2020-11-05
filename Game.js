const GameState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    FUEL: Symbol("fuel"),
    CALL: Symbol("call"),
    PUMP: Symbol("pump"),
    ATTENDANT: Symbol("ATTENDANT"),
    SNACK: Symbol("snack"),
    QUIT: Symbol("quit")
});

module.exports = class Game {
    constructor() {
        this.stateCur = GameState.WELCOMING;
        this.countCase = 0;
        this.prompt = "Are you QUITting?";
        this.isQuitting = false;
    }
    isDone() {
        return this.isQuitting;
    }
    makeAMove(sInput) {
        let sReply = "";
        if (this.stateCur == GameState.WELCOMING) {
            // counts the cases that the player goes in
            this.countCase++;

            sReply = "It is a rainy night. You are driving through the countryside." +
                "Your car is broken down. When you checked it, you saw that your fuel is empty. " +
                "Do you CALL for help or GO to the spooky fuel pump for help?";
            this.stateCur = GameState.FUEL;

        } else if (GameState.FUEL == this.stateCur) {
            // counts the cases that the player goes in
            this.countCase++;
            if (sInput.toLowerCase().match("call")) {
                sReply = "Nobody is picking up the call. After 1 hour there is still no help." +
                    "Do you keep CALLING or do you GO to the fuel pump?";
            } else if (sInput.toLowerCase().match("go")) {
                sReply = "On the fuel pump you saw something uncomfortable. Do you STAY in the pump or " +
                    " RUN back to your car to call?";
                this.stateCur = GameState.PUMP;
            } else {
                this.stateCur = GameState.QUIT;
            }
        } else if (GameState.PUMP == this.stateCur) {
            // counts the cases that the player goes in
            this.countCase++;
            if (sInput.toLowerCase().match("stay")) {
                sReply = "When you approach the filling station and you are greeted by a crooked-back attendant. " +
                    "He asks you to come into the snack bar." +
                    "Do you ACCEPT the offer or RUN back to the car?"
                this.stateCur = GameState.ATTENDANT;
            } else if (sInput.toLowerCase().match("run")) {
                sReply = "Nobody is picking up the call. After 1 hour there is still no help." +
                    "Do you keep CALLING or do you GO to the fuel pump?";
                this.stateCur = GameState.FUEL;
            } else {
                this.stateCur = GameState.QUIT;
            }
        } else if (GameState.ATTENDANT == this.stateCur) {
            // counts the cases that the player goes in
            this.countCase++;
            if (sInput.toLowerCase().match("run")) {
                sReply = "Nobody is picking up the call. After 1 hour there is still no help." +
                    "Do you keep CALLING or do you GO to the fuel pump?";
                this.stateCur = GameState.FUEL;
            } else if (sInput.toLowerCase().match("accept")) {
                sReply = "You seem to have walked into a party. The host offers you some snack. " +
                    " Do you take the SNACK or ask to FILL in the fuel?";
                this.stateCur = GameState.SNACK;
            } else {
                this.stateCur = GameState.QUIT;
            }
        } else if (GameState.SNACK == this.stateCur) {
            // counts the cases that the player goes in
            this.countCase++;
            if (sInput.toLowerCase().match("snack")) {
                sReply = "you enter a new world of adventure ... " +
                    "you have used " + this.countCase + " chances.. Game Over";
                this.isQuitting = true;
                this.stateCur = GameState.WELCOMING;
            } else if (sInput.toLowerCase().match("fill")) {
                sReply = "The filling Station if empty... Would you like some SNACK perhaps?";
            } else {
                this.stateCur = GameState.QUIT;
            }
        } else if (GameState.QUIT == this.stateCur) {
            sReply = "you have used " + this.countCase + " chances..";
            this.isQuitting = true;
            while (this.isDone()) {
                this.isQuitting = false;
                break;
            }
            this.stateCur = GameState.WELCOMING;
        }
        return ([sReply]);
    }
}