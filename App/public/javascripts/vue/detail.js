var app = new Vue({
    el: '#app',
    data: {
        post: {
            image: '',
            id: '',
            categroy: '',
            name: '',
            price: '',
            email: '',
            comment: ''
        },
        isLoggedin: false
    },
    methods: {
        logout: function () {
            
            ç
            this.isLoggedin = false;
        },
        
    },
    mounted() {
        
        //alert( localStorage.getItem("__token") + " --- " + this.isLoggedin );
        if (localStorage.getItem("__token") != null) {
            this.isLoggedin = true;
            //alert("logged in");
        }

        var url = window.location.href;
        var split = url.split('/');
        
        axios.get('http://127.0.0.1:3000/post/' + split[split.length - 1])
        .then(res => {
            console.log(res.data[0]);
            app.post.id = res.data[0]['ID'];
            app.post.name = res.data[0]['Name'];
            app.post.price = res.data[0]['Price'];
            app.post.image = res.data[0]['image_name'];
            app.post.categroy = res.data[0]['Category'];
            app.post.email = res.data[0]['email'];
            app.post.comment = res.data[0]['Comment'];
            
        })
    }
    
    
});