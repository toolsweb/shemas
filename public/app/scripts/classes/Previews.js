class Previews {
  constructor() {
    let dropbox = document.getElementById('dropbox');
    if (dropbox) {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropbox.addEventListener(eventName, this.preventDefaults, false);
        document.body.addEventListener(eventName, this.preventDefaults, false);
      });

      ['dragenter', 'dragover'].forEach(eventName => {
        dropbox.addEventListener(eventName, this.highlight, false);
      });
      ['dragleave', 'drop'].forEach(eventName => {
        dropbox.addEventListener(eventName, this.unhighlight, false);
      });

      dropbox.addEventListener('drop', this.handleDrop, false);
    }
  }

  preventDefaults = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  highlight = e => {
    dropbox.classList.add('highlight');
  };

  unhighlight = e => {
    dropbox.classList.remove('highlight');
  };

  handleDrop = e => {
    var dt = e.dataTransfer;
    var files = dt.files;
    var fileInput = document.querySelector('#fileSelector');

    fileInput.files = files;
    console.log(fileInput.files);

    this.handleFiles(files);
  };

  handleFiles = files => {
    [...files].forEach(this.previewFile);
  };

  laodImageFromUrl = () => {
    const url = document.getElementById('imgUrl').value;
    this.addImage(url);
  };

  addImage = src => {
    if (src === '') {
      alert('You should enter an image URL');
      return;
    }
    let img = document.createElement('img');
    img.src = src;
    const parentNode = document.getElementById('preview');
    if (parentNode.children[0] != null) {
      parentNode.removeChild(parentNode.children[0]);
    }
    parentNode.appendChild(img);
  };

  previewFile = file => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      let img = document.createElement('img');
      img.src = reader.result;
      const parentNode = document.getElementById('preview');
      if (parentNode.children[0] != null) {
        parentNode.removeChild(parentNode.children[0]);
      }
      parentNode.appendChild(img);
    };
  };
}

export default Previews;
