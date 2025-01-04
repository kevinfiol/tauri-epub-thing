const { convertFileSrc } = window.__TAURI__.core;
const { open } = window.__TAURI__.dialog;

const moby = 'https://s3.amazonaws.com/moby-dick/moby-dick.epub';

window.addEventListener("DOMContentLoaded", async () => {
  const file = await open({ multiple: false, directory: false });
  const assetUrl = convertFileSrc(file);

  const book = ePub(assetUrl);

  const rendition = book.renderTo(document.querySelector('#book'), {
    width: '100%',
    height: 400
  });

  rendition.display();

  book.ready.then(() => {
    document.getElementById("next").addEventListener('click', (e) => {
      e.preventDefault();
      book.package.metadata.direction === "rtl" ? rendition.prev() : rendition.next();
    });

    document.getElementById('prev').addEventListener('click', (e) => {
      e.preventDefault();
      book.package.metadata.direction === "rtl" ? rendition.next() : rendition.prev();
    });
  })
});
