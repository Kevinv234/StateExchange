var app = new Vue({
    el: '#app',
    data: {
        posts: [],
        isLoggedin: false
    },
    methods: {
        logout: function () {
            localStorage.removeItem("__token");
            this.isLoggedin = false;
        }
    },
    status: function (id, status) {

        if (localStorage.getItem("__token") != null) {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("__token")
            }

            axios.post('/post/setStatus', { id: id, status: status }, { headers: headers })
                .then(res => { console.log(res) })

        } else {
            alert("Please login first!")
        }
    },
    mounted() {
        if (localStorage.getItem("__token") != null) {
            this.isLoggedin = true;
        }

        axios.get('/search_query')
            .then(res => {
                this.posts = res.data;
            })
    }
});