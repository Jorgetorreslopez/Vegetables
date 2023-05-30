const React = require('react')

function Edit (props) {
    const { name, _id} = props.vegetable
    return(
        <div>
            <h1> {name} Edit Paguh !!</h1>
            <form action={`/vegetables/${_id}?_method=PUT`} method='POST'>
                Name: <input type='text' name='name' defaultValue={name}/><br/>
                <input type='submit' value="Update Vegetable" /><br/>
            </form>
        </div>
    )
}

module.exports = Edit