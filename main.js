import myReact from './src/script/react.js'

// const element = myReact.createElement(
//     "div",
//     { id: "foo" },
//     myReact.createElement("div", {title: 'bar'}, "bar"),
//     myReact.createElement("p", {}, "b"),
// )
/** @jsx myReact.createElement */
const element = (<div id='foo'>
    <div className="bar">
        <div>001</div>
        <div>002</div>
        <div>003</div>
        <div>004</div>
        <div>005</div>
        <div>006</div>
        <div>007</div>
        <div>008</div>
        <div>009</div>
        <div>010</div>
        <div>011</div>
        <div>012</div>
        <div>013</div>
        <div>014</div>
        <div>015</div>
        <div>016</div>
        <div>017</div>
        <div>018</div>
        <div>019</div>
        <div>020</div>
        <div>021</div>
        <div>022</div>
        <div>023</div>
        <div>024</div>
        <div>025</div>
        <div>026</div>
        <div>027</div>
        <div>028</div>
        <div>029</div>
        <div>030</div>
        <div>031</div>
        <div>032</div>
        <div>033</div>
        <div>034</div>
        <div>035</div>
        <div>036</div>
        <div>037</div>
        <div>038</div>
        <div>039</div>
        <div>040</div>
        <div>041</div>
        <div>042</div>
        <div>043</div>
        <div>044</div>
        <div>045</div>
        <div>046</div>
        <div>047</div>
        <div>048</div>
        <div>049</div>
        <div>050</div>
        <div>051</div>
        <div>052</div>
        <div>053</div>
        <div>054</div>
        <div>055</div>
        <div>056</div>
        <div>057</div>
        <div>058</div>
        <div>059</div>
        <div>060</div>
        <div>061</div>
        <div>062</div>
        <div>063</div>
        <div>064</div>
        <div>065</div>
        <div>066</div>
        <div>067</div>
        <div>068</div>
        <div>069</div>
        <div>070</div>
        <div>071</div>
        <div>072</div>
        <div>073</div>
        <div>074</div>
        <div>075</div>
        <div>076</div>
        <div>077</div>
        <div>078</div>
        <div>079</div>
        <div>080</div>
        <div>081</div>
        <div>082</div>
        <div>083</div>
        <div>084</div>
        <div>085</div>
        <div>086</div>
        <div>087</div>
        <div>088</div>
        <div>089</div>
        <div>090</div>
        <div>091</div>
        <div>092</div>
        <div>093</div>
        <div>094</div>
        <div>095</div>
        <div>096</div>
        <div>097</div>
        <div>098</div>
        <div>099</div>
        <div>100</div>
    </div>
    <a href='https://www.baidu.com'>百度</a>
    <div />
    <p>aaa</p>
</div>)

console.log(element)

function a() {
    console.log(new Date())
    // window.requestAnimationFrame(a);
}

a();

myReact.render(element, document.getElementById('root'))
