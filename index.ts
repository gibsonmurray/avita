import $ from "jquery"
import div from "./components/div"

function render(children: HTMLElement) {
    $("#root").html(children)
}

export default render
export { div }
