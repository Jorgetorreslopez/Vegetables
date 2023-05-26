const React = require('react')
const Vegetable = require('../../models/vegetables')

function Index (props) {
    return (
        <div>
            <h1>THIS IS A LIST!!!! OF VEGGIESS!!!!</h1>
            <a href='/vegetables/new'>MAKE A FRUIT, YOU FAT ****</a>
            <ul>
                {
                    props.vegetables.map((vegetable) => {
                        return (
                            <li key={vegetable._id}>
                                <a href={`/vegetables/${vegetable._id}`}>{vegetable.name}</a> is cool.
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

module.exports = Index