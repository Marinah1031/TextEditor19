const butInstall = document.getElementById('buttonInstall');


// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
//adds an event listener to the 'window' object taht listens for the 'beforeintallprompt' event
//event is triggered when the PWA is eligible for installation on a user's device and the brower to display intall prompt
window.addEventListener('beforeinstallprompt', (event) => {
    //inside the event handler, it assingns the 'event' object to a property called 'deferredPrompt' on the window object
    window.deferredPrompt = event;
    //this toggles the 'hidden' class on an element with the variable name 'butInstall
    //the classList.toggle method is used to add the'hiddnen' class to the element when the second arguemnt is 'false' 
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
//adds a click event listener to the butInstall element. when the button is clicked, the code inside the arrow function is executed
butInstall.addEventListener('click', async () => {
    //retrieves the defferedPrompt property from the window object and assigns it to the promptEvent variable. 
    const promptEvent = window.defferedPrompt;
    //condition checks whether promptEvent is false

    if (!promptEvent) {
        return;
    }
        //if promptEvent is not falsy, thsi line calls the prompt() mehtod on the promptEvent.
        promptEvent.prompt();
        //after prompting the user, the line sets the property to null. THis is typically done to ensrue taht installation prompt is not shown again unless triggered
        window.defferedPrompt = null;
        //finally, this line toggles the 'hidden' class to hide the element. This is used to hide the install button.
        butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.defferedPrompt = null;
});
