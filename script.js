/* build filename */
let filename = document.querySelector(".jp-title").textContent;
const username = document.querySelector("[href*='soundgasm.net/u/']").textContent; // username field has no identifiers - find based on link itself

if ((filename + username).length > 150) {
    filename = filename.slice(0, 147 - username.length) + '...'; // trim long filenames
}
filename += ` by ${username}.m4a`;

/* create download button */
const downloadButton = document.createElement('a');
downloadButton.setAttribute('download', filename);
downloadButton.innerHTML += "<u class='fa fa-download'></u> Download";

// listen for src added to jPlayer to enable button
const observer = new MutationObserver((_, self) => {
    const src = document.querySelector("#jp_audio_0").src;
    if (src) {
        downloadButton.setAttribute('href', src);
        document.querySelector('.jp-type-single').appendChild(downloadButton);
        self.disconnect();
    }
});
observer.observe(document, {
  childList: true,
  subtree: true,
});