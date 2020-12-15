var app = new Vue({
    el: '#app',
    data: {
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        message: '',
        isRegistered: false

    },
    methods: {
        sendData: function () {

            app.message = "";
            //validation
            if (this.name == "") {
                this.message = this.message + "Name cannot be left blank";
                return;
            }

            if (this.email == "") {
                this.message = this.message + "Email cannot be left blank";
                return;
            }

            if (this.password == "") {
                this.message = this.message + "Password cannot be left blank";
                return;
            }

            if (this.password != this.confirm_password) {
                this.message = this.message + "Password does not match";
                return;
            }

            axios.post('/users/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    confirm_password: this.confirm_password
                })
                .then(function (response) {
                    // handle success
                    console.log(response.data);
                    if (response.data.status == "error: registerpage.html") {

                        app.message = response.data.message;
                    } else {
                        app.isRegistered = true;
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });

            //console.log(formData);
        },
        logout: function () {
            localStorage.removeItem("__token");
            this.isLoggedin = false;
        }
    }
})