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
butInstall.addEventListener('click', async () => {
    const promptEvent = window.defferedPrompt;

    if (!promptEvent) {
        promptEvent.prompt();

        window.defferedPrompt = null;

        butInstall.classList.toggle('hidden', true);
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.defferedPrompt = null;
});
