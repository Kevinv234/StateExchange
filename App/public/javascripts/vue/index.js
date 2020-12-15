var app = new Vue({
    el: '#app',
    data: {
        posts: []
    },
    methods: {
        trimComment: function (post) {
            const length = 50;
            let comment = post;

            if (post.length > length) {
                comment = post.substring(0, length) + "...";
            }

            return comment;
        },
        trimTitle: function (post) {
            const length = 15;
            let title = post;

            if (post.length > length) {
                title = post.substring(0, length) + "...";
            }

            return title;
        },
        contactSeller: function(_id) {
            if(localStorage.getItem("__token") != null) {
                const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("__token")
                        }

                axios.post('/messaging-index/create',
                    {id: _id},
                    {headers: headers})
                .then(res => {
                    //get the id
                    id = res.data.id;
                    window.location.href = "/contact/edit/" + _id + "/" + id;// + "?token=" + localStorage.getItem("__token");
                    console.log(res);
                })

            } else {
                alert("Please login first!")
            }

        }
    },
    mounted() {
        axios.post('/search_query', {query: ""})
            .then(res => {
                console.log(res.data)
                this.posts = res.data
            })
    }

});