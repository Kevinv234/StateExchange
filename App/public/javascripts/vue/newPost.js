var app = new Vue({
    el: '#app',
    data: {
        formData: {
            title: '',
            desc: '',
            price: '',
            category: 'Category',
        },
        categories: [],
        photoFilePaths: [],
    },
    methods: {
        logout: function() {
            
            //alert("ji");
            localStorage.removeItem("__token");
            this.isLoggedin = false;


        },
        filesChange: function (fileList) {
            if (!fileList.length) return;

            //create a new formData object and append image
            const formData = new FormData();
            formData.append("photo", fileList[0]);

            //fake upload service to display image on frontend, code can be found in public/javascripts/upload.js
            upload(formData)
                .then(res => {
                    this.photoFilePaths = this.photoFilePaths.concat(res.url);
                })
                .catch(err => {
                    console.log("incompatible filetype uploaded");

                });
        }
    },
    mounted() {
        axios.post('/categories')
            .then(res => {
                res.data.map( category => {
                    this.categories.push(category.Categories)
                })
            })
            .catch( err => console.log(err))
    }
})

let upload = (formData) => {
    const photo = formData.get('photo')
    const promise = getImage(photo)
        .then(img => ({
            id: img,
            originalName: photo.name,
            fileName: photo.name,
            url: img
        }))
    return promise
}

let getImage = (file) => {
    return new Promise((resolve, reject) => {
        const fReader = new FileReader();
        const img = document.createElement('img');

        fReader.onload = () => {
            img.src = fReader.result;
            resolve(getBase64Image(img));
        }

        fReader.readAsDataURL(file);
    })
}

let getBase64Image = (img) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const dataURL = canvas.toDataURL('image/png');

    return dataURL;
}