// fetch components.html file and convert it to text and give it to html
fetch('components.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('templateStorage').innerHTML = html;
  });

// adding event listener such that wheenver we  click the link we will be able to clone and add that particular template
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-component').forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault();
      const type = btn.dataset.component;
      const template = document.getElementById(`${type}-template`);
      if (template) {
        const clone = template.content.cloneNode(true);
        document.getElementById('preview-area').appendChild(clone);
      }
    });
  });

  // addin event click to remove section templates directly
  document.getElementById('preview-area').addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-section')) {
      const section = event.target.closest('section');
      section.style.transition = 'all 0.3s';
      section.style.opacity = '0';
      setTimeout(() => section.remove(), 300);
    }
  });
});

// function to edit href in <a> tags
function editLink(anchor) {
  event.preventDefault();

  const url = prompt("Enter new URL for this link:", anchor.href);
  if (url !== null && url.trim() !== "") {
    anchor.href = url;
  }
}

// function to add image urls in <img> tags
function editImage(img) {
  const newSrc = prompt("Enter new image URL:", img.src);
  if (newSrc) img.src = newSrc;
}

// function to edit background image
function editBackground(btn) {
  const section = btn.closest('section').querySelector('.hero-content');
  const url = prompt('Enter background image URL:');
  if (url) {
    section.style.backgroundImage = `url('${url}')`;
    section.style.backgroundSize = 'cover';
    section.style.backgroundPosition = 'center';
  }
}

// file generation
    document.getElementById('generateBtn').addEventListener('click', function(event){
        event.preventDefault();
        const previewClone = document.getElementById('preview-area').cloneNode(true);
        
        previewClone.querySelectorAll('.remove-section, .previewText, .addBgBtn').forEach(ele => ele.remove());
        previewClone.querySelectorAll('[contenteditable], [onclick]').forEach(el => {
          el.removeAttribute('contenteditable');
          el.removeAttribute('onclick');
        });

        const content = previewClone.innerHTML;

        const fullPage = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Generated Website</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
                <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

            </head>
            <body>
              ${content}
            </body>
            </html>`;
        
        const newFile=new Blob([fullPage],{type:'text/html'});
        const url=URL.createObjectURL(newFile);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'generated-website.html';
        a.click();

        URL.revokeObjectURL(url);

    })



