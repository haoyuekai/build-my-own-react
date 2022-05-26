import myReact from './src/script/react.js'

/** @jsx myReact.createElement */

const updateValue = e => {
    rerender(e.target.value)
}

const container = document.getElementById('root')

const rerender = value => {
    const element = (
        <div>
            <input onInput={updateValue} value={value} />
            <h2>Hello {value}</h2>
        </div>
    )
    myReact.render(element, container)
}

rerender("World")
