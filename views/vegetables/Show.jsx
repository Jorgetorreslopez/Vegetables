const React = require('react')

function Show(props) {
    return(
        <div>
            <h1>{props.vegetable.name}</h1>
            <a href='/vegetables'>Go back to index Page</a>
            <p>
                The {props.vegetable.name} is healthy
            </p>
        </div>
    )
}

module.exports = Show