const React = require('react')

function New (props) {
    return(
        <div>
            <h1>New Veggie!!</h1>
            <form action='/vegetables' method='POST'>
                Name: <input type='text' name='name'/>
                <input type='submit' value="Create Vegetable" />
            </form>
        </div>
    )
}

module.exports = New