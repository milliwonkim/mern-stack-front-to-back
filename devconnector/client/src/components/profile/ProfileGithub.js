import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {

    constructor(props) {
        super(props);
        this.state = {
            /**Everything to do with githubuser API,
             * i'm not gonna use redux for that
             * because we are not using it anywhere else aside from this component
             * so i'm gonna put the client id in the state and the client secret.
             */
            clientId: '5bf795f50a298928f41a',
            clientSecret: 'bf865c8cb69199c2749d4dc9261e661452c078c2',
            /**put the count of repos that i want */
            count: 5,
            /** asc meaning ascending */
            sort: 'created: asc',
            /**repo itself will be an array that we fill once we hit that API */
            repos: []
        };
    }

    componentDidMount(){
        const { username } = this.props;
        const { count, sort, clientId, clientSecret } = this.state;

        /**we are gonna use axios and use backtick */
        fetch(
            `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
        )
            .then(res => res.json())
            .then(data => {
                if(this.refs.myRef){
                /**'data' is what we are fetching with this URL 
                 * and this is what we are getting the repos and we are putting it in our state now
                */
                this.setState({repos: data});
                }
            })
            .catch(err => console.log(err))
    }

    render(){

        const { repos } = this.state;

        const repoItems = repos.map(repo => (
            <div key={repo.id} className="card card-body mb-2">
                <div className="row">
                    <div className="col-md-6">
                        <h4>
                            <Link to={repo.html_url} className="text-info" target="_blank">
                                { repo.name }
                            </Link>
                        </h4>
                        <p>{ repo.description } </p>
                    </div>

                <div className="col-md-6">
                    <span className="badge badge-info mr-1">
                        Stars: { repo.stargazers_count }
                    </span>

                    <span className="badge badge-secondary mr-1">
                        Stars: { repo.watchers_count }
                    </span>

                    <span className="badge badge-success">
                        Stars: { repo.forks_count }
                    </span>
                </div>
                </div>
            </div>
        ))

        return(
            <div ref="myRef">
                <hr/>
                <h3 className="mb-4">
                    Latest Github Repos
                    {repoItems}
                </h3>
            </div>
        );
    }
}

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired
}

export default ProfileGithub;