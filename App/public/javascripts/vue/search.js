var app = new Vue({
    el: '#app',
    data: {
        posts: [],
        showing: "",
        query: ""
    },
    methods: {
        trimComment: function (post) {
            const length = 200;
            let comment = post;

            if (post.length > length) {
                comment = post.substring(0, length) + "...";
            }

            return comment;
        }
    },
    mounted() {
        const sessionQuery = sessionStorage.getItem('query');
        if (sessionQuery != null) {
            this.query = sessionQuery;
        }

        axios.post('/search_query', {
                query: this.query
                // category: this.selectedCategory
            })
            .then(res => {
                console.log(res.data)
                this.posts = res.data
            })

    }
})