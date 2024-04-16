class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
        this.engine.leverPulled = false;
        this.engine.keyObtained = false;
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.Choices.length > 0  ) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices

                //this.engine.show(choice.Target);//for debugging

                if(choice.Target.charAt(0) == "$"){
                    if(this.engine.keyObtained == true){
                        this.engine.addChoice(choice.Text, choice);
                    }
                }else{
                    this.engine.addChoice(choice.Text, choice);
                } // TODO: use the Text of the choice 
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.");
        }
    }

    handleChoice(choice) {
        if(choice) {
            //pulling lever
            if(choice.Target.charAt(0) == "!"){
                if(this.engine.leverPulled == true){
                    this.engine.leverPulled = false;
                }else{
                    this.engine.leverPulled = true;
                }
            }

           

            if(choice.Target.charAt(0) == "^"){
                if(this.engine.leverPulled == true){
                    this.engine.show("&gt; "+choice.Text);
                    this.engine.gotoScene(Location, choice.Target1);
                }else{
                    this.engine.show("&gt; "+choice.Text);
                    this.engine.gotoScene(Location, choice.Target2);
                }
            }else if(choice.Target.charAt(0) == "@"){
                if(this.engine.keyObtained == true){
                    this.engine.show("&gt; "+choice.Text);
                    this.engine.gotoScene(Location, choice.Target2);
                }else{                    
                    this.engine.keyObtained = true;
                    this.engine.show(this.engine.keyObtained);
                    this.engine.show("&gt; "+choice.Text);
                    this.engine.gotoScene(Location, choice.Target);
                }
            }else{
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Location, choice.Target);
            }

            
        } else {
            this.engine.gotoScene(End);
        }
    }
}



class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');