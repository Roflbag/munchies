import React, { Component } from 'react';
import $ from 'jquery';

class Munchies extends Component {
    constructor(props) {
        super(props);
        this.token = "";
        this.state = { imageMedia: [] };
    }

    authenticate(props) {
        const authId = "812a4304f1be42cbbaeb4513b9fd53a0";
        const redirectPage = "http://localhost:3000/"

        const url = window.location.href.toString();
        const tokenString = "access_token=";

        if (url.indexOf(tokenString) >= 0) {
            this.token = url.substring(url.indexOf(tokenString) + tokenString.length, url.length);
        }

        return (
            <a href={"https://api.instagram.com/oauth/authorize/?client_id="+authId+"&redirect_uri="+redirectPage+"&response_type=token"}>
                <button>authorize instagram</button>
            </a>
        );
    }

    getImage(token) {
        const tag = "photography";
        const url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?access_token=" + token;
        var self = this;
        console.log("token");

        $.ajax(url, {
            type: "GET",
            dataType: "jsonp",
        }).then(function(response) {
            const result = response.data;

            const resultMedia = result.map((imageObj) =>
                <li key={imageObj.id}>
                    {imageObj.filter}
                </li>
            );
            console.log(resultMedia);

            self.setState({
                imageMedia: resultMedia
            });
        })
    }


    render() {
        return (
            <div>
                {this.authenticate()}
                <button onClick={this.getImage(this.token)}>
                    Click me
                </button>
                <ul>{this.state.imageMedia}</ul>
            </div>
        );
    }
}

export default Munchies;
