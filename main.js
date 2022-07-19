import myReact from './src/script/react.js'

/** @jsx myReact.createElement */

let colors = ['#000', '#f00', '#00f', '#0f0', '#ff0', '#0ff', '#f0f'];


const updateValue = e => {
    rerender(e.target.value)
}

const clickBtn = () => {
    colors = colors.sort(() => Math.random() - 0.5);
    console.log(colors)
    rerender('world')
}

function App(props) {
    const [count, setCount] = myReact.useState(props.count)
    return (
        <h1 onClick={() => setCount(c => c + 1)}>
        Count: {count}
        </h1>
    )
}

const container = document.getElementById('root')

const rerender = value => {
    const element = (
        <div>
            <App count={1}></App>
            <input onInput={updateValue} value={value} />
            <h2>Hello {value}</h2>
            <span className="text" onclick={clickBtn} style={`color: ${colors[0]}`}>aaa</span>
        </div>
    )
    myReact.render(element, container)
}

rerender("World")
